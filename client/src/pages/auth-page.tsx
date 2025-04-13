import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { AuthForm } from "@/components/auth-form";
import { PlanetIcon } from "@/components/icons";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stars, setStars] = useState<Array<{ top: string; left: string; size: string; duration: string; delay: string }>>([]);

  // Generate random stars
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 100; i++) {
        newStars.push({
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          size: `${Math.random() * 2 + 1}px`,
          duration: `${Math.random() * 3 + 2}s`,
          delay: `${Math.random() * 5}s`,
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate percentage position
      const xPercent = clientX / innerWidth;
      const yPercent = clientY / innerHeight;
      
      // Calculate movement factor (adjust as needed)
      const moveX = xPercent * 50 - 25; // -25 to 25px
      const moveY = yPercent * 50 - 25; // -25 to 25px
      
      // Apply the transform
      containerRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-cosmic-deep flex flex-col justify-center items-center relative">
      {/* Animated stars background */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="star absolute rounded-full"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
            '--delay': star.delay,
          } as React.CSSProperties}
        />
      ))}
      
      {/* Animated galaxy/cosmos circles */}
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-space-purple/10 animate-pulse-slow blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-space-indigo/10 animate-pulse-slow blur-3xl" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-space-violet/10 animate-pulse-slow blur-3xl" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Main content area with parallax effect */}
      <div 
        ref={containerRef}
        className="relative z-10 flex flex-col md:flex-row max-w-6xl w-full mx-auto items-center justify-between p-6 transition-transform duration-200 ease-out"
      >
        {/* Left side (hero content) */}
        <div className="w-full md:w-1/2 text-white mb-10 md:mb-0 md:mr-8">
          <div className="flex items-center mb-4">
            <div className="relative mr-4">
              <div className="absolute inset-0 bg-cosmic-gradient rounded-full blur-lg animate-pulse-slow"></div>
              <PlanetIcon className="h-12 w-12 relative z-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-montserrat font-bold tracking-tight">
              <span className="cosmic-text">Universo</span> Origen
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white/90">
            Explora los misterios del cosmos
          </h2>
          
          <p className="text-lg text-white/80 mb-6 leading-relaxed max-w-xl">
            Descubre las teorías que explican el nacimiento del universo, desde el Big Bang hasta los multiversos, pasando por las más fascinantes explicaciones alternativas y especulaciones sobre nuestro origen cósmico.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-10">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-space-purple/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <span className="text-white/80">Teorías científicas</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-space-indigo/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-white/80">Videos explicativos</span>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-space-violet/20 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <span className="text-white/80">Opiniones expertas</span>
            </div>
          </div>
          
          {/* Animated celestial object */}
          <div className="hidden md:block relative mt-8">
            <div className="absolute w-32 h-32 rounded-full bg-cosmic-purple/30 filter blur-md animate-float"></div>
            <div className="relative z-10">
              <svg viewBox="0 0 200 200" className="w-24 h-24 text-white/90 animate-spin-slow">
                <path fill="currentColor" d="M100,0 C155.228,0 200,44.772 200,100 C200,155.228 155.228,200 100,200 C44.772,200 0,155.228 0,100 C0,44.772 44.772,0 100,0 Z M100,50 C72.386,50 50,72.386 50,100 C50,127.614 72.386,150 100,150 C127.614,150 150,127.614 150,100 C150,72.386 127.614,50 100,50 Z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right side (Auth form) */}
        <div className="w-full md:w-1/2 flex justify-center">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
