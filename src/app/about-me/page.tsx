"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function AboutMePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/70 to-[rgb(0,251,205)]/20 bg-[length:100%_200%] animate-gradient-shift"></div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-20 sm:py-24 pt-24 sm:pt-28 md:pt-24">
        {/* Main Card Container */}
        <div className="bg-black/30 backdrop-blur-lg border border-[rgb(0,251,205)]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-12 shadow-2xl">
          {/* Header Section */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 text-[rgb(0,251,205)] tracking-tight">
              About
            </h1>
            <div className="w-16 sm:w-20 h-1 bg-[rgb(0,251,205)] mx-auto rounded-full"></div>
          </div>

          {/* Quote Card */}
          <div className="bg-gradient-to-r from-[rgb(0,251,205)]/15 to-[rgb(0,251,205)]/8 border-l-4 border-t border-r border-b border-[rgb(0,251,205)]/40 p-4 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl mb-8 sm:mb-12 shadow-lg">
            <blockquote className="text-lg sm:text-2xl md:text-3xl font-bold text-white font-mono text-center tracking-wide sm:tracking-wider uppercase">
              &ldquo;Showcase your projects, not your loading screens.&rdquo;
            </blockquote>
          </div>

          {/* Story Section */}
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            {/* Left Column - Personal Info */}
            <div className="space-y-6">
              <div className="bg-black/30 rounded-2xl p-6 border-2 border-[rgb(0,251,205)]/25 h-56 flex flex-col shadow-lg">
                <h3 className="text-xl font-bold text-[rgb(0,251,205)] mb-3 flex-shrink-0">
                  Who I Am
                </h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-base text-white/80 leading-relaxed">
                    I&apos;m{" "}
                    <span className="text-[rgb(0,251,205)] font-bold">
                      Nirmal Haldar
                    </span>
                    , a B.Tech student at{" "}
                    <span className="text-white font-bold">
                      Chandigarh Engineering College Jhanjeri, Mohali
                    </span>
                    , passionate about Artificial Intelligence and Machine
                    Learning.
                  </p>
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 border-2 border-[rgb(0,251,205)]/25 h-56 flex flex-col shadow-lg">
                <h3 className="text-xl font-bold text-[rgb(0,251,205)] mb-3 flex-shrink-0">
                  The Problem
                </h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-base text-white/80 leading-relaxed">
                    While building and hosting my AI/ML projects on free
                    platforms like{" "}
                    <span className="text-white font-bold">
                      Render, Streamlit, and similar services
                    </span>
                    , I encountered a frustrating problem: these platforms
                    automatically put applications to sleep after inactivity.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Solution */}
            <div className="space-y-6">
              <div className="bg-black/30 rounded-2xl p-6 border-2 border-[rgb(0,251,205)]/25 h-56 flex flex-col shadow-lg">
                <h3 className="text-xl font-bold text-[rgb(0,251,205)] mb-3 flex-shrink-0">
                  The Impact
                </h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-base text-white/80 leading-relaxed">
                    This created a poor first impression when showcasing my work
                    to{" "}
                    <span className="text-white font-bold">
                      reviewers, recruiters, or collaborators
                    </span>{" "}
                    — instead of instantly seeing my project, they were met with
                    long loading times.
                  </p>
                </div>
              </div>

              <div className="bg-black/30 rounded-2xl p-6 border-2 border-[rgb(0,251,205)]/25 h-56 flex flex-col shadow-lg">
                <h3 className="text-xl font-bold text-[rgb(0,251,205)] mb-3 flex-shrink-0">
                  The Solution
                </h3>
                <div className="flex-1 overflow-hidden">
                  <p className="text-base text-white/80 leading-relaxed">
                    I created a{" "}
                    <span className="text-[rgb(0,251,205)] font-bold">
                      Cron Job–based Website Uptime Keeper
                    </span>{" "}
                    that automatically sends periodic &ldquo;keep-alive&rdquo;
                    requests to hosted projects, ensuring they stay awake and
                    instantly accessible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits Section */}
          <div className="bg-gradient-to-br from-[rgb(0,251,205)]/15 to-[rgb(0,251,205)]/5 rounded-2xl p-8 border border-[rgb(0,251,205)]/20">
            <h3 className="text-3xl font-bold text-[rgb(0,251,205)] mb-8 text-center">
              Key Benefits
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-[rgb(0,251,205)] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-white/80">
                  Keeps free-hosted projects{" "}
                  <span className="text-white font-bold">always live</span> for
                  demos and showcases.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-[rgb(0,251,205)] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-white/80">
                  Supports{" "}
                  <span className="text-white font-bold">multiple URLs</span>{" "}
                  and flexible scheduling.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-[rgb(0,251,205)] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-white/80">
                  Reduces the awkward{" "}
                  <span className="text-white font-bold">
                    &ldquo;please wait while it wakes up&rdquo;
                  </span>{" "}
                  moments.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-[rgb(0,251,205)] rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-lg text-white/80">
                  <span className="text-white font-bold">
                    Simple, reliable, and cost-effective.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="text-center mt-12">
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Whether you&apos;re a{" "}
              <span className="text-[rgb(0,251,205)] font-bold">
                student, developer, or freelancer
              </span>
              , this tool makes sure your hosted projects are always ready to
              impress — no matter when someone clicks your link.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Link
          href="/"
          className="px-8 py-4 bg-[rgb(0,251,205)] text-black font-semibold rounded-full hover:bg-[rgb(0,251,205)]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(0,251,205)]/25 cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
