import React from 'react';
import { Header } from "@/components/Header";
import { getLeads, getUserProfile } from "@/lib/actions";
import { CreateLeadButton } from "@/components/CreateLeadButton";

export default async function LeadsPage() {
    const [{ data: leadsData }, { data: profile }] = await Promise.all([
        getLeads(),
        getUserProfile()
    ]);
    const leads = leadsData || [];

    return (
        <>
            <Header title="Gestión de Leads" userName={profile?.nombre || 'Usuario'} />

            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Leads en seguimiento</h2>
                        <p className="text-muted-foreground mt-1">Gestiona y actualiza el estado de tus clientes potenciales.</p>
                    </div>
                    <CreateLeadButton />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 glass-morphism">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                placeholder="Filtrar por nombre o vehículo..."
                                className="bg-muted border-none rounded-lg py-2 px-4 text-sm focus:ring-1 focus:ring-primary w-80"
                            />
                            <select className="bg-muted border-none rounded-lg py-2 px-4 text-sm focus:ring-1 focus:ring-primary">
                                <option>Todos los estados</option>
                                <option>Nuevo</option>
                                <option>Contactado</option>
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
                                {leads.length > 0 ? leads.map((lead) => (
                                    <tr key={lead.id} className="group hover:bg-muted/30 transition-colors">
                                        <td className="py-4 font-medium">{lead.nombre_cliente}</td>
                                        <td className="py-4 text-muted-foreground">{lead.vehiculo_interes}</td>
                                        <td className="py-4 italic text-xs">{lead.canal}</td>
                                        <td className="py-4">
                                            <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                                                {lead.fase}
                                            </span>
                                        </td>
                                        <td className="py-4 text-muted-foreground">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="text-primary hover:underline font-medium">Gestionar</button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-muted-foreground italic">
                                            No se encontraron leads.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
