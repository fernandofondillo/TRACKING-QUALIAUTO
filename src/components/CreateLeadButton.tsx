"use client";

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CreateLeadModal } from './CreateLeadModal';
import { useRouter } from 'next/navigation';

export function CreateLeadButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleSuccess = () => {
        router.refresh();
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
            >
                <Plus className="w-5 h-5" />
                Nuevo Lead
            </button>

            <CreateLeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}
