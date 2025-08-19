"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Store } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: number
  productId: number
  name: string
  producer: string
  producerId: number
  image: string
  price: number
  unit: string
  quantity: number
  minQuantity: number
  maxQuantity: number
  category: string
  location: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      productId: 1,
      name: "Aguacate Hass Premium",
      producer: "Finca Los Andes",
      producerId: 1,
      image: "/avocado-hass-premium.png",
      price: 4500,
      unit: "kg",
      quantity: 150,
      minQuantity: 100,
      maxQuantity: 1000,
      category: "Frutas y Verduras",
      location: "Antioquia, Medellín",
    },
    {
      id: 2,
      productId: 2,
      name: "Café Especial Huila",
      producer: "Cooperativa Café del Sur",
      producerId: 2,
      image: "/specialty-coffee-huila.png",
      price: 18000,
      unit: "kg",
      quantity: 75,
      minQuantity: 50,
      maxQuantity: 500,
      category: "Café Especial",
      location: "Huila, Pitalito",
    },
    {
      id: 3,
      productId: 4,
      name: "Leche Fresca Premium",
      producer: "Ganadería San José",
      producerId: 3,
      image: "/fresh-premium-milk.png",
      price: 1800,
      unit: "litro",
      quantity: 300,
      minQuantity: 200,
      maxQuantity: 2000,
      category: "Productos Lácteos",
      location: "Cundinamarca, Zipaquirá",
    },
  ])

  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map((item) => item.id))

  const updateQuantity = (itemId: number, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item.id === itemId) {
          const quantity = Math.max(item.minQuantity, Math.min(item.maxQuantity, newQuantity))
          return { ...item, quantity }
        }
        return item
      }),
    )
  }

  const removeItem = (itemId: number) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId))
    setSelectedItems((selected) => selected.filter((id) => id !== itemId))
  }

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((selected) =>
      selected.includes(itemId) ? selected.filter((id) => id !== itemId) : [...selected, itemId],
    )
  }

  const toggleSelectAll = () => {
    setSelectedItems(selectedItems.length === cartItems.length ? [] : cartItems.map((item) => item.id))
  }

  // Group items by producer
  const itemsByProducer = cartItems.reduce(
    (acc, item) => {
      if (!acc[item.producerId]) {
        acc[item.producerId] = {
          producer: item.producer,
          location: item.location,
          items: [],
        }
      }
      acc[item.producerId].items.push(item)
      return acc
    },
    {} as Record<number, { producer: string; location: string; items: CartItem[] }>,
  )

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const platformFee = subtotal * 0.035 // 3.5% platform fee
  const total = subtotal + platformFee

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="font-montserrat font-bold text-3xl mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">
              Explora nuestro catálogo y encuentra los mejores productos agropecuarios de Colombia
            </p>
            <Link href="/productos">
              <Button className="bg-primary hover:bg-primary/90">Explorar Productos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Carrito de Compras</h1>
            <p className="text-muted-foreground">
              {cartItems.length} producto{cartItems.length !== 1 ? "s" : ""} de {Object.keys(itemsByProducer).length}{" "}
              productor{Object.keys(itemsByProducer).length !== 1 ? "es" : ""}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {/* Select All */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="select-all"
                        checked={selectedItems.length === cartItems.length}
                        onCheckedChange={toggleSelectAll}
                      />
                      <label htmlFor="select-all" className="font-medium">
                        Seleccionar todo ({cartItems.length} productos)
                      </label>
                    </div>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Eliminar seleccionados
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Items by Producer */}
              {Object.entries(itemsByProducer).map(([producerId, group]) => (
                <Card key={producerId}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <Store className="h-5 w-5 text-primary" />
                      <div>
                        <CardTitle className="text-lg">{group.producer}</CardTitle>
                        <p className="text-sm text-muted-foreground">{group.location}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {group.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItemSelection(item.id)}
                        />

                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.image || "/placeholder.svg?height=80&width=80"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              Min: {item.minQuantity} {item.unit}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              Max: {item.maxQuantity} {item.unit}
                            </Badge>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-lg text-primary">${item.price.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">por {item.unit}</div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 10)}
                            disabled={item.quantity <= item.minQuantity}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, Number.parseInt(e.target.value) || item.minQuantity)
                            }
                            className="w-20 text-center"
                            min={item.minQuantity}
                            max={item.maxQuantity}
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 10)}
                            disabled={item.quantity >= item.maxQuantity}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-muted-foreground ml-2">{item.unit}</span>
                        </div>

                        <div className="text-right min-w-[100px]">
                          <div className="font-bold text-lg">${(item.price * item.quantity).toLocaleString()}</div>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Productos seleccionados:</span>
                      <span>{selectedItems.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Comisión plataforma (3.5%):</span>
                      <span>${platformFee.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-primary">${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>• Los precios incluyen IVA cuando aplique</p>
                    <p>• Costos de envío se calculan en el checkout</p>
                    <p>• Pago seguro con garantía de escrow</p>
                  </div>

                  <Link href="/checkout">
                    <Button className="w-full" disabled={selectedItems.length === 0}>
                      Proceder al Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link href="/productos">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continuar Comprando
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Security Info */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">Compra Segura</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>✓ Pago con garantía de escrow</p>
                    <p>✓ Productos verificados</p>
                    <p>✓ Productores certificados</p>
                    <p>✓ Soporte 24/7</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
