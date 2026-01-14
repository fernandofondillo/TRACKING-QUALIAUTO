"use client";

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

const vendorData = [
    { name: 'Carlos R.', sales: 12 },
    { name: 'Elena M.', sales: 15 },
    { name: 'Marcos T.', sales: 9 },
    { name: 'Julia S.', sales: 18 },
    { name: 'David L.', sales: 11 },
];

const channelData = [
    { name: 'Coches.net', value: 45 },
    { name: 'WhatsApp', value: 25 },
    { name: 'Llamada', value: 15 },
    { name: 'Exposición', value: 10 },
    { name: 'Otros', value: 5 },
];

const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#8B5CF6', '#EC4899'];

export function DashboardCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Sales by Vendor */}
            <div className="bg-card border border-border p-6 rounded-2xl glass-morphism">
                <h3 className="text-lg font-semibold mb-6">Ventas por Vendedor</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={vendorData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2D2D2D" vertical={false} />
                            <XAxis dataKey="name" stroke="#656565" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#656565" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px' }}
                                cursor={{ fill: '#ffffff05' }}
                            />
                            <Bar dataKey="sales" fill="oklch(0.5 0.2 250)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Leads by Channel */}
            <div className="bg-card border border-border p-6 rounded-2xl glass-morphism">
                <h3 className="text-lg font-semibold mb-6">Leads por Canal</h3>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={channelData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {channelData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1A1A1A', border: '1px solid #2D2D2D', borderRadius: '8px' }}
                            />
                            <Legend verticalAlign="bottom" height={36} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
