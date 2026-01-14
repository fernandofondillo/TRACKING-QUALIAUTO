"use client";

import React, { useState } from 'react';
import { Lead, LeadFase, ResultadoType, MotivoPerdida, TipoVenta } from "@/types/database";

export function LeadDynamicForm({ lead, onUpdate }: { lead: Lead; onUpdate: (data: Partial<Lead>) => void }) {
    const [fase, setFase] = useState<LeadFase>(lead.fase_actual);
    const [resultado, setResultado] = useState<ResultadoType>(lead.resultado);
    const [motivoPerdida, setMotivoPerdida] = useState<MotivoPerdida | ''>(lead.motivo_perdida || '');
    const [tipoVenta, setTipoVenta] = useState<TipoVenta | ''>(lead.tipo_venta || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdate({
            fase_actual: fase,
            resultado: resultado,
            motivo_perdida: resultado === 'Venta perdida' ? (motivoPerdida as MotivoPerdida) : null,
            tipo_venta: resultado === 'Venta cerrada' ? (tipoVenta as TipoVenta) : null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fase Actual</label>
                <select
                    value={fase}
                    onChange={(e) => setFase(e.target.value as LeadFase)}
                    className="w-full bg-muted border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary text-sm"
                >
                    <option value="Lead recibido">Lead recibido</option>
                    <option value="Contactado">Contactado</option>
                    <option value="Interés confirmado">Interés confirmado</option>
                    <option value="Oferta presentada">Oferta presentada</option>
                    <option value="Seguimiento activo">Seguimiento activo</option>
                    <option value="Prueba">Prueba</option>
                    <option value="Reserva">Reserva</option>
                    <option value="Negociación">Negociación</option>
                </select>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Resultado</label>
                <select
                    value={resultado}
                    onChange={(e) => setResultado(e.target.value as ResultadoType)}
                    className="w-full bg-muted border-none rounded-xl py-3 px-4 focus:ring-1 focus:ring-primary text-sm font-bold"
                >
                    <option value="Abierto">Abierto</option>
                    <option value="Venta cerrada" className="text-green-500">Venta cerrada</option>
                    <option value="Venta perdida" className="text-red-500">Venta perdida</option>
                </select>
            </div>

            {resultado === 'Venta perdida' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs font-semibold uppercase tracking-wider text-red-500 italic">Motivo de la Pérdida (Obligatorio)</label>
                    <select
                        required
                        value={motivoPerdida}
                        onChange={(e) => setMotivoPerdida(e.target.value as MotivoPerdida)}
                        className="w-full bg-destructive/10 border border-destructive/20 rounded-xl py-3 px-4 focus:ring-1 focus:ring-destructive text-sm"
                    >
                        <option value="">Seleccione motivo...</option>
                        <option value="Precio">Precio</option>
                        <option value="Financiación">Financiación</option>
                        <option value="No responde">No responde</option>
                        <option value="Compra otro">Compra otro</option>
                        <option value="Inadecuado">Inadecuado</option>
                        <option value="Desconfianza">Desconfianza</option>
                        <option value="Otros">Otros</option>
                    </select>
                </div>
            )}

            {resultado === 'Venta cerrada' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="text-xs font-semibold uppercase tracking-wider text-green-500">Tipo de Venta</label>
                    <select
                        required
                        value={tipoVenta}
                        onChange={(e) => setTipoVenta(e.target.value as TipoVenta)}
                        className="w-full bg-green-500/10 border border-green-500/20 rounded-xl py-3 px-4 focus:ring-1 focus:ring-green-500 text-sm font-bold"
                    >
                        <option value="">Seleccione tipo...</option>
                        <option value="Contado">Contado</option>
                        <option value="Financiado">Financiado</option>
                    </select>
                </div>
            )}

            <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary/20 mt-4"
            >
                Actualizar Lead
            </button>
        </form>
    );
}
