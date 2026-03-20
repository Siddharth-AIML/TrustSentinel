"use client"

import {
  LayoutDashboard,
  Upload,
  AlertTriangle,
  Network,
  Search,
  FileText,
  Shield,
  TrendingUp,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, badge: null },
  { id: "upload", label: "Upload Data", icon: Upload, badge: null },
  { id: "alerts", label: "Fraud Alerts", icon: AlertTriangle, badge: "38" },
  { id: "network", label: "Network Graph", icon: Network, badge: null }

]

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-foreground/10 ring-1 ring-sidebar-foreground/20">
            <Shield className="h-5 w-5 text-sidebar-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-sidebar-foreground tracking-tight">TrustSentinel</span>
            <span className="text-[11px] text-sidebar-foreground/60 font-medium">AML Monitoring System</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={activeSection === item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="cursor-pointer h-10 px-3 rounded-lg transition-colors"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge 
                        variant="secondary" 
                        className="h-5 min-w-5 px-1.5 text-[10px] font-semibold bg-sidebar-foreground/10 text-sidebar-foreground border-0"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-[10px] font-semibold uppercase tracking-wider px-2 mb-2">
            Quick Stats
          </SidebarGroupLabel>
          <div className="px-2 space-y-2">
            <div className="rounded-lg bg-sidebar-foreground/5 p-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-sidebar-foreground/70">Risk Score</span>
                <TrendingUp className="h-3 w-3 text-sidebar-foreground/50" />
              </div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-lg font-bold text-sidebar-foreground">78.4</span>
                <span className="text-[10px] text-sidebar-foreground/50">/ 100</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-sidebar-foreground/10 overflow-hidden">
                <div className="h-full w-[78%] rounded-full bg-sidebar-foreground/40" />
              </div>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-foreground/10 text-sidebar-foreground text-sm font-semibold ring-1 ring-sidebar-foreground/20">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-sidebar-foreground">John Doe</span>
            <span className="text-[11px] text-sidebar-foreground/60">Senior Investigator</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
