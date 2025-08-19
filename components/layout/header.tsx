"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, User, Menu, MapPin, Bell, Wallet, Settings } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Colombia</span>
              </div>
              <span>Envío gratis en pedidos mayores a $500.000 COP</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/ayuda" className="hover:text-foreground">
                Ayuda
              </Link>
              <Link href="/vendedores" className="hover:text-foreground">
                Vender en MisCosechas
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">M</span>
            </div>
            <span className="font-montserrat font-bold text-xl text-foreground">MisCosechas</span>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="search"
                placeholder="Buscar productos, categorías, productores..."
                className="w-full pl-4 pr-12 py-3 rounded-lg border-2 border-border focus:border-primary"
              />
              <Button size="sm" className="absolute right-1 top-1 bottom-1 px-4 bg-primary hover:bg-primary/90">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">3</Badge>
            </Button>

            <Button variant="ghost" size="sm" asChild>
              <Link href="/wallet">
                <Wallet className="h-5 w-5" />
                <span className="hidden lg:inline ml-2">Wallet</span>
              </Link>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/carrito" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-primary">2</Badge>
              </Link>
            </Button>

            {/* User menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline ml-2">Mi Cuenta</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/login">Iniciar Sesión</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/registro">Registrarse</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/perfil">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/pedidos">Mis Pedidos</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wallet">Mi Wallet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/publicar">Publicar Producto</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin">
                    <Settings className="h-4 w-4 mr-2" />
                    Panel Admin
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favoritos">Favoritos</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input type="search" placeholder="Buscar productos..." className="w-full pl-4 pr-12 py-3" />
            <Button size="sm" className="absolute right-1 top-1 bottom-1 px-4">
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <div className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium">
                    Categorías
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem>Frutas y Verduras</DropdownMenuItem>
                  <DropdownMenuItem>Granos y Cereales</DropdownMenuItem>
                  <DropdownMenuItem>Productos Lácteos</DropdownMenuItem>
                  <DropdownMenuItem>Carne y Aves</DropdownMenuItem>
                  <DropdownMenuItem>Productos Orgánicos</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/productos" className="font-medium hover:text-primary">
                Productos
              </Link>
              <Link href="/productores" className="font-medium hover:text-primary">
                Productores
              </Link>
              <Link href="/rfq" className="font-medium hover:text-primary">
                Cotizaciones
              </Link>
              <Link href="/logistica" className="font-medium hover:text-primary">
                Logística
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Soy Comprador
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/publicar">Soy Productor</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
