export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-[rgb(0,251,205)] bg-[length:100%_200%] animate-gradient-shift"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Main Title with Color Animation */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
          <span className="inline-block animate-color-wave bg-gradient-to-r from-white via-[rgb(0,251,205)] to-white bg-[length:200%_100%] bg-clip-text text-transparent">
            HIT URL
          </span>
        </h1>
        
        {/* Tagline with Typing Animation */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-bold tracking-wide max-w-2xl leading-relaxed font-mono">
          <span className="typing-animation">Keep Your URLs Alive</span>
        </p>
        
        {/* CTA Button */}
        <button className="mt-12 px-8 py-4 bg-[rgb(0,251,205)] text-black font-semibold rounded-full text-lg hover:bg-[rgb(0,251,205)]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[rgb(0,251,205)]/25">
          Get Started
        </button>
      </div>

      {/* Right Side Sections - Horizontal Layout */}
      <div className="absolute top-8 right-8 z-20 flex flex-row space-x-6">
        <a href="#signup" className="text-white/90 hover:text-[rgb(0,251,205)] transition-colors duration-300 font-bold text-lg font-mono tracking-wide uppercase">
          Sign Up
        </a>
        <a href="#login" className="text-white/90 hover:text-[rgb(0,251,205)] transition-colors duration-300 font-bold text-lg font-mono tracking-wide uppercase">
          Log In
        </a>
        <a href="#about" className="text-white/90 hover:text-[rgb(0,251,205)] transition-colors duration-300 font-bold text-lg font-mono tracking-wide uppercase">
          About It
        </a>
      </div>
    </div>
  );
}