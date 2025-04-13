import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { AuthForm } from "@/components/auth-form";

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();

  // Redirect to home if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading, navigate]);

  // Apply the starry background styles
  const starBackground = {
    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
    backgroundSize: "50px 50px"
  };

  return (
    <div 
      className="min-h-screen w-full bg-gradient-to-br from-[#1a2a42] to-[#2d3e56] flex flex-col justify-center items-center p-4 relative"
      style={starBackground}
    >
      <AuthForm />
    </div>
  );
}
