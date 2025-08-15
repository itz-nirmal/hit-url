"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if we're done loading and definitely have no user
    if (!loading && !user) {
      console.log(
        "ProtectedRoute: No authenticated user, redirecting to login"
      );
      router.replace("/login");
    }
  }, [user, loading, router]);

  // Show loading spinner while determining auth state
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

  // If no user and not loading, don't render anything (redirect will happen)
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[rgb(0,251,205)] mx-auto mb-4"></div>
          <p className="text-white">Redirecting...</p>
        </div>
      </div>
    );
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
