'use client';

import { handleRegister } from "@/actions/auth/register";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { SubmitButton } from "./submitButton";

export default function SignUpForm() {

  async function handleSubmit(formData: FormData): Promise<void> {
    const result = await handleRegister(formData);

    const message = result?.message ?? result?.error;
    const title = result?.message ? 'Yeaah 😃!' : 'Error 😮‍💨';

    if (message) {
      toast({
        title,
        description: message,
      });
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <form action={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">Regístrate</CardTitle>
            <CardDescription>
              Ingresa tu información para crear una cuenta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Nombre completo</Label>
                  <Input id="fullname" name="fullname" placeholder="Juan Lopez" required />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ejemplo@ejemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="******"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="******"
                  required
                />
              </div>
              <SubmitButton title="Crear cuenta" />
            </div>
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="underline">
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
