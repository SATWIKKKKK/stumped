import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNav } from "@/components/layout/TopNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <TopNav />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
