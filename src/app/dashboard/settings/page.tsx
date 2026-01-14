import React from 'react';
import { Header } from "@/components/Header";
import { User, Shield, Bell } from 'lucide-react';
import { getUserProfile } from '@/lib/actions';
import { ProfileForm } from '@/components/ProfileForm';

export default async function SettingsPage() {
    const { data: profile } = await getUserProfile();

    if (!profile) return null;

    return (
        <>
            <Header title="Configuración" userName={profile.nombre || 'Usuario'} />

            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Ajustes del Sistema</h2>
                        <p className="text-muted-foreground mt-1">Configura tu perfil y las preferencias de la aplicación.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="col-span-1 space-y-4">
                        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20">
                            <User className="w-5 h-5" />
                            Perfil de Usuario
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
                            <Shield className="w-5 h-5" />
                            Seguridad
                        </button>
                        <button className="flex items-center gap-3 w-full p-4 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors">
                            <Bell className="w-5 h-5" />
                            Notificaciones
                        </button>
                    </div>

                    <div className="col-span-2">
                        <div className="bg-card border border-border rounded-2xl p-8 glass-morphism">
                            <h3 className="text-lg font-semibold mb-6">Información Personal</h3>
                            <ProfileForm profile={profile} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
