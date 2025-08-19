"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Clock, MessageSquare, Eye } from "lucide-react"
import Link from "next/link"

export default function RFQPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const rfqs = [
    {
      id: 1,
      title: "Aguacate Hass para exportación - 50 toneladas",
      category: "Frutas y Verduras",
      buyer: "Exportadora del Caribe",
      location: "Atlántico, Barranquilla",
      quantity: "50 toneladas",
      budget: "$200,000,000 - $250,000,000",
      deadline: "2024-04-15",
      status: "active",
      quotations: 12,
      description:
        "Buscamos aguacate Hass de primera calidad para exportación a Europa. Certificación GlobalGAP requerida.",
      requirements: ["Certificación GlobalGAP", "Calibre 14-18", "Empaque para exportación"],
      createdAt: "2024-03-20",
    },
    {
      id: 2,
      title: "Café especial Huila - 10 toneladas mensuales",
      category: "Café Especial",
      buyer: "Tostadora Premium",
      location: "Bogotá D.C.",
      quantity: "10 toneladas/mes",
      budget: "$180,000,000 - $220,000,000",
      deadline: "2024-04-20",
      status: "active",
      quotations: 8,
      description: "Contrato anual para café especial del Huila con puntaje SCA superior a 84 puntos.",
      requirements: ["Puntaje SCA >84", "Trazabilidad completa", "Entrega mensual"],
      createdAt: "2024-03-18",
    },
    {
      id: 3,
      title: "Leche fresca para procesamiento - 5000 litros diarios",
      category: "Productos Lácteos",
      buyer: "Lácteos del Valle",
      location: "Valle del Cauca, Cali",
      quantity: "5000 litros/día",
      budget: "$9,000,000 - $11,000,000",
      deadline: "2024-04-10",
      status: "closing-soon",
      quotations: 15,
      description: "Contrato a largo plazo para suministro diario de leche fresca con certificación HACCP.",
      requirements: ["Certificación HACCP", "Entrega diaria", "Análisis de calidad"],
      createdAt: "2024-03-15",
    },
  ]

  const myRFQs = [
    {
      id: 4,
      title: "Plátano hartón para chips - 20 toneladas",
      category: "Frutas y Verduras",
      quantity: "20 toneladas",
      budget: "$24,000,000",
      status: "active",
      quotations: 6,
      deadline: "2024-04-25",
      createdAt: "2024-03-22",
    },
  ]

  const filteredRFQs = rfqs.filter((rfq) => {
    if (searchQuery && !rfq.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (categoryFilter !== "all" && rfq.category !== categoryFilter) return false
    if (statusFilter !== "all" && rfq.status !== statusFilter) return false
    return true
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activa</Badge>
      case "closing-soon":
        return <Badge className="bg-yellow-100 text-yellow-800">Cierra Pronto</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Cerrada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="font-montserrat font-bold text-3xl mb-2">Cotizaciones (RFQ)</h1>
              <p className="text-muted-foreground">Encuentra oportunidades de negocio o publica tus requerimientos</p>
            </div>
            <Link href="/rfq/crear">
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Crear RFQ
              </Button>
            </Link>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Explorar RFQs</TabsTrigger>
            <TabsTrigger value="my-rfqs">Mis RFQs</TabsTrigger>
            <TabsTrigger value="my-quotes">Mis Cotizaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="mt-6">
            {/* Search and Filters */}
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar RFQs por producto, categoría..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="Frutas y Verduras">Frutas y Verduras</SelectItem>
                      <SelectItem value="Café Especial">Café Especial</SelectItem>
                      <SelectItem value="Productos Lácteos">Productos Lácteos</SelectItem>
                      <SelectItem value="Granos y Cereales">Granos y Cereales</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Activas</SelectItem>
                      <SelectItem value="closing-soon">Cierra Pronto</SelectItem>
                      <SelectItem value="closed">Cerradas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* RFQ List */}
            <div className="space-y-4">
              {filteredRFQs.map((rfq) => (
                <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Link href={`/rfq/${rfq.id}`}>
                            <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{rfq.title}</h3>
                          </Link>
                          {getStatusBadge(rfq.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{rfq.buyer}</span>
                          <span>•</span>
                          <span>{rfq.location}</span>
                          <span>•</span>
                          <span>{rfq.category}</span>
                        </div>
                        <p className="text-muted-foreground mb-3">{rfq.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {rfq.requirements.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right ml-6">
                        <div className="font-semibold text-lg text-primary mb-1">{rfq.budget}</div>
                        <div className="text-sm text-muted-foreground mb-2">{rfq.quantity}</div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Cierra: {new Date(rfq.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span>{rfq.quotations} cotizaciones</span>
                        </div>
                        <span>Publicado: {new Date(rfq.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/rfq/${rfq.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalles
                          </Button>
                        </Link>
                        <Link href={`/rfq/${rfq.id}/cotizar`}>
                          <Button size="sm">Enviar Cotización</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-rfqs" className="mt-6">
            <div className="space-y-4">
              {myRFQs.map((rfq) => (
                <Card key={rfq.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{rfq.title}</h3>
                          {getStatusBadge(rfq.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span>{rfq.category}</span>
                          <span>•</span>
                          <span>{rfq.quantity}</span>
                          <span>•</span>
                          <span>Presupuesto: {rfq.budget}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                          <MessageSquare className="h-4 w-4" />
                          <span>{rfq.quotations} cotizaciones recibidas</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Cierra: {new Date(rfq.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Link href={`/rfq/${rfq.id}/cotizaciones`}>
                        <Button variant="outline" size="sm">
                          Ver Cotizaciones
                        </Button>
                      </Link>
                      <Link href={`/rfq/${rfq.id}/editar`}>
                        <Button variant="outline" size="sm">
                          Editar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-quotes" className="mt-6">
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">No has enviado cotizaciones</h3>
              <p className="text-muted-foreground mb-4">
                Explora las RFQs disponibles y envía tus primeras cotizaciones
              </p>
              <Button onClick={() => setActiveTab("browse")}>Explorar RFQs</Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
