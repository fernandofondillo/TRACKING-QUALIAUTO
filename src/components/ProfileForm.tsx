"use client";

import React, { useState } from 'react';
import { Profile } from '@/types/database';
import { updateProfile } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export function ProfileForm({ profile }: { profile: Profile }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [formData, setFormData] = useState({
        nombre: profile.nombre || '',
        email: profile.email || '',
        // role is read-only usually for users
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await updateProfile({ nombre: formData.nombre });

        if (error) {
            setMessage({ type: 'error', text: 'Error al actualizar el perfil' });
        } else {
            setMessage({ type: 'success', text: 'Perfil actualizado con éxito' });
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                    <input
                        type="text"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full bg-muted border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        disabled
                        className="w-full bg-muted/50 border-none rounded-xl py-3 px-4 text-muted-foreground cursor-not-allowed"
                    />
                    <p className="text-[10px] text-muted-foreground italic">El email no se puede cambiar desde aquí.</p>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Cargo (Rol)</label>
                <input
                    type="text"
                    value={profile.role || ''}
                    disabled
                    className="w-full bg-muted/50 border-none rounded-xl py-3 px-4 text-muted-foreground cursor-not-allowed uppercase"
                />
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-xl font-medium transition-all disabled:opacity-50"
                >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </div>
        </form>
    );
}
