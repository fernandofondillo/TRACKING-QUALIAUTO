"use client";

import React, { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { Car } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            window.location.href = '/dashboard/admin';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-3xl glass-morphism shadow-2xl">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                        <Car className="text-primary-foreground w-10 h-10" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight uppercase">QualiAuto</h1>
                    <p className="text-muted-foreground mt-2 text-sm">TRACKING & CRM VEHÍCULOS</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Corporativo</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-muted border-none rounded-2xl py-4 px-5 focus:ring-1 focus:ring-primary text-sm shadow-inner"
                            placeholder="vendedor@qualiauto.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Contraseña</label>
                        <input
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-muted border-none rounded-2xl py-4 px-5 focus:ring-1 focus:ring-primary text-sm shadow-inner"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-destructive text-xs font-medium bg-destructive/10 p-3 rounded-lg border border-destructive/20">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-4 rounded-2xl font-bold transition-all shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Iniciando sesión...' : 'Entrar al Sistema'}
                    </button>
                </form>

                <p className="text-center text-xs text-muted-foreground mt-8 uppercase tracking-widest opacity-50">
                    Acceso Restringido • QualiAuto S.L.
                </p>
            </div>
        </div>
    );
}
