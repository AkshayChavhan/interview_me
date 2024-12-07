"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, Settings, Users, BarChart2, Mail, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { menuItems } from "@/lib/constant";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}


export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <MobileNav />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:flex flex-col h-screen",
          isCollapsed ? "w-[80px]" : "w-[240px]",
          className
        )}
      >
        <div className="flex h-14 items-center justify-between px-4 border-b">
          <div className={cn("flex items-center gap-2", isCollapsed && "justify-center w-full")}>
            <Menu className="h-6 w-6" onClick={() => setIsCollapsed(!isCollapsed)}/>
            {!isCollapsed && <span className="font-semibold">Dashboard</span>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn("hidden md:flex", isCollapsed && "absolute right-[-40px] top-3")}
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="flex-1">
          <div className="space-y-2 p-2">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                  {!isCollapsed && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </div>
    </>
  );
}

function MobileNav() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-14 items-center px-4 border-b">
        <Menu className="h-6 w-6 mr-2" />
        <span className="font-semibold">Dashboard</span>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button variant="ghost" className="w-full justify-start">
                <item.icon className="h-5 w-5 mr-2" />
                <span>{item.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}