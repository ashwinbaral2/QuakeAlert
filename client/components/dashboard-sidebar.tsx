import {
	Sidebar,
	SidebarHeader,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
	Map,
	Activity,
	Bell,
	AlertTriangle,
	Layers,
	Settings,
	Info,
	HamburgerIcon,
	Monitor,
	Database,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function DashBoardSidebar() {
	return (
		<Sidebar collapsible="icon" className="w-64 z-99">
			<SidebarTrigger />
			{/* Header / Workspace */}
			<SidebarHeader className="pb-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
									className="text-sm p-5 font-semibold tracking-wide transition-all duration-300
                  hover:shadow-[0_0_0_1px_rgba(239,68,68,0.25),0_4px_14px_rgba(239,68,68,0.15)]"
								>
									<Monitor className="mr-2 h-4 w-4" />
									<span className="relative z-10">Earthquake Monitor</span>
								</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			{/* Content */}
			<SidebarContent>
				{/* Monitoring */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-widest text-slate-400">
						Monitoring
					</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Map className="h-4 w-4" />
								Live Map
								<Badge className="ml-auto animate-pulse bg-red-500/20 text-red-600">
									Live
								</Badge>
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Activity className="h-4 w-4" />
								Seismic Activity
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<AlertTriangle className="h-4 w-4" />
								Alerts & Events
								<Badge className="ml-auto bg-red-500/20 text-red-400">3</Badge>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>


				{/* Data Layers */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-widest text-slate-400">
						Data Layers
					</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Database className="h-4 w-4" />
								Fault Lines
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Database className="h-4 w-4" />
								Tectonic Plates
							</SidebarMenuButton>
						</SidebarMenuItem>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Database className="h-4 w-4" />
								Sensor Stations
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>


				{/* Notifications */}
				<SidebarGroup>
					<SidebarGroupLabel className="text-xs uppercase tracking-widest text-slate-400">
						Notifications
					</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton>
								<Bell className="h-4 w-4" />
								Alert Settings
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>

			{/* Footer */}
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<Settings className="h-4 w-4" />
							Settings
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<Info className="h-4 w-4" />
							About System
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
