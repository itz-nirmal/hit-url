import { supabase } from './supabase'
import type { Database, InsertURL, InsertURLCheck, URL, URLCheck } from '@/types/database'

// URL Management Functions
export async function createURL(urlData: InsertURL) {
  const { data, error } = await supabase
    .from('urls')
    .insert(urlData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getUserURLs(userId: string) {
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('user_id', userId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export async function updateURL(id: string, updates: Partial<URL>) {
  const { data, error } = await supabase
    .from('urls')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteURL(id: string) {
  const { error } = await supabase
    .from('urls')
    .update({ is_active: false })
    .eq('id', id)

  if (error) throw error
}

// URL Check Functions
export async function createURLCheck(checkData: InsertURLCheck) {
  const { data, error } = await supabase
    .from('url_checks')
    .insert(checkData)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function getURLChecks(urlId: string, limit = 50) {
  const { data, error } = await supabase
    .from('url_checks')
    .select('*')
    .eq('url_id', urlId)
    .order('checked_at', { ascending: false })
    .limit(limit)

  if (error) throw error
  return data
}

export async function getURLStats(urlId: string, hours = 24) {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString()
  
  const { data, error } = await supabase
    .from('url_checks')
    .select('is_success, response_time_ms, checked_at')
    .eq('url_id', urlId)
    .gte('checked_at', since)
    .order('checked_at', { ascending: false })

  if (error) throw error

  const totalChecks = data.length
  const successfulChecks = data.filter(check => check.is_success).length
  const uptime = totalChecks > 0 ? (successfulChecks / totalChecks) * 100 : 0
  const avgResponseTime = data.length > 0 
    ? data.reduce((sum, check) => sum + (check.response_time_ms || 0), 0) / data.length 
    : 0

  return {
    uptime: Math.round(uptime * 100) / 100,
    avgResponseTime: Math.round(avgResponseTime),
    totalChecks,
    successfulChecks,
    checks: data
  }
}

// Authentication Helper Functions
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  return data
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Utility function to ping a URL
export async function pingURL(url: string): Promise<{
  success: boolean
  statusCode?: number
  responseTime: number
  error?: string
}> {
  const startTime = Date.now()
  
  try {
    const response = await fetch(url, {
      method: 'HEAD',
      timeout: 10000, // 10 second timeout
    })
    
    const responseTime = Date.now() - startTime
    
    return {
      success: response.ok,
      statusCode: response.status,
      responseTime
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    return {
      success: false,
      responseTime,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}