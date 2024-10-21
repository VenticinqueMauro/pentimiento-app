'use client';

import { handleLogin } from "@/actions/auth/login";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submitButton";

export default function LoginForm() {

  const router = useRouter();

  async function handleSubmit(formData: FormData): Promise<void> {

    try {
      const result = await handleLogin(formData);

      const message = result?.message ?? result?.error;
      const title = result?.message ? 'Bienvenid@ 😃!' : 'Error 😮‍💨';

      if (message) {
        toast({
          title,
          description: message,
        });
        router.push('/dashboard');
      }

    } catch (error) {
      toast({
        title: 'Error inesperado 😢',
        description: 'Algo salió mal, por favor intente de nuevo.',
      });
      console.error('Error en handleSubmit:', error);
    }
  }

  return (
    <div className="w-full flex justify-center lg:grid h-screen lg:grid-cols-2 relative px-3 lg:px-6">
      <Link href='/' className="absolute top-10 left-3 lg:left-6  group">
        <div className="flex items-center gap-x-2 underline text-sm hover:text-blue-500 transition-colors duration-200">
          <MoveLeft className="w-4 h-4 transition-transform duration-200 transform group-hover:-translate-x-1" />
          <span>Volver</span>
        </div>
      </Link>
      <form action={handleSubmit} className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
            <p className="text-balance text-muted-foreground">
              Ingresa tu correo electrónico para acceder a tu cuenta
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@ejemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <SubmitButton title="Inicar Sesión" />
          </div>
        </div>
      </form>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Imagen"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}