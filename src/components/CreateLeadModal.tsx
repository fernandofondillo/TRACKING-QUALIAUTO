"use client";

import React, { useState } from 'react';
import { LeadCanal } from '@/types/database';
import { createLead } from '@/lib/actions';
import { X } from 'lucide-react';

interface CreateLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateLeadModal({ isOpen, onClose, onSuccess }: CreateLeadModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        nombre_cliente: '',
        telefono: '',
        email: '',
        vehiculo_interes: '',
        canal: 'Web' as LeadCanal,
        notas: ''
    });

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { error } = await createLead({
                ...formData,
                fase: 'Nuevo'
            });
            if (error) throw error;
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Error creating lead:', error);
            alert('Error al crear el lead. Por favor intenta de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl overflow-hidden glass-morphism animate-in slide-in-from-bottom-4 duration-300">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold">Nuevo Lead</h2>
                        <p className="text-sm text-muted-foreground">Ingresa los datos del nuevo prospecto.</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Nombre del Cliente</label>
                            <input
                                required
                                type="text"
                                value={formData.nombre_cliente}
                                onChange={(e) => setFormData({ ...formData, nombre_cliente: e.target.value })}
                                className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm"
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Teléfono</label>
                            <input
                                type="tel"
                                value={formData.telefono}
                                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                                className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm"
                                placeholder="+34 600 000 000"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm"
                            placeholder="juan@ejemplo.com"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Vehículo de Interés</label>
                            <input
                                type="text"
                                value={formData.vehiculo_interes}
                                onChange={(e) => setFormData({ ...formData, vehiculo_interes: e.target.value })}
                                className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm"
                                placeholder="Ej: Toyota Corolla 2022"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Canal de Origen</label>
                            <select
                                value={formData.canal}
                                onChange={(e) => setFormData({ ...formData, canal: e.target.value as LeadCanal })}
                                className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm"
                            >
                                <option value="Web">Web</option>
                                <option value="Facebook">Facebook</option>
                                <option value="Instagram">Instagram</option>
                                <option value="WhatsApp">WhatsApp</option>
                                <option value="Referido">Referido</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Notas Iniciales</label>
                        <textarea
                            value={formData.notas}
                            onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                            className="w-full bg-muted border-none rounded-xl py-2 px-4 focus:ring-1 focus:ring-primary text-sm min-h-[100px]"
                            placeholder="Información adicional relevante..."
                        />
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {isLoading ? 'Guardando...' : 'Crear Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
