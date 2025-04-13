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
import { UserIcon, LogoutIcon } from "@/components/icons";

export function UserMenu() {
  const { user, logoutMutation } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logoutMutation.mutate();
    setOpen(false);
  };

  if (!user) return null;

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 text-primary dark:text-white hover:text-accent dark:hover:text-accent"
        >
          <span className="text-sm">{user.username}</span>
          <div className="w-10 h-10 rounded-full bg-secondary/20 dark:bg-secondary/30 flex items-center justify-center">
            <UserIcon className="h-5 w-5 text-secondary dark:text-white" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-primary">
        <DropdownMenuItem className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-light cursor-pointer">
          Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-primary-light cursor-pointer">
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={logoutMutation.isPending}
          className="text-red-500 hover:bg-gray-100 dark:hover:bg-primary-light cursor-pointer"
        >
          {logoutMutation.isPending ? (
            <span>Cerrando...</span>
          ) : (
            <>
              <LogoutIcon className="h-4 w-4 mr-2" />
              Cerrar Sesión
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
