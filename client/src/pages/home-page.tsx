import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@/hooks/use-theme";
import { useAuth } from "@/hooks/use-auth";
import { Theory, Video, ExpertOpinion } from "@shared/schema";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import { TheoryCard } from "@/components/theory-card";
import { VideoCard } from "@/components/video-card";
import { ExpertOpinionCard } from "@/components/expert-opinion-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PlanetIcon, ArrowRightIcon, MailIcon, BookmarkIcon, AtomIcon, AstronautIcon, TelescopeIcon } from "@/components/icons";

export default function HomePage() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("scientific");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Fetch theories
  const { data: theories = [] } = useQuery<Theory[]>({
    queryKey: ["/api/theories"],
  });

  // Fetch videos
  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
  });

  // Fetch expert opinions
  const { data: expertOpinions = [] } = useQuery<ExpertOpinion[]>({
    queryKey: ["/api/expert-opinions"],
  });

  // Filter theories by category for the current tab
  const filteredTheories = theories.filter(theory => theory.category === activeTab);
  
  // Get featured theory (where category is 'featured')
  const featuredTheory = theories.find(theory => theory.category === 'featured');

  // Star background style
  const starBackground = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "50px 50px"
  };

  return (
    <div className="min-h-screen bg-white dark:bg-spacedark transition-colors duration-500">
      {/* Navbar */}
      <nav className="glassmorphism backdrop-blur-md fixed w-full top-0 z-50 transition-all duration-500 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            {/* Logo and navigation */}
            <div className="flex items-center gap-6 md:gap-10 flex-1">
              {/* Logo */}
              <a href="/" className="flex-shrink-0 flex items-center group">
                <div className="relative mr-2">
                  <div className="absolute inset-0 rounded-full bg-cosmic-gradient opacity-75 blur-sm group-hover:opacity-100 transition-opacity"></div>
                  <PlanetIcon className="h-8 w-8 text-white relative z-10 animate-pulse-slow" />
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat font-bold text-xl text-white tracking-wide">Universo Origen</span>
                  <span className="text-xs text-white/60 font-space hidden sm:block">Cosmos Explorer</span>
                </div>
              </a>
              
              {/* Desktop navigation */}
              <div className="hidden md:flex space-x-6 lg:space-x-8">
                <a 
                  onClick={() => setActiveTab("scientific")}
                  href="#teorias" 
                  className="text-white/70 hover:text-white flex items-center gap-2 px-1 py-2 border-b-2 border-transparent hover:border-space-purple transition-all"
                >
                  <AtomIcon className="h-4 w-4" />
                  <span>Teorías</span>
                </a>
                <a 
                  onClick={() => setActiveTab("videos")}
                  href="#videos" 
                  className="text-white/70 hover:text-white flex items-center gap-2 px-1 py-2 border-b-2 border-transparent hover:border-space-indigo transition-all"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="m14 12-8.5 6V6l8.5 6Z"/>
                    <path d="M16 6v12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2Z"/>
                  </svg>
                  <span>Videos</span>
                </a>
                <a 
                  onClick={() => setActiveTab("experts")}
                  href="#expertos" 
                  className="text-white/70 hover:text-white flex items-center gap-2 px-1 py-2 border-b-2 border-transparent hover:border-space-violet transition-all"
                >
                  <AstronautIcon className="h-4 w-4" />
                  <span>Expertos</span>
                </a>
                <a 
                  onClick={() => setActiveTab("conspiracy")} 
                  href="#teorias-conspiracion" 
                  className="text-white/70 hover:text-white flex items-center gap-2 px-1 py-2 border-b-2 border-transparent hover:border-space-pink transition-all"
                >
                  <TelescopeIcon className="h-4 w-4" />
                  <span>Conspiraciones</span>
                </a>
              </div>
            </div>
            
            {/* User menu and theme toggle */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search button - only on desktop */}
              <Button 
                variant="ghost" 
                className="rounded-full glassmorphism p-2 hidden lg:flex items-center gap-2 text-white/80 hover:text-white group hover:shadow-cosmic transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 group-hover:scale-110 transition-transform">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <span className="text-sm">Buscar</span>
              </Button>
              
              <ThemeToggle />
              <UserMenu />
              
              {/* Mobile menu button with state */}
              <div className="md:hidden relative">
                <Button 
                  variant="ghost" 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="relative w-10 h-10 rounded-full glassmorphism overflow-hidden hover:shadow-cosmic"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-space-indigo/10 to-space-purple/10 opacity-50"></div>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="h-5 w-5 text-white"
                  >
                    {isMobileMenuOpen ? (
                      // X icon when menu is open
                      <>
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </>
                    ) : (
                      // Hamburger icon when menu is closed
                      <>
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                      </>
                    )}
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-cosmic-deep/95 backdrop-blur-md border-t border-white/10 animate-fadeIn">
            <div className="px-4 py-3 space-y-3">
              <a 
                onClick={() => {
                  setActiveTab("scientific");
                  setIsMobileMenuOpen(false);
                }}
                href="#teorias" 
                className="text-white flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-space-purple/20 flex items-center justify-center">
                  <AtomIcon className="h-4 w-4 text-space-purple" />
                </div>
                <span>Teorías Científicas</span>
              </a>
              
              <a 
                onClick={() => {
                  setActiveTab("videos");
                  setIsMobileMenuOpen(false);
                }}
                href="#videos" 
                className="text-white flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-space-indigo/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-space-indigo">
                    <path d="m14 12-8.5 6V6l8.5 6Z"/>
                    <path d="M16 6v12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2Z"/>
                  </svg>
                </div>
                <span>Videos</span>
              </a>
              
              <a 
                onClick={() => {
                  setActiveTab("experts");
                  setIsMobileMenuOpen(false);
                }}
                href="#expertos" 
                className="text-white flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-space-violet/20 flex items-center justify-center">
                  <AstronautIcon className="h-4 w-4 text-space-violet" />
                </div>
                <span>Opiniones de Expertos</span>
              </a>
              
              <a 
                onClick={() => {
                  setActiveTab("conspiracy");
                  setIsMobileMenuOpen(false);
                }}
                href="#teorias-conspiracion" 
                className="text-white flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-space-pink/20 flex items-center justify-center">
                  <TelescopeIcon className="h-4 w-4 text-space-pink" />
                </div>
                <span>Conspiraciones</span>
              </a>
              
              <a 
                onClick={() => {
                  setActiveTab("fun-fact");
                  setIsMobileMenuOpen(false);
                }}
                href="#curiosidades" 
                className="text-white flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-space-cyan/20 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-space-cyan">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4"/>
                    <path d="M12 8h.01"/>
                  </svg>
                </div>
                <span>Curiosidades</span>
              </a>
              
              {/* Search button in mobile menu */}
              <div className="px-3 pt-2 pb-3 border-t border-white/10">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-space-indigo/50"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>

      {/* Main content */}
      <main>
        {/* Hero section */}
        <section className="relative overflow-hidden min-h-[85vh] flex items-center justify-center">
          {/* Background with stars and nebula effect */}
          <div className="absolute inset-0 bg-cosmic-deep">
            {/* Animated star field */}
            <div className="absolute inset-0 bg-star-pattern bg-[length:50px_50px] opacity-60"></div>
            
            {/* Animated nebula/galaxy effect */}
            <div className="absolute w-full h-full overflow-hidden">
              <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-space-purple/10 animate-pulse-slow blur-[100px]"></div>
              <div className="absolute bottom-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-space-indigo/10 animate-pulse-slow blur-[100px]" style={{ animationDelay: "1s" }}></div>
              <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-space-violet/10 animate-pulse-slow blur-[120px]" style={{ animationDelay: "2s" }}></div>
              <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-space-pink/10 animate-pulse-slow blur-[80px]" style={{ animationDelay: "3s" }}></div>
            </div>
            
            {/* Random twinkling stars */}
            {[...Array(100)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white animate-pulse-slow"
                style={{
                  width: `${Math.random() * 2 + 1}px`,
                  height: `${Math.random() * 2 + 1}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: 0.4 + Math.random() * 0.6,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
          
          {/* Content wrapper */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Text content */}
              <div className="md:w-1/2 text-center md:text-left">
                <div className="inline-block mb-4 px-3 py-1 bg-space-indigo/20 backdrop-blur-sm rounded-full border border-space-indigo/30">
                  <span className="font-space text-sm text-white/80 tracking-wide">Explorando el Cosmos</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat text-white mb-6 leading-tight">
                  <span className="inline-block cosmic-text">El Origen</span> <br />
                  del Universo
                </h1>
                
                <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg">
                  Descubre las teorías científicas, misterios cósmicos y las grandes preguntas sobre nuestra existencia en un viaje por las fronteras del conocimiento humano.
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <a 
                    href="#teorias" 
                    className="px-6 py-3 bg-gradient-to-r from-space-purple to-space-indigo text-white font-medium rounded-xl flex items-center gap-2 transition-all hover:shadow-cosmic group animate-fadeIn"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <AtomIcon className="h-5 w-5" />
                    <span>Explorar Teorías</span>
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a 
                    href="#videos" 
                    className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium rounded-xl flex items-center gap-2 transition-all hover:bg-white/20 animate-fadeIn"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                      <path d="m14 12-8.5 6V6l8.5 6Z"/>
                      <path d="M16 6v12h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2Z"/>
                    </svg>
                    <span>Ver Videos</span>
                  </a>
                </div>
                
                {/* Stats counters with animation */}
                <div className="flex flex-wrap gap-8 justify-center md:justify-start mt-12 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-montserrat text-3xl font-bold text-space-indigo">15+</span>
                    <span className="text-white/60 text-sm">Teorías Científicas</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-montserrat text-3xl font-bold text-space-purple">24</span>
                    <span className="text-white/60 text-sm">Videos Explicativos</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="font-montserrat text-3xl font-bold text-space-violet">8</span>
                    <span className="text-white/60 text-sm">Expertos Científicos</span>
                  </div>
                </div>
              </div>
              
              {/* 3D animated universe illustration */}
              <div className="md:w-1/2 flex justify-center">
                <div className="relative w-full max-w-md h-[400px] flex items-center justify-center perspective-1000">
                  {/* Outer orbit */}
                  <div className="absolute w-[350px] h-[350px] rounded-full border border-space-indigo/30 animate-spin-slow" style={{ animationDuration: '30s' }}>
                    {/* Planet on outer orbit */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-space-indigo shadow-cosmic-lg"></div>
                  </div>
                  
                  {/* Middle orbit */}
                  <div className="absolute w-[250px] h-[250px] rounded-full border border-space-violet/30 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                    {/* Planet on middle orbit */}
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-space-violet shadow-cosmic-lg"></div>
                  </div>
                  
                  {/* Inner orbit */}
                  <div className="absolute w-[150px] h-[150px] rounded-full border border-space-purple/30 animate-spin-slow" style={{ animationDuration: '15s' }}>
                    {/* Planet on inner orbit */}
                    <div className="absolute top-1/2 -left-2 w-4 h-4 rounded-full bg-space-purple shadow-cosmic-lg"></div>
                  </div>
                  
                  {/* Sun/central object */}
                  <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse-slow"></div>
                    <div className="absolute -inset-3 rounded-full bg-yellow-500/30 blur-md animate-pulse-slow"></div>
                    <div className="absolute -inset-6 rounded-full bg-yellow-500/10 blur-lg animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute -inset-10 rounded-full bg-orange-500/5 blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                  </div>
                  
                  {/* Floating stars */}
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute rounded-full bg-white animate-pulse-slow"
                      style={{
                        width: `${Math.random() * 2 + 1}px`,
                        height: `${Math.random() * 2 + 1}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: 0.6 + Math.random() * 0.4,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        zIndex: Math.floor(Math.random() * 10)
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float flex flex-col items-center text-white/60">
            <span className="text-sm mb-2 font-space">Desplázate para descubrir</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </section>

        {/* Main content tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Tabs defaultValue="scientific" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 dark:border-gray-800 flex overflow-x-auto space-x-8 pb-2 mb-8">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger 
                  value="scientific" 
                  className="text-lg font-medium border-b-2 data-[state=active]:border-[#f97316] border-transparent pb-2 px-1 whitespace-nowrap data-[state=active]:text-[#f97316] text-gray-600 dark:text-gray-400 hover:text-[#f97316] rounded-none shadow-none bg-transparent dark:hover:text-[#f97316]"
                >
                  Teorías Científicas
                </TabsTrigger>
                <TabsTrigger 
                  value="conspiracy" 
                  className="text-lg font-medium border-b-2 data-[state=active]:border-[#f97316] border-transparent pb-2 px-1 whitespace-nowrap data-[state=active]:text-[#f97316] text-gray-600 dark:text-gray-400 hover:text-[#f97316] rounded-none shadow-none bg-transparent dark:hover:text-[#f97316]"
                >
                  Conspiraciones & Historias Ocultas
                </TabsTrigger>
                <TabsTrigger 
                  value="fun-fact" 
                  className="text-lg font-medium border-b-2 data-[state=active]:border-[#f97316] border-transparent pb-2 px-1 whitespace-nowrap data-[state=active]:text-[#f97316] text-gray-600 dark:text-gray-400 hover:text-[#f97316] rounded-none shadow-none bg-transparent dark:hover:text-[#f97316]"
                >
                  Curiosidades
                </TabsTrigger>
                <TabsTrigger 
                  value="videos" 
                  className="text-lg font-medium border-b-2 data-[state=active]:border-[#f97316] border-transparent pb-2 px-1 whitespace-nowrap data-[state=active]:text-[#f97316] text-gray-600 dark:text-gray-400 hover:text-[#f97316] rounded-none shadow-none bg-transparent dark:hover:text-[#f97316]"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger 
                  value="experts" 
                  className="text-lg font-medium border-b-2 data-[state=active]:border-[#f97316] border-transparent pb-2 px-1 whitespace-nowrap data-[state=active]:text-[#f97316] text-gray-600 dark:text-gray-400 hover:text-[#f97316] rounded-none shadow-none bg-transparent dark:hover:text-[#f97316]"
                >
                  Opiniones Expertas
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="scientific" className="animate-fadeIn">
              <h2 className="text-3xl font-bold font-montserrat text-primary dark:text-white mb-8">Teorías Científicas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTheories.map(theory => (
                  <TheoryCard key={theory.id} theory={theory} />
                ))}
              </div>

              {/* Featured theory section */}
              {featuredTheory && (
                <div className="mt-16 glassmorphism rounded-2xl p-8 shadow-cosmic transition-all duration-500">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/2">
                      <Badge variant="outline" className="text-sm font-semibold bg-space-purple/10 text-space-purple border-0 px-3 py-1 rounded-full">
                        Teoría Destacada
                      </Badge>
                      <h3 className="text-2xl font-bold font-montserrat text-white mt-3 mb-4">{featuredTheory.title}</h3>
                      <p className="text-white/80 mb-6">
                        {featuredTheory.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <Button 
                          onClick={() => {
                            // Scroll to the featured theory section
                            document.getElementById('teorias')?.scrollIntoView({ behavior: 'smooth' });
                            setActiveTab('featured');
                          }}
                          className="bg-gradient-to-r from-space-purple to-space-indigo hover:from-space-indigo hover:to-space-purple text-white px-5 py-2 rounded-xl transition-all duration-300 flex items-center shadow-cosmic-sm hover:shadow-cosmic"
                        >
                          <span>Explorar en detalle</span>
                          <ArrowRightIcon className="ml-2 h-4 w-4 animate-pulse-slow" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          className="text-white/80 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center rounded-xl"
                        >
                          <BookmarkIcon className="mr-2 h-4 w-4" />
                          <span>Guardar</span>
                        </Button>
                      </div>
                    </div>
                    <div className="md:w-1/2 flex items-center justify-center">
                      <div className="relative w-full max-w-md">
                        <img 
                          src={featuredTheory.imageUrl || '/placeholder-image.jpg'}
                          alt={`Representación artística de ${featuredTheory.title}`}
                          className="rounded-xl w-full h-auto shadow-cosmic"
                        />
                        <div className="absolute -bottom-4 -right-4 glassmorphism p-3 rounded-lg shadow-cosmic transition-all duration-500">
                          <div className="text-white font-space text-sm">Múltiples Universos</div>
                          <div className="text-xs text-white/60">Concepto Visual</div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-space-purple/30 animate-pulse-slow"></div>
                        <div className="absolute top-1/4 -right-4 w-6 h-6 rounded-full bg-space-indigo/30 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos" className="animate-fadeIn">
              <h2 className="text-3xl font-bold font-montserrat text-primary dark:text-white mb-8">Videos Recomendados</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  className="bg-[#7e3af2]/10 hover:bg-[#7e3af2]/20 text-[#7e3af2] font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center mx-auto"
                >
                  <span>Ver más videos</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 011.414-1.414l4 4z" clipRule="evenodd" />
                  </svg>
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="experts" className="animate-fadeIn">
              <h2 className="text-3xl font-bold font-montserrat text-primary dark:text-white mb-12">Opiniones Científicas Destacadas</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {expertOpinions.map(opinion => (
                  <ExpertOpinionCard key={opinion.id} opinion={opinion} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="conspiracy" className="animate-fadeIn">
              <h2 className="text-3xl font-bold font-montserrat text-primary dark:text-white mb-8">Conspiraciones & Historias Alternativas</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Explora las teorías alternativas sobre el origen del universo, desde las más controvertidas hasta aquellas que desafían el paradigma científico actual.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {theories.filter(theory => theory.category === 'conspiracy').map(theory => (
                  <TheoryCard key={theory.id} theory={theory} />
                ))}
                
                {/* Teorías de conspiración adicionales */}
                <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-cosmic transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <img
                      src="/images/alien-technology.jpg" 
                      alt="Tecnología Alienígena"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-space-pink/10 text-space-pink border-0">
                        Teoría Alternativa
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-3">Intervención Extraterrestre</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Algunas teorías sugieren que civilizaciones avanzadas de otros mundos podrían haber influido en la formación del universo o en etapas posteriores de su evolución mediante tecnologías que trascienden nuestra comprensión actual.
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-space">Por: Investigadores Independientes</span>
                    <Button 
                      variant="outline" 
                      className="text-white bg-space-pink hover:bg-space-purple transition-colors rounded-lg px-4"
                    >
                      Ver detalle <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-cosmic transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <img
                      src="/images/simulation.jpg" 
                      alt="Universo como Simulación"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-space-pink/10 text-space-pink border-0">
                        Teoría Alternativa
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-3">Universo Simulado</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Esta controvertida teoría propone que nuestro universo es en realidad una simulación computacional creada por una civilización avanzada, explicando así muchas de las extrañas propiedades de la física cuántica.
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-space">Popularizada en 2003</span>
                    <Button 
                      variant="outline" 
                      className="text-white bg-space-pink hover:bg-space-purple transition-colors rounded-lg px-4"
                    >
                      Ver detalle <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="fun-fact" className="animate-fadeIn">
              <h2 className="text-3xl font-bold font-montserrat text-primary dark:text-white mb-8">Curiosidades del Universo</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Descubre datos fascinantes y poco conocidos sobre nuestro universo, desde fenómenos cósmicos extraños hasta hallazgos científicos sorprendentes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {theories.filter(theory => theory.category === 'fun-fact').map(theory => (
                  <TheoryCard key={theory.id} theory={theory} />
                ))}
                
                <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-cosmic transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <img
                      src="/images/cosmic-sound.jpg" 
                      alt="Sonido Cósmico"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-space-cyan/10 text-space-cyan border-0">
                        Curiosidad Cósmica
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-3">El Sonido del Big Bang</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      El sonido del Big Bang ha sido reconstruido por científicos. Se trataría de un profundo "ommmmm" de baja frecuencia, no muy distinto al que produce un coro de monjes budistas, pero 50 octavas más bajo que cualquier sonido que podamos escuchar.
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-space">NASA, 2003</span>
                    <Button 
                      variant="outline" 
                      className="text-white bg-space-cyan hover:bg-space-indigo transition-colors rounded-lg px-4"
                    >
                      Ver detalle <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-cosmic transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
                    <img
                      src="/images/universe-scale.jpg" 
                      alt="Escala del Universo"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="text-xs font-semibold px-2.5 py-1 rounded-full bg-space-cyan/10 text-space-cyan border-0">
                        Curiosidad Cósmica
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-3">Escala Universal</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Si el Sol fuera del tamaño de una naranja, la Tierra sería un grano de arena orbitando a 9 metros de distancia, y la estrella más cercana (Próxima Centauri) estaría a 2000 kilómetros.
                    </p>
                  </CardContent>
                  <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-space">Estudio ESA, 2019</span>
                    <Button 
                      variant="outline" 
                      className="text-white bg-space-cyan hover:bg-space-indigo transition-colors rounded-lg px-4"
                    >
                      Ver detalle <ArrowRightIcon className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Newsletter subscription */}
        <section className="bg-primary dark:bg-primary-light py-16 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-2/3">
                  <h2 className="text-3xl font-bold font-montserrat text-white mb-4">Mantente informado sobre el cosmos</h2>
                  <p className="text-white/80 mb-6">
                    Suscríbete a nuestro boletín para recibir las últimas teorías, descubrimientos y curiosidades sobre el universo directamente en tu correo electrónico.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Input 
                      type="email" 
                      placeholder="Tu correo electrónico" 
                      className="px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/50 flex-grow focus:outline-none focus:ring-2 focus:ring-[#f97316]"
                    />
                    <Button className="bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold py-3 px-6 rounded-lg transition-colors whitespace-nowrap">
                      Suscribirse
                    </Button>
                  </div>
                  <p className="text-white/60 text-sm mt-3">
                    Respetamos tu privacidad. Puedes cancelar la suscripción en cualquier momento.
                  </p>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-40 h-40 rounded-full bg-[#f97316]/30 animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <MailIcon className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-900 py-12 transition-colors duration-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <PlanetIcon className="h-5 w-5 text-[#f97316] mr-2" />
                  <span className="font-montserrat font-bold text-xl text-primary dark:text-white">Universo Origen</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Explorando los misterios del cosmos y las grandes preguntas sobre nuestra existencia.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-[#f97316]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="font-montserrat font-bold text-lg text-primary dark:text-white mb-4">Explorar</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Teorías Científicas</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Conspiraciones</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Curiosidades</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Biblioteca de Videos</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Opiniones Expertas</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-montserrat font-bold text-lg text-primary dark:text-white mb-4">Sobre Nosotros</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Equipo</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Misión</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Colaboradores</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Contacto</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-montserrat font-bold text-lg text-primary dark:text-white mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Términos de Uso</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Política de Privacidad</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-[#f97316] dark:hover:text-[#f97316]">Cookies</a></li>
                </ul>
              </div>
            </div>
            
            <Separator className="my-8 border-gray-200 dark:border-gray-800" />
            
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Universo Origen. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
