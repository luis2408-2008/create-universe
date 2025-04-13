import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserIcon, LogoutIcon, AstronautIcon, RocketIcon, AtomIcon } from "@/components/icons";

export function UserMenu() {
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpen(false);
  };

  if (!user) return null;

  const getRandomGradient = () => {
    const gradients = [
      'from-space-purple to-space-indigo',
      'from-space-indigo to-space-blue',
      'from-space-violet to-space-purple',
      'from-space-blue to-space-cyan',
      'from-space-pink to-space-purple',
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };
  
  // This would be based on user data in a real app
  const userGradient = getRandomGradient();

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism text-white hover:shadow-cosmic transition-all duration-300"
        >
          <div className="flex flex-col items-end mr-1">
            <span className="text-sm font-medium">{user.username}</span>
            <span className="text-xs text-white/60">Explorador</span>
          </div>
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${userGradient} p-0.5 shadow-sm flex items-center justify-center group-hover:shadow-md transition-all duration-300`}>
            <div className="bg-black/30 rounded-full w-full h-full flex items-center justify-center backdrop-blur-sm">
              <AstronautIcon className="h-5 w-5 text-white" />
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 glassmorphism border border-white/10 backdrop-blur-xl rounded-xl overflow-hidden animate-fadeIn shadow-cosmic"
      >
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${userGradient} p-0.5 flex items-center justify-center`}>
              <div className="bg-black/30 rounded-full w-full h-full flex items-center justify-center backdrop-blur-sm">
                <AstronautIcon className="h-5 w-5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-white font-medium">{user.username}</p>
              <p className="text-white/60 text-xs">Explorador Cósmico</p>
            </div>
          </div>
        </div>
        
        <div className="p-2">
          <DropdownMenuItem className="rounded-lg flex items-center gap-3 py-2.5 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-space-purple/20 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-space-purple" />
            </div>
            <span>Mi Perfil</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="rounded-lg flex items-center gap-3 py-2.5 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-space-indigo/20 flex items-center justify-center">
              <RocketIcon className="h-4 w-4 text-space-indigo" />
            </div>
            <span>Mis Expediciones</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="rounded-lg flex items-center gap-3 py-2.5 text-white hover:bg-white/10 focus:bg-white/10 cursor-pointer transition-colors">
            <div className="w-8 h-8 rounded-full bg-space-violet/20 flex items-center justify-center">
              <AtomIcon className="h-4 w-4 text-space-violet" />
            </div>
            <span>Configuración</span>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-1 bg-white/10" />
          
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="rounded-lg flex items-center gap-3 py-2.5 text-white hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
              <LogoutIcon className="h-4 w-4 text-red-400" />
            </div>
            {logoutMutation.isPending ? (
              <div className="flex items-center">
                <svg className="animate-spin h-4 w-4 text-white mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Cerrando sesión...</span>
              </div>
            ) : (
              <span>Cerrar Sesión</span>
            )}
          </DropdownMenuItem>
        </div>

        <div className="p-3 border-t border-white/10 flex justify-center">
          <span className="text-xs text-white/40 text-center">Universo Origen v1.0</span>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
