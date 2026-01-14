import React from 'react';
// Basic Card implementation to resolve build errors
export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`bg-card border border-border rounded-xl ${className}`}>{children}</div>;
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 pb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={`p-6 ${className}`}>{children}</div>;
}

import { TrendingUp, Users, Target, CheckCircle } from 'lucide-react';

const stats = [
    { title: "Total Leads", value: "1,284", icon: Users, trend: "+12.5%", color: "text-blue-500" },
    { title: "Ventas Mes", value: "48", icon: TrendingUp, trend: "+8.2%", color: "text-green-500" },
    { title: "Tasa Conversión", value: "3.7%", icon: Target, trend: "-2.1%", color: "text-primary" },
    { title: "Leads Activos", value: "156", icon: CheckCircle, trend: "+1.4%", color: "text-purple-500" },
];

export function StatsCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-2xl glass-morphism">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-xl bg-background border border-border ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${stat.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {stat.trend}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                        <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
}
