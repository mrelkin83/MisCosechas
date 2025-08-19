import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  FileCheck,
  Settings,
  BarChart3,
  MessageSquare,
  Truck,
  CreditCard,
} from "lucide-react"

const sidebarItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Usuarios", href: "/admin/usuarios", icon: Users },
  { title: "Productos", href: "/admin/productos", icon: Package },
  { title: "Órdenes", href: "/admin/ordenes", icon: ShoppingCart },
  { title: "KYC", href: "/admin/kyc", icon: FileCheck },
  { title: "RFQ/RFI", href: "/admin/rfq", icon: MessageSquare },
  { title: "Logística", href: "/admin/logistica", icon: Truck },
  { title: "Pagos", href: "/admin/pagos", icon: CreditCard },
  { title: "Reportes", href: "/admin/reportes", icon: BarChart3 },
  { title: "Configuración", href: "/admin/configuracion", icon: Settings },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar items={sidebarItems} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
