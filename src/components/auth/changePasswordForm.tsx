'use client';

import { handleLogout } from '@/actions/auth/logout';
import { handlePasswordUpdate } from '@/actions/auth/updatePassword';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submitButton';

export default function ChangePasswordForm() {

    async function handleSubmit(formData: FormData): Promise<void> {
        const result = await handlePasswordUpdate(formData);

        const message = result?.message ?? result?.error;
        const title = result?.message ? 'Contraseña actualizada 😃!' : 'Error 😮‍💨';

        if (message) {
            toast({
                title,
                description: message,
            });

            await handleLogout();
            redirect('/auth/login')
        }
    }

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex justify-center items-center relative px-3 lg:px-6">
                <form action={handleSubmit}>
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Cambiar contraseña</CardTitle>
                            <CardDescription>
                                Ingresa tu información para cambiar contraseña
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="currentPassword">Contraseña actual</Label>
                                    <Input
                                        id="currentPassword"
                                        type="password"
                                        name="currentPassword"
                                        placeholder="******"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="newPassword">Nueva contraseña</Label>
                                    <Input
                                        id="newPassword"
                                        type="password"
                                        name="newPassword"
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
                                <SubmitButton title="Cambiar contraseña" />
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    )
}
