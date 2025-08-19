"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: LucideIcon
}

interface SidebarProps {
  items: SidebarItem[]
}

export function Sidebar({ items }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <h2 className="text-xl font-bold text-amber-600">MisCosechas</h2>
        <p className="text-sm text-gray-600">Panel Administrativo</p>
      </div>
      <nav className="px-4 pb-4">
        <ul className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn("w-full justify-start", isActive && "bg-amber-100 text-amber-700 hover:bg-amber-200")}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {item.title}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
