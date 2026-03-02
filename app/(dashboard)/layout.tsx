import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopNav } from "@/components/layout/TopNav";
import { MobileNav } from "@/components/layout/MobileNav";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <TopNav />
                <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8">
                    {children}
                </main>
            </div>
            <MobileNav />
        </div>
    );
}
