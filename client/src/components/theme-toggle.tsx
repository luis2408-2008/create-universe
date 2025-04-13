import { useTheme } from "@/hooks/use-theme";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full glassmorphism overflow-hidden group hover:shadow-cosmic transition-all duration-300"
      aria-label="Cambiar tema"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-space-indigo/10 to-space-purple/20 group-hover:opacity-100 opacity-50 transition-opacity"></div>
      
      {/* Sun/Moon icon container with animation */}
      <div className="relative z-10 flex items-center justify-center w-full h-full transition-transform duration-500 transform group-hover:scale-110">
        {theme === "dark" ? (
          <div className="relative">
            <div className="absolute -inset-1 bg-yellow-400/30 rounded-full blur-md animate-pulse-slow"></div>
            <SunIcon className="h-5 w-5 text-yellow-300 relative" />
          </div>
        ) : (
          <div className="relative">
            <div className="absolute -inset-1 bg-indigo-400/30 rounded-full blur-md animate-pulse-slow"></div>
            <MoonIcon className="h-5 w-5 text-indigo-200 relative" />
          </div>
        )}
      </div>
      
      {/* Animated stars in background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse-slow"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4 + Math.random() * 0.5,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </Button>
  );
}
