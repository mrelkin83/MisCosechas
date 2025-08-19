"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Package, Truck, CheckCircle, MessageSquare, Download, Eye, Star, MapPin } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  status: "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled" | "disputed"
  date: string
  total: number
  items: {
    id: number
    name: string
    producer: string
    quantity: number
    unit: string
    price: number
    image: string
  }[]
  producer: {
    name: string
    location: string
    rating: number
  }
  tracking?: {
    carrier: string
    trackingNumber: string
    estimatedDelivery: string
  }
  escrow: {
    status: "held" | "released" | "disputed"
    releaseDate?: string
  }
}

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all")

  const orders: Order[] = [
    {
      id: "ORD-2024-001",
      status: "shipped",
      date: "2024-03-20",
      total: 675000,
      items: [
        {
          id: 1,
          name: "Aguacate Hass Premium",
          producer: "Finca Los Andes",
          quantity: 150,
          unit: "kg",
          price: 4500,
          image: "/avocado-hass-premium.png",
        },
      ],
      producer: {
        name: "Finca Los Andes",
        location: "Antioquia, Medellín",
        rating: 4.9,
      },
      tracking: {
        carrier: "Transportes Agro",
        trackingNumber: "TA-2024-001234",
        estimatedDelivery: "2024-03-25",
      },
      escrow: {
        status: "held",
      },
    },
    {
      id: "ORD-2024-002",
      status: "delivered",
      date: "2024-03-15",
      total: 1350000,
      items: [
        {
          id: 2,
          name: "Café Especial Huila",
          producer: "Cooperativa Café del Sur",
          quantity: 75,
          unit: "kg",
          price: 18000,
          image: "/specialty-coffee-huila.png",
        },
      ],
      producer: {
        name: "Cooperativa Café del Sur",
        location: "Huila, Pitalito",
        rating: 4.8,
      },
      escrow: {
        status: "released",
        releaseDate: "2024-03-18",
      },
    },
    {
      id: "ORD-2024-003",
      status: "pending",
      date: "2024-03-22",
      total: 540000,
      items: [
        {
          id: 3,
          name: "Leche Fresca Premium",
          producer: "Ganadería San José",
          quantity: 300,
          unit: "litro",
          price: 1800,
          image: "/fresh-premium-milk.png",
        },
      ],
      producer: {
        name: "Ganadería San José",
        location: "Cundinamarca, Zipaquirá",
        rating: 4.7,
      },
      escrow: {
        status: "held",
      },
    },
  ]

  const getStatusBadge = (status: Order["status"]) => {
    const statusConfig = {
      pending: { label: "Pendiente", className: "bg-yellow-100 text-yellow-800" },
      confirmed: { label: "Confirmado", className: "bg-blue-100 text-blue-800" },
      preparing: { label: "Preparando", className: "bg-orange-100 text-orange-800" },
      shipped: { label: "Enviado", className: "bg-purple-100 text-purple-800" },
      delivered: { label: "Entregado", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelado", className: "bg-red-100 text-red-800" },
      disputed: { label: "En Disputa", className: "bg-red-100 text-red-800" },
    }

    const config = statusConfig[status]
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const getStatusProgress = (status: Order["status"]) => {
    const progressMap = {
      pending: 20,
      confirmed: 40,
      preparing: 60,
      shipped: 80,
      delivered: 100,
      cancelled: 0,
      disputed: 0,
    }
    return progressMap[status]
  }

  const getEscrowBadge = (escrowStatus: Order["escrow"]["status"]) => {
    const config = {
      held: { label: "Fondos Retenidos", className: "bg-blue-100 text-blue-800" },
      released: { label: "Fondos Liberados", className: "bg-green-100 text-green-800" },
      disputed: { label: "En Disputa", className: "bg-red-100 text-red-800" },
    }

    const statusConfig = config[escrowStatus]
    return <Badge className={statusConfig.className}>{statusConfig.label}</Badge>
  }

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true
    if (activeTab === "active") return ["pending", "confirmed", "preparing", "shipped"].includes(order.status)
    if (activeTab === "completed") return order.status === "delivered"
    if (activeTab === "cancelled") return ["cancelled", "disputed"].includes(order.status)
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Mis Pedidos</h1>
            <p className="text-muted-foreground">Gestiona y rastrea todos tus pedidos</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos ({orders.length})</TabsTrigger>
              <TabsTrigger value="active">
                Activos (
                {orders.filter((o) => ["pending", "confirmed", "preparing", "shipped"].includes(o.status)).length})
              </TabsTrigger>
              <TabsTrigger value="completed">
                Completados ({orders.filter((o) => o.status === "delivered").length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                Cancelados ({orders.filter((o) => ["cancelled", "disputed"].includes(o.status)).length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-3">
                            <span>Pedido {order.id}</span>
                            {getStatusBadge(order.status)}
                            {getEscrowBadge(order.escrow.status)}
                          </CardTitle>
                          <CardDescription>
                            Realizado el {new Date(order.date).toLocaleDateString()} • {order.items.length} producto
                            {order.items.length !== 1 ? "s" : ""}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl text-primary">${order.total.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">Total</div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Progress Bar */}
                      {!["cancelled", "disputed"].includes(order.status) && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Estado del pedido</span>
                            <span>{getStatusProgress(order.status)}%</span>
                          </div>
                          <Progress value={getStatusProgress(order.status)} className="h-2" />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Pendiente</span>
                            <span>Confirmado</span>
                            <span>Preparando</span>
                            <span>Enviado</span>
                            <span>Entregado</span>
                          </div>
                        </div>
                      )}

                      {/* Items */}
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-background">
                              <img
                                src={item.image || "/placeholder.svg?height=64&width=64"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">{item.producer}</p>
                              <p className="text-sm">
                                {item.quantity} {item.unit} × ${item.price.toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${(item.quantity * item.price).toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Producer Info */}
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback>{order.producer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold">{order.producer.name}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{order.producer.location}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{order.producer.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contactar
                        </Button>
                      </div>

                      {/* Tracking Info */}
                      {order.tracking && (
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Truck className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-blue-900">Información de Envío</span>
                          </div>
                          <div className="text-sm space-y-1">
                            <p>
                              <strong>Transportista:</strong> {order.tracking.carrier}
                            </p>
                            <p>
                              <strong>Número de seguimiento:</strong> {order.tracking.trackingNumber}
                            </p>
                            <p>
                              <strong>Entrega estimada:</strong>{" "}
                              {new Date(order.tracking.estimatedDelivery).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Escrow Info */}
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="font-semibold text-green-900">Información de Escrow</span>
                        </div>
                        <div className="text-sm">
                          {order.escrow.status === "held" && (
                            <p>Los fondos están seguros y serán liberados cuando confirmes la recepción del pedido.</p>
                          )}
                          {order.escrow.status === "released" && order.escrow.releaseDate && (
                            <p>Fondos liberados el {new Date(order.escrow.releaseDate).toLocaleDateString()}.</p>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex gap-2">
                          <Link href={`/pedidos/${order.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </Button>
                          </Link>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Factura
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          {order.status === "delivered" && order.escrow.status === "held" && (
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirmar Recepción
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button variant="outline" size="sm">
                              <Truck className="h-4 w-4 mr-2" />
                              Rastrear Envío
                            </Button>
                          )}
                          {["pending", "confirmed"].includes(order.status) && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive bg-transparent"
                            >
                              Cancelar Pedido
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
                    <h3 className="font-semibold text-lg mb-2">No hay pedidos</h3>
                    <p className="text-muted-foreground mb-6">
                      {activeTab === "all"
                        ? "Aún no has realizado ningún pedido"
                        : `No tienes pedidos ${activeTab === "active" ? "activos" : activeTab === "completed" ? "completados" : "cancelados"}`}
                    </p>
                    <Link href="/productos">
                      <Button>Explorar Productos</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
