import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { insertUserSchema, InsertUser } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
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
import { ArrowRightIcon, PlanetIcon } from "@/components/icons";

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

  return (
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <div className="text-4xl md:text-5xl font-bold font-montserrat text-white mb-2 flex items-center justify-center">
          <PlanetIcon className="h-8 w-8 mr-2 text-[#f97316]" />
          <span>Universo Origen</span>
        </div>
        <p className="text-white/80 italic">Explorando los misterios del cosmos</p>
      </div>

      <Card className="backdrop-blur-lg bg-white/10 dark:bg-spacedark/60 border-0 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl auth-card">
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-2 bg-transparent border-b border-white/20">
            <TabsTrigger 
              value="login" 
              className="py-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#f97316] text-white/60 data-[state=active]:shadow-none rounded-none"
            >
              Iniciar Sesión
            </TabsTrigger>
            <TabsTrigger 
              value="register" 
              className="py-3 data-[state=active]:text-white data-[state=active]:border-b-2 data-[state=active]:border-[#7e3af2] text-white/60 data-[state=active]:shadow-none rounded-none"
            >
              Registrarse
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="p-6 space-y-4">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ingresa tu nombre de usuario"
                          className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#7e3af2] focus:ring-[#7e3af2]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Ingresa tu contraseña"
                          className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#7e3af2] focus:ring-[#7e3af2]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#f97316] hover:bg-[#fb923c] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Ingresando...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Ingresar
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="register" className="p-6 space-y-4">
            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Nombre de Usuario</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Elige un nombre de usuario"
                          className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#7e3af2] focus:ring-[#7e3af2]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Crea una contraseña"
                          className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#7e3af2] focus:ring-[#7e3af2]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white/90">Confirmar Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Confirma tu contraseña"
                          className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-[#7e3af2] focus:ring-[#7e3af2]/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-[#7e3af2] hover:bg-[#9461fc] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300"
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creando cuenta...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Crear Cuenta
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-2">
                        <path d="M11 5a3 3 0 11-6 0 3 3 0 016 0zM2.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 018 18a9.953 9.953 0 01-5.385-1.572zM16.25 5.75a.75.75 0 00-1.5 0v2h-2a.75.75 0 000 1.5h2v2a.75.75 0 001.5 0v-2h2a.75.75 0 000-1.5h-2v-2z" />
                      </svg>
                    </span>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Animated planet decorations */}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-[#7e3af2]/30 animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-1/4 right-1/5 w-32 h-32 rounded-full bg-[#f97316]/20 animate-[float_6s_ease-in-out_1s_infinite]"></div>
      <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-[#7e3af2]/20 animate-[float_6s_ease-in-out_2s_infinite]"></div>
    </div>
  );
}
