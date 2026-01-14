"use client";

import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';

export type ChartData = {
    vendorData: { name: string; sales: number }[];
    channelData: { name: string; value: number }[];
};

export function DashboardCharts({ data }: { data?: ChartData }) {
    const vendorData = data?.vendorData || [];
    const channelData = data?.channelData || [];
    const COLORS = ['#3B82F6', '#10B981', '#6366F1', '#8B5CF6', '#EC4899'];

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
