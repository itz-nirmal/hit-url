-- HIT URL Database Schema
-- This schema defines the tables needed for the URL monitoring service

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- URLs table to store URLs that need to be monitored
CREATE TABLE IF NOT EXISTS urls (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url VARCHAR(2048) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  interval_minutes INTEGER DEFAULT 5, -- How often to ping (in minutes)
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- URL checks table to log ping results
CREATE TABLE IF NOT EXISTS url_checks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url_id UUID REFERENCES urls(id) ON DELETE CASCADE,
  status_code INTEGER,
  response_time_ms INTEGER,
  is_success BOOLEAN DEFAULT false,
  error_message TEXT,
  checked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cron jobs table to manage scheduled tasks
CREATE TABLE IF NOT EXISTS cron_jobs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  url_id UUID REFERENCES urls(id) ON DELETE CASCADE,
  next_run_at TIMESTAMP WITH TIME ZONE,
  last_run_at TIMESTAMP WITH TIME ZONE,
  is_running BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_urls_user_id ON urls(user_id);
CREATE INDEX IF NOT EXISTS idx_urls_is_active ON urls(is_active);
CREATE INDEX IF NOT EXISTS idx_url_checks_url_id ON url_checks(url_id);
CREATE INDEX IF NOT EXISTS idx_url_checks_checked_at ON url_checks(checked_at);
CREATE INDEX IF NOT EXISTS idx_cron_jobs_url_id ON cron_jobs(url_id);
CREATE INDEX IF NOT EXISTS idx_cron_jobs_next_run_at ON cron_jobs(next_run_at);

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;
ALTER TABLE url_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cron_jobs ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- URLs policies
CREATE POLICY "Users can view own URLs" ON urls FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own URLs" ON urls FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own URLs" ON urls FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own URLs" ON urls FOR DELETE USING (auth.uid() = user_id);

-- URL checks policies
CREATE POLICY "Users can view own URL checks" ON url_checks FOR SELECT USING (
  EXISTS (SELECT 1 FROM urls WHERE urls.id = url_checks.url_id AND urls.user_id = auth.uid())
);

-- Cron jobs policies
CREATE POLICY "Users can view own cron jobs" ON cron_jobs FOR SELECT USING (
  EXISTS (SELECT 1 FROM urls WHERE urls.id = cron_jobs.url_id AND urls.user_id = auth.uid())
);

-- Functions and triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_urls_updated_at BEFORE UPDATE ON urls FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cron_jobs_updated_at BEFORE UPDATE ON cron_jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();