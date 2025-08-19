"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Truck, Package, MapPin, Calculator, Clock, Thermometer, Shield, Star } from "lucide-react"

interface ShippingQuote {
  id: string
  carrier: string
  service: string
  price: number
  estimatedDays: string
  rating: number
  features: string[]
  restrictions?: string[]
}

export default function LogisticsPage() {
  const [activeTab, setActiveTab] = useState("calculator")
  const [quoteData, setQuoteData] = useState({
    origin: "",
    destination: "",
    weight: "",
    volume: "",
    productType: "",
    refrigerated: false,
    fragile: false,
    urgent: false,
  })

  const [quotes, setQuotes] = useState<ShippingQuote[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  const productTypes = [
    "Frutas y Verduras",
    "Granos y Cereales",
    "Productos Lácteos",
    "Carne y Aves",
    "Café",
    "Productos Procesados",
    "Otros",
  ]

  const departments = [
    "Antioquia",
    "Atlántico",
    "Bogotá D.C.",
    "Bolívar",
    "Boyacá",
    "Caldas",
    "Casanare",
    "Cauca",
    "Cesar",
    "Córdoba",
    "Cundinamarca",
    "Huila",
    "Magdalena",
    "Meta",
    "Nariño",
    "Norte de Santander",
    "Quindío",
    "Risaralda",
    "Santander",
    "Tolima",
    "Valle del Cauca",
  ]

  const calculateShipping = async () => {
    setIsCalculating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockQuotes: ShippingQuote[] = [
      {
        id: "1",
        carrier: "Transportes Agro",
        service: "Estándar",
        price: 85000,
        estimatedDays: "3-5 días",
        rating: 4.8,
        features: ["Seguimiento en tiempo real", "Seguro incluido", "Manejo especializado"],
        restrictions: ["No domingos ni festivos"],
      },
      {
        id: "2",
        carrier: "LogiCampo",
        service: "Express",
        price: 125000,
        estimatedDays: "1-2 días",
        rating: 4.6,
        features: ["Entrega express", "Seguimiento GPS", "Seguro premium"],
      },
      {
        id: "3",
        carrier: "Frío Express",
        service: "Cadena de Frío",
        price: 165000,
        estimatedDays: "2-3 días",
        rating: 4.9,
        features: ["Refrigeración controlada", "Monitoreo de temperatura", "Certificación HACCP"],
        restrictions: ["Solo productos perecederos"],
      },
      {
        id: "4",
        carrier: "Carga Rural",
        service: "Económico",
        price: 65000,
        estimatedDays: "5-7 días",
        rating: 4.2,
        features: ["Precio competitivo", "Cobertura nacional"],
        restrictions: ["Sin seguimiento en tiempo real"],
      },
    ]

    // Filter quotes based on requirements
    let filteredQuotes = mockQuotes
    if (quoteData.refrigerated) {
      filteredQuotes = filteredQuotes.filter(
        (q) => q.service.includes("Frío") || q.features.includes("Refrigeración controlada"),
      )
    }
    if (quoteData.urgent) {
      filteredQuotes = filteredQuotes.filter((q) => q.service.includes("Express") || q.estimatedDays.includes("1-2"))
    }

    setQuotes(filteredQuotes)
    setIsCalculating(false)
  }

  const trackingData = [
    {
      id: "TRK-2024-001",
      orderId: "ORD-2024-001",
      carrier: "Transportes Agro",
      status: "En tránsito",
      currentLocation: "Medellín, Antioquia",
      destination: "Barranquilla, Atlántico",
      estimatedDelivery: "2024-03-25",
      progress: 65,
      events: [
        { date: "2024-03-22 08:00", location: "Medellín", event: "Paquete recogido" },
        { date: "2024-03-22 14:30", location: "Medellín", event: "En centro de distribución" },
        { date: "2024-03-23 09:15", location: "Bogotá", event: "En tránsito" },
        { date: "2024-03-23 18:45", location: "Bucaramanga", event: "En tránsito" },
      ],
    },
    {
      id: "TRK-2024-002",
      orderId: "ORD-2024-003",
      carrier: "LogiCampo",
      status: "Entregado",
      currentLocation: "Zipaquirá, Cundinamarca",
      destination: "Zipaquirá, Cundinamarca",
      estimatedDelivery: "2024-03-20",
      progress: 100,
      events: [
        { date: "2024-03-18 10:00", location: "Zipaquirá", event: "Paquete recogido" },
        { date: "2024-03-18 16:30", location: "Zipaquirá", event: "En reparto" },
        { date: "2024-03-18 18:15", location: "Zipaquirá", event: "Entregado" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Centro Logístico</h1>
            <p className="text-muted-foreground">
              Cotiza envíos, rastrea paquetes y gestiona la logística de tus productos agropecuarios
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Cotizador de Envíos</TabsTrigger>
              <TabsTrigger value="tracking">Rastreo de Paquetes</TabsTrigger>
              <TabsTrigger value="carriers">Transportistas</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Calculator Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        Calculadora de Envíos
                      </CardTitle>
                      <CardDescription>Obtén cotizaciones instantáneas de múltiples transportistas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="origin">Origen *</Label>
                          <Select
                            value={quoteData.origin}
                            onValueChange={(value) => setQuoteData({ ...quoteData, origin: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Departamento de origen" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="destination">Destino *</Label>
                          <Select
                            value={quoteData.destination}
                            onValueChange={(value) => setQuoteData({ ...quoteData, destination: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Departamento de destino" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept} value={dept}>
                                  {dept}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Peso (kg) *</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={quoteData.weight}
                            onChange={(e) => setQuoteData({ ...quoteData, weight: e.target.value })}
                            placeholder="100"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="volume">Volumen (m³)</Label>
                          <Input
                            id="volume"
                            type="number"
                            step="0.1"
                            value={quoteData.volume}
                            onChange={(e) => setQuoteData({ ...quoteData, volume: e.target.value })}
                            placeholder="1.5"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="productType">Tipo de Producto *</Label>
                          <Select
                            value={quoteData.productType}
                            onValueChange={(value) => setQuoteData({ ...quoteData, productType: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar" />
                            </SelectTrigger>
                            <SelectContent>
                              {productTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">Requisitos Especiales</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="refrigerated"
                              checked={quoteData.refrigerated}
                              onCheckedChange={(checked) =>
                                setQuoteData({ ...quoteData, refrigerated: checked as boolean })
                              }
                            />
                            <Label htmlFor="refrigerated" className="text-sm flex items-center gap-2">
                              <Thermometer className="h-4 w-4" />
                              Refrigerado
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="fragile"
                              checked={quoteData.fragile}
                              onCheckedChange={(checked) => setQuoteData({ ...quoteData, fragile: checked as boolean })}
                            />
                            <Label htmlFor="fragile" className="text-sm flex items-center gap-2">
                              <Package className="h-4 w-4" />
                              Frágil
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="urgent"
                              checked={quoteData.urgent}
                              onCheckedChange={(checked) => setQuoteData({ ...quoteData, urgent: checked as boolean })}
                            />
                            <Label htmlFor="urgent" className="text-sm flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Urgente
                            </Label>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={calculateShipping}
                        disabled={
                          !quoteData.origin ||
                          !quoteData.destination ||
                          !quoteData.weight ||
                          !quoteData.productType ||
                          isCalculating
                        }
                        className="w-full"
                      >
                        {isCalculating ? "Calculando..." : "Obtener Cotizaciones"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Quotes Results */}
                  {quotes.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Cotizaciones Disponibles</CardTitle>
                        <CardDescription>{quotes.length} opciones encontradas</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {quotes.map((quote) => (
                          <div key={quote.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <Truck className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold">{quote.carrier}</div>
                                  <div className="text-sm text-muted-foreground">{quote.service}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold text-xl text-primary">${quote.price.toLocaleString()}</div>
                                <div className="text-sm text-muted-foreground">{quote.estimatedDays}</div>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm">{quote.rating}</span>
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {quote.features.map((feature, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {quote.restrictions && (
                              <Alert className="mb-3">
                                <AlertDescription className="text-sm">
                                  <strong>Restricciones:</strong> {quote.restrictions.join(", ")}
                                </AlertDescription>
                              </Alert>
                            )}

                            <div className="flex gap-2">
                              <Button className="flex-1">Seleccionar</Button>
                              <Button variant="outline">Ver Detalles</Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Info Sidebar */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Envíos Seguros
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Seguro incluido en todos los envíos</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Seguimiento en tiempo real</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Transportistas verificados</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Manejo especializado para productos agropecuarios</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Factores de Precio</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                      <p>• Distancia entre origen y destino</p>
                      <p>• Peso y volumen del envío</p>
                      <p>• Tipo de producto y requisitos especiales</p>
                      <p>• Velocidad de entrega requerida</p>
                      <p>• Servicios adicionales (refrigeración, seguro premium)</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tracking" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Rastrear Envío
                    </CardTitle>
                    <CardDescription>Ingresa tu número de seguimiento para ver el estado de tu envío</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <Input placeholder="Número de seguimiento (ej: TRK-2024-001)" className="flex-1" />
                      <Button>Rastrear</Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Active Shipments */}
                <div className="space-y-4">
                  <h2 className="font-semibold text-lg">Envíos Activos</h2>
                  {trackingData.map((shipment) => (
                    <Card key={shipment.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="flex items-center gap-3">
                              <span>{shipment.id}</span>
                              <Badge
                                className={
                                  shipment.status === "Entregado"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-blue-100 text-blue-800"
                                }
                              >
                                {shipment.status}
                              </Badge>
                            </CardTitle>
                            <CardDescription>
                              Pedido: {shipment.orderId} • {shipment.carrier}
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{shipment.progress}%</div>
                            <div className="text-sm text-muted-foreground">Completado</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Progress Bar */}
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{shipment.currentLocation}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">Destino: {shipment.destination}</div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${shipment.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Estimated Delivery */}
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Entrega estimada: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-3">
                          <div className="font-semibold text-sm">Historial de Eventos:</div>
                          <div className="space-y-2">
                            {shipment.events.map((event, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{event.event}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {event.location} • {new Date(event.date).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Ver Detalles Completos
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            Contactar Transportista
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="carriers" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: "Transportes Agro",
                    rating: 4.8,
                    reviews: 1247,
                    specialties: ["Productos frescos", "Cadena de frío", "Cobertura nacional"],
                    coverage: "Nacional",
                    avgDelivery: "3-5 días",
                    verified: true,
                  },
                  {
                    name: "LogiCampo",
                    rating: 4.6,
                    reviews: 892,
                    specialties: ["Entrega express", "Seguimiento GPS", "Productos delicados"],
                    coverage: "Regional",
                    avgDelivery: "1-2 días",
                    verified: true,
                  },
                  {
                    name: "Frío Express",
                    rating: 4.9,
                    reviews: 634,
                    specialties: ["Cadena de frío", "Productos perecederos", "Certificación HACCP"],
                    coverage: "Nacional",
                    avgDelivery: "2-3 días",
                    verified: true,
                  },
                  {
                    name: "Carga Rural",
                    rating: 4.2,
                    reviews: 1156,
                    specialties: ["Precios competitivos", "Zonas rurales", "Carga pesada"],
                    coverage: "Nacional",
                    avgDelivery: "5-7 días",
                    verified: true,
                  },
                ].map((carrier, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {carrier.name}
                          {carrier.verified && (
                            <Badge className="bg-green-100 text-green-800 text-xs">Verificado</Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{carrier.rating}</span>
                        </div>
                      </div>
                      <CardDescription>{carrier.reviews} reseñas</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm">
                          <strong>Cobertura:</strong> {carrier.coverage}
                        </div>
                        <div className="text-sm">
                          <strong>Tiempo promedio:</strong> {carrier.avgDelivery}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-sm font-semibold">Especialidades:</div>
                        <div className="flex flex-wrap gap-1">
                          {carrier.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Ver Perfil
                        </Button>
                        <Button size="sm" className="flex-1">
                          Cotizar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
