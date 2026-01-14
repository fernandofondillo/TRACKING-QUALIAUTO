"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Car, Settings, LogOut, ChevronRight } from 'lucide-react';
import { logout } from '@/lib/auth-actions';
import { Profile } from '@/types/database';

const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Leads', icon: Car, href: '/dashboard/leads' },
    { name: 'Vendedores', icon: Users, href: '/dashboard/vendedores', role: 'gerente' },
    { name: 'Configuración', icon: Settings, href: '/dashboard/settings' },
];

export function Sidebar({ profile }: { profile: Profile }) {
    const role = profile.role;

    return (
        <aside className="w-64 bg-card border-r border-border flex flex-col h-screen fixed">
            <div className="p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                        <Car className="text-primary-foreground w-5 h-5" />
                    </div>
                    <span className="font-bold text-xl tracking-tight uppercase">QualiAuto</span>
                </div>

                <div className="mb-8 p-4 bg-muted/50 rounded-2xl border border-border/50">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Usuario</p>
                    <p className="text-sm font-bold truncate">{profile.nombre || profile.email}</p>
                    <p className="text-[10px] uppercase font-black text-primary tracking-tighter mt-0.5">{role}</p>
                </div>

                <nav className="space-y-2">
                    {navItems.filter(item => !item.role || item.role === role).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                        >
                            <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground">
                                <item.icon className="w-5 h-5" />
                                <span className="text-sm font-medium">{item.name}</span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-muted-foreground hidden group-hover:block" />
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-3 text-destructive hover:text-red-400 transition-colors w-full p-3 group"
                >
                    <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                        <LogOut className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-bold">Cerrar Sesión</span>
                </button>
            </div>
        </aside>
    );
}
