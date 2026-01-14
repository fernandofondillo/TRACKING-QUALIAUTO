"use client";

import React from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { LeadDynamicForm } from "@/components/LeadDynamicForm";
import { Lead } from "@/types/database";

const vendorLeads: Lead[] = [
    {
        id_lead: '1',
        nombre_cliente: 'Juan Perez',
        vehiculo_interes: 'BMW Serie 3',
        fase_actual: 'Lead recibido',
        canal: 'WhatsApp',
        created_at: new Date().toISOString(),
        assigned_to: 'me',
        resultado: 'Abierto',
        telefono_cliente: '600000000',
        email_cliente: 'juan@example.com',
        tipo_venta: null,
        motivo_perdida: null,
        notas: 'Interesado en financiación'
    },
];

export default function VendorDashboard() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar role="vendedor" />

            <main className="flex-1 overflow-y-auto ml-64 bg-background/50">
                <Header title="Mis Leads Asignados" userName="Carlos Vendedor" />

                <div className="p-8 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lead List */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-xl font-bold mb-4">Gestión de Leads</h3>
                            {vendorLeads.map((lead) => (
                                <div key={lead.id_lead} className="bg-card border border-border p-5 rounded-2xl glass-morphism hover:border-primary/50 transition-all cursor-pointer">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-bold text-lg">{lead.nombre_cliente}</h4>
                                            <p className="text-primary font-medium text-sm">{lead.vehiculo_interes}</p>
                                        </div>
                                        <span className="bg-muted text-muted-foreground text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                            {lead.canal}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1.5 font-semibold">
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            {lead.fase_actual}
                                        </span>
                                        <span>•</span>
                                        <span>Asignado el {new Date(lead.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Actions / Form Sidebar */}
                        <div className="bg-card border border-border p-6 rounded-2xl glass-morphism h-fit sticky top-24">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <span className="w-2 h-6 bg-primary rounded-full"></span>
                                Actualizar Estado
                            </h3>
                            <LeadDynamicForm lead={vendorLeads[0]} onUpdate={(data) => console.log('Update:', data)} />

                            <div className="mt-8 pt-8 border-t border-border space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Notas Internas</h4>
                                <textarea
                                    className="w-full bg-muted border-none rounded-xl p-4 text-sm focus:ring-1 focus:ring-primary min-h-[100px]"
                                    placeholder="Escribe notas sobre el seguimiento..."
                                    defaultValue={vendorLeads[0].notas || ''}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
