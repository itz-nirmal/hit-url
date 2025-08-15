"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (!loading && user) {
      console.log("User already authenticated, redirecting to dashboard");
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setIsLoading(true);

    try {
      // Use client-side Supabase authentication instead of API
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Login successful:", data);
      console.log("Session:", data.session);
      console.log("User:", data.user);

      // The auth state should update automatically via onAuthStateChange
      // The useEffect above will handle the redirect when user state updates
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }; // Show loading while determining auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(0,251,205)] mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] relative">
      {/* Navigation */}
      <Navigation />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-white/70">Sign in to your HIT URL account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:border-transparent"
                placeholder="Enter your email"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:border-transparent"
                placeholder="Enter your password"
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[rgb(0,251,205)] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[rgb(0,251,205)]/90 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

            <div className="text-center">
              <Link
                href="/forgot-password"
                className="text-[rgb(0,251,205)] hover:underline text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-white/70">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[rgb(0,251,205)] hover:underline font-medium cursor-pointer"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
