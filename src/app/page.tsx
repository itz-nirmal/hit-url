import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] bg-[length:100%_200%] animate-gradient-shift"></div>

      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Title with Color Animation */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-4 sm:mb-6 tracking-tight">
          <span className="inline-block animate-color-wave bg-gradient-to-r from-white via-[rgb(0,251,205)] to-white bg-[length:200%_100%] bg-clip-text text-transparent">
            HIT URL
          </span>
        </h1>

        {/* Tagline with Typing Animation */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-bold tracking-wide max-w-xs sm:max-w-2xl leading-relaxed font-mono px-2">
          <span className="typing-animation">Keep Your URLs Alive</span>
        </p>

        {/* CTA Button */}
        <a
          href="/signup"
          className="mt-8 sm:mt-12 px-6 sm:px-8 py-3 sm:py-4 bg-[rgb(0,251,205)] text-black font-semibold rounded-full text-base sm:text-lg hover:bg-[rgb(0,251,205)]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(0,251,205)]/25 inline-block cursor-pointer"
        >
          Get Started
        </a>
      </div>
    </div>
  );
}
