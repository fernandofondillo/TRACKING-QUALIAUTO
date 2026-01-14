"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export function LeadsFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [status, setStatus] = useState(searchParams.get('status') || 'Todos los estados');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (debouncedSearch) {
            params.set('search', debouncedSearch);
        } else {
            params.delete('search');
        }

        if (status !== 'Todos los estados') {
            params.set('status', status);
        } else {
            params.delete('status');
        }

        router.push(`/dashboard/leads?${params.toString()}`);
    }, [debouncedSearch, status, router, searchParams]);

    return (
        <div className="flex gap-4 mb-6">
            <input
                type="text"
                placeholder="Filtrar por nombre o vehículo..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-muted border-none rounded-lg py-2 px-4 text-sm focus:ring-1 focus:ring-primary w-80"
            />
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-muted border-none rounded-lg py-2 px-4 text-sm focus:ring-1 focus:ring-primary"
            >
                <option>Todos los estados</option>
                <option>Nuevo</option>
                <option>Contactado</option>
                <option>Prueba de conducción</option>
                <option>Propuesta enviada</option>
                <option>Negociación</option>
                <option>Venta Cerrada</option>
                <option>Venta Perdida</option>
            </select>
        </div>
    );
}
