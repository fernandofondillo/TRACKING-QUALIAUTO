import React from 'react';
import { Bell, Search, User } from 'lucide-react';

export function Header({ title, userName }: { title: string; userName: string }) {
    return (
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10 ml-64">
            <h1 className="text-lg font-semibold">{title}</h1>

            <div className="flex items-center gap-6">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar leads..."
                        className="bg-muted border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary w-64 transition-all"
                    />
                </div>

                <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-background"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <div className="text-right">
                        <p className="text-sm font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground uppercase tracking-widest leading-none mt-0.5">Premium User</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center border border-border overflow-hidden">
                        <User className="w-6 h-6 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </header>
    );
}
