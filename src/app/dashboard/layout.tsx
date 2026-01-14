import { Sidebar } from "@/components/Sidebar";
import { getUserProfile } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: profile, error } = await getUserProfile();

    if (error || !profile) {
        redirect("/login");
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar profile={profile} />
            <main className="flex-1 overflow-y-auto ml-64 bg-background/50">
                {children}
            </main>
        </div>
    );
}
