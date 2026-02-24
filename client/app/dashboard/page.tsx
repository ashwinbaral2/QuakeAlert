"use client";
import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashBoardSidebar } from "@/components/dashboard-sidebar";

const EarthquakeMap = dynamic(() => import("@/components/maps"), {
	ssr: false,
});

export default function MapsPage() {
	return (
		<main className="relative h-screen w-full overflow-hidden">
      
      <EarthquakeMap />
			<SidebarProvider>
				<DashBoardSidebar />
			</SidebarProvider>
		</main>
	);
}
