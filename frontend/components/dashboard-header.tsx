"use client"

import { Bell, Settings, ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  onBack?: () => void
}

export function DashboardHeader({ onBack }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 shadow-sm">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-6" />
        {onBack && (
          <>
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
            <Separator orientation="vertical" className="h-6 hidden sm:block" />
          </>
        )}
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-foreground">
            TrustSentinel
            <span className="hidden md:inline text-muted-foreground font-normal"> – Fund Flow Intelligence Platform</span>
          </h1>
          <p className="text-xs text-muted-foreground md:hidden">Fund Flow Intelligence</p>
        </div>
      </div>
      <div className="flex items-center gap-1 sm:gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center bg-secondary text-secondary-foreground">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
              <span className="font-medium text-sm">High Risk Alert</span>
              <span className="text-xs text-muted-foreground">Account ACC-2847 flagged for layering</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
              <span className="font-medium text-sm">New Pattern Detected</span>
              <span className="text-xs text-muted-foreground">Structuring activity in cluster C-12</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 cursor-pointer">
              <span className="font-medium text-sm">Report Ready</span>
              <span className="text-xs text-muted-foreground">Evidence report #2841 generated</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings */}
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="h-6 hidden sm:block" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="gap-2 px-2 hidden sm:flex">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left hidden lg:flex">
                <span className="text-sm font-medium">John Doe</span>
                <span className="text-xs text-muted-foreground">Investigator</span>
              </div>
              <ChevronDown className="h-3 w-3 text-muted-foreground hidden lg:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help Center</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
