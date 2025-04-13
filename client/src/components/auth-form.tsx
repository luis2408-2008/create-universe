import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon } from "@/components/icons";

// Extend the schema with validation
const loginSchema = insertUserSchema.extend({});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(1, "La confirmación de contraseña es requerida"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export function AuthForm() {
  const [activeTab, setActiveTab] = useState<string>("login");
  const { loginMutation, registerMutation } = useAuth();

  // Login form
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Register form
  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Submit handlers
  const onLoginSubmit = (values: LoginFormValues) => {
    loginMutation.mutate(values);
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    const { confirmPassword, ...userData } = values;
    registerMutation.mutate(userData);
  };
  
  // Function to generate animated stars in the card background
  const generateStarryBackground = () => {
    const starElements = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 2 + 1;
      starElements.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white animate-pulse-slow"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.4 + Math.random() * 0.5,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      );
    }
    return starElements;
  };

  return (
    <div className="w-full max-w-md relative z-10">
      <Card className="glassmorphism rounded-2xl shadow-cosmic overflow-hidden transition-all duration-500 cosmic-border relative">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/5 to-pink-600/10 backdrop-blur-3xl -z-10"></div>
        
        {/* Animated stars in background */}
        <div className="absolute inset-0 overflow-hidden">
          {generateStarryBackground()}
        </div>
        
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="relative z-10">
          <TabsList className="w-full grid grid-cols-2 bg-transparent p-1 border-b border-white/10">
            <TabsTrigger 
              value="login" 
              className="relative data-[state=active]:bg-space-purple/20 data-[state=active]:text-white text-white/70 py-3 rounded-t-lg transition-all"
            >
              <span className="relative z-10">Iniciar Sesión</span>
              {activeTab === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-space-purple via-space-violet to-space-indigo animate-shimmer" 
                     style={{ backgroundSize: "200% 100%" }}></div>
              )}
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="relative data-[state=active]:bg-space-indigo/20 data-[state=active]:text-white text-white/70 py-3 rounded-t-lg transition-all"
            >
              <span className="relative z-10">Registrarse</span>
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-space-indigo via-space-violet to-space-purple animate-shimmer" 
                     style={{ backgroundSize: "200% 100%" }}></div>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-8 space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-white mb-1">Bienvenido de Nuevo</h3>
              <p className="text-white/60 text-sm">Explora los misterios del universo</p>
            </div>
            
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-5">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white font-medium">Usuario</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/40">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tu nombre de usuario"
                            className="pl-10 py-5 rounded-xl bg-white/10 border-white/10 border hover:border-space-purple/50 transition-colors text-white/90 focus-visible:ring-space-purple focus-visible:border-space-purple/50"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-pink-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white font-medium">Contraseña</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/40">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Tu contraseña"
                            className="pl-10 py-5 rounded-xl bg-white/10 border-white/10 border hover:border-space-purple/50 transition-colors text-white/90 focus-visible:ring-space-purple focus-visible:border-space-purple/50"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-pink-400" />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden bg-cosmic-gradient py-6 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-cosmic group"
                    disabled={loginMutation.isPending}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {loginMutation.isPending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Ingresando...
                        </>
                      ) : (
                        <>
                          Ingresar al Cosmos
                          <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </span>
                    
                    {/* Button animation effect */}
                    <div className="absolute inset-0 bg-cosmic-gradient opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-1000"></div>
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="register" className="p-8 space-y-6 animate-fadeIn">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-white mb-1">Únete a la Exploración</h3>
              <p className="text-white/60 text-sm">Crea tu cuenta para acceder a todo el contenido</p>
            </div>
            
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-5">
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white font-medium">Elige un Usuario</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/40">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                          </svg>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Tu nombre de usuario"
                            className="pl-10 py-5 rounded-xl bg-white/10 border-white/10 border hover:border-space-indigo/50 transition-colors text-white/90 focus-visible:ring-space-indigo focus-visible:border-space-indigo/50"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-pink-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white font-medium">Contraseña</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/40">
                            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Crea una contraseña segura"
                            className="pl-10 py-5 rounded-xl bg-white/10 border-white/10 border hover:border-space-indigo/50 transition-colors text-white/90 focus-visible:ring-space-indigo focus-visible:border-space-indigo/50"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-pink-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="text-white font-medium">Confirmar Contraseña</FormLabel>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white/40">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                          </svg>
                        </div>
                        <FormControl>
                          <Input
                            {...field}
                            type="password"
                            placeholder="Confirma tu contraseña"
                            className="pl-10 py-5 rounded-xl bg-white/10 border-white/10 border hover:border-space-indigo/50 transition-colors text-white/90 focus-visible:ring-space-indigo focus-visible:border-space-indigo/50"
                          />
                        </FormControl>
                      </div>
                      <FormMessage className="text-pink-400" />
                    </FormItem>
                  )}
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full relative overflow-hidden bg-gradient-to-r from-space-indigo to-space-violet py-6 rounded-xl text-white font-medium transition-all duration-300 hover:shadow-cosmic group"
                    disabled={registerMutation.isPending}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {registerMutation.isPending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creando Cuenta...
                        </>
                      ) : (
                        <>
                          Crear Mi Cuenta
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-2">
                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                          </svg>
                        </>
                      )}
                    </span>
                    
                    {/* Button animation effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-space-indigo to-space-violet opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-1000"></div>
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        {/* Animated glowing border effect */}
        <div className="absolute inset-0 -z-20 rounded-2xl animate-glowing opacity-60"></div>
      </Card>
      
      {/* Floating elements */}
      <div className="absolute w-24 h-24 -top-6 -left-6 bg-space-purple/20 rounded-full blur-xl animate-float z-0"></div>
      <div className="absolute w-32 h-32 -bottom-10 -right-10 bg-space-indigo/20 rounded-full blur-xl animate-float z-0" style={{animationDelay: '2s'}}></div>
    </div>
  );
}
