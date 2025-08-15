"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Navigation from "@/components/Navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is required");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setMessage(
        "Password reset email sent! Please check your inbox and follow the instructions."
      );
      setEmail("");
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to send reset email"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] relative">
      {/* Navigation */}
      <Navigation />

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-20 sm:py-24 pt-24 sm:pt-28 md:pt-24">
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              Enter your email to receive reset instructions
            </p>
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
                placeholder="Enter your email address"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                <p className="text-green-200 text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[rgb(0,251,205)] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[rgb(0,251,205)]/90 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
            >
              {isLoading ? "Sending Reset Email..." : "Send Reset Email"}
            </button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link
              href="/login"
              className="text-[rgb(0,251,205)] hover:underline text-sm"
            >
              Back to Sign In
            </Link>

            <p className="text-white/70">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-[rgb(0,251,205)] hover:underline font-medium"
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
