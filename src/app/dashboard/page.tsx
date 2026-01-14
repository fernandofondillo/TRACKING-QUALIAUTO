import { redirect } from 'next/navigation';

export default function DashboardPage() {
    // For now, redirect to admin. 
    // In a final version, this would check the user role and redirect accordingly.
    redirect('/dashboard/admin');
}
