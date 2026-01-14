import React from 'react';
import { Header } from "@/components/Header";
import { Users } from 'lucide-react';
import { getVendorStats, getUserProfile } from "@/lib/actions";

export default async function VendedoresPage() {
    const [{ data: vendorStats }, { data: profile }] = await Promise.all([
        getVendorStats(),
        getUserProfile()
    ]);
    const vendors = vendorStats || [];

    return (
        <>
            <Header title="Rendimiento de Vendedores" userName={profile?.nombre || 'Administrador'} />

            <div className="p-8 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Rendimiento Comercial</h2>
                        <p className="text-muted-foreground mt-1">Monitorea el desempeño de tu equipo en tiempo real.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-card border border-border p-6 rounded-2xl glass-morphism">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Total Vendedores</p>
                                <p className="text-2xl font-bold">{vendors.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 glass-morphism">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                                <th className="pb-3 font-medium">Vendedor</th>
                                <th className="pb-3 font-medium text-center">Leads Asignados</th>
                                <th className="pb-3 font-medium text-center">Ventas Mes</th>
                                <th className="pb-3 font-medium text-center">Conversión</th>
                                <th className="pb-3 font-medium text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-border">
                            {vendors.length > 0 ? vendors.map((v) => (
                                <tr key={v.id} className="group hover:bg-muted/30 transition-colors">
                                    <td className="py-4 font-medium">{v.name}</td>
                                    <td className="py-4 text-center">{v.leads}</td>
                                    <td className="py-4 text-center">{v.sales}</td>
                                    <td className="py-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-green-400 font-medium">{v.conversion}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-right">
                                        <button className="text-primary hover:underline font-medium">Ver detalles</button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground italic">
                                        No se encontraron vendedores.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
