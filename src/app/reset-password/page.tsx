"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import PasswordStrengthIndicator from "@/components/PasswordStrengthIndicator";
import Navigation from "@/components/Navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isValidSession, setIsValidSession] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check if we have a valid session for password reset
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
      } else {
        setError(
          "Invalid or expired reset link. Please request a new password reset."
        );
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (!isPasswordValid) {
      setError("Password does not meet requirements");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      setMessage("Password updated successfully! Redirecting to login...");

      // Sign out and redirect to login after 2 seconds
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push("/login");
      }, 2000);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to update password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidSession && !error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 border border-white/20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(0,251,205)] mx-auto mb-4"></div>
          <p className="text-white">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] relative">
      {/* Navigation */}
      <Navigation />

      <div className="relative z-10 max-w-md mx-auto px-4 sm:px-6 py-20 sm:py-24 pt-24 sm:pt-28 md:pt-24">
        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-12 border border-white/20">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Set New Password
            </h1>
            <p className="text-sm sm:text-base text-white/70">
              Create a strong new password for your account
            </p>
          </div>

          {isValidSession ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:border-transparent"
                  placeholder="Enter your new password"
                  required
                />
                {password && (
                  <PasswordStrengthIndicator
                    password={password}
                    onValidityChange={setIsPasswordValid}
                  />
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-white mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:border-transparent"
                  placeholder="Confirm your new password"
                  required
                />
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">
                    Passwords do not match
                  </p>
                )}
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
                disabled={isLoading || !isPasswordValid}
                className="w-full bg-[rgb(0,251,205)] text-black font-semibold py-3 px-4 rounded-lg hover:bg-[rgb(0,251,205)]/90 focus:outline-none focus:ring-2 focus:ring-[rgb(0,251,205)] focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-300"
              >
                {isLoading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mb-6">
                <p className="text-red-200 text-sm">{error}</p>
              </div>
              <Link
                href="/forgot-password"
                className="text-[rgb(0,251,205)] hover:underline font-medium"
              >
                Request New Reset Link
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-[rgb(0,251,205)] hover:underline text-sm"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
