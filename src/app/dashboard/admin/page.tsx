import React from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { StatsCards } from "@/components/StatsCards";
import { DashboardCharts } from "@/components/DashboardCharts";
const Badge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${className}`}>{children}</span>
);

const leads = [
    { id: '1', name: 'Juan Perez', vehicle: 'BMW Serie 3', status: 'Lead recibido', channel: 'WhatsApp', date: '2024-01-14' },
    { id: '2', name: 'Maria Garcia', vehicle: 'Audi A4', status: 'Contactado', channel: 'Coches.net', date: '2024-01-13' },
    { id: '3', name: 'Roberto S.', vehicle: 'Mercedes Class C', status: 'Prueba', channel: 'Milanuncios', date: '2024-01-13' },
];

export default function AdminDashboard() {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar role="gerente" />

            <main className="flex-1 overflow-y-auto ml-64 bg-background/50">
                <Header title="Panel de Gestión Global" userName="Fernando Rueda" />

                <div className="p-8 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Bienvenido de nuevo</h2>
                            <p className="text-muted-foreground mt-1">Aquí tienes el resumen de la actividad de hoy en QualiAuto.</p>
                        </div>
                        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-xl font-medium transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                            <span className="text-xl">+</span> Nuevo Lead
                        </button>
                    </div>

                    <StatsCards />
                    <DashboardCharts />

                    <div className="mt-8 bg-card border border-border rounded-2xl p-6 glass-morphism">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">Live Feed: Últimos Leads</h3>
                            <div className="flex gap-2">
                                <select className="bg-muted border-none rounded-lg py-1 px-3 text-sm focus:ring-1 focus:ring-primary">
                                    <option>Todos los canales</option>
                                    <option>WhatsApp</option>
                                    <option>Coches.net</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                                        <th className="pb-3 font-medium">Cliente</th>
                                        <th className="pb-3 font-medium">Vehículo</th>
                                        <th className="pb-3 font-medium">Canal</th>
                                        <th className="pb-3 font-medium">Estado</th>
                                        <th className="pb-3 font-medium">Fecha</th>
                                        <th className="pb-3 font-medium text-right">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-border">
                                    {leads.map((lead) => (
                                        <tr key={lead.id} className="group hover:bg-muted/30 transition-colors">
                                            <td className="py-4 font-medium">{lead.name}</td>
                                            <td className="py-4 text-muted-foreground">{lead.vehicle}</td>
                                            <td className="py-4 italic text-xs">{lead.channel}</td>
                                            <td className="py-4">
                                                <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-muted-foreground">{lead.date}</td>
                                            <td className="py-4 text-right">
                                                <button className="text-primary hover:underline font-medium">Ver detalle</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
