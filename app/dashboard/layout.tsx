
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // The Figma design keeps the whole dashboard area dark, regardless of the
  // site theme — the `dark` class forces the dark shadcn tokens (sidebar,
  // accent, border...) inside this subtree.
  return (
    <div className="dark min-h-screen bg-[#0b0b0c] font-[family-name:var(--font-inter)] text-[#ededef]">
      <SidebarProvider>
        <DashboardSidebar />
        <main className="min-w-0 flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
};

export default DashboardLayout;
