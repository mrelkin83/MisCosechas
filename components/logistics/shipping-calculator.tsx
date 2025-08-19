"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Truck, Clock, Thermometer, Package, Star } from "lucide-react"

interface ShippingCalculatorProps {
  onQuoteGenerated?: (quotes: ShippingQuote[]) => void
  defaultOrigin?: string
  defaultDestination?: string
  defaultWeight?: string
  defaultProductType?: string
}

interface ShippingQuote {
  id: string
  carrier: string
  service: string
  price: number
  estimatedDays: string
  rating: number
  features: string[]
  restrictions?: string[]
  co2Emissions?: number
}

export function ShippingCalculator({
  onQuoteGenerated,
  defaultOrigin = "",
  defaultDestination = "",
  defaultWeight = "",
  defaultProductType = "",
}: ShippingCalculatorProps) {
  const [formData, setFormData] = useState({
    origin: defaultOrigin,
    destination: defaultDestination,
    weight: defaultWeight,
    volume: "",
    productType: defaultProductType,
    refrigerated: false,
    fragile: false,
    urgent: false,
    insurance: true,
  })

  const [quotes, setQuotes] = useState<ShippingQuote[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

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

  const productTypes = [
    "Frutas y Verduras",
    "Granos y Cereales",
    "Productos Lácteos",
    "Carne y Aves",
    "Café",
    "Productos Procesados",
    "Otros",
  ]

  const calculateDistance = (origin: string, destination: string): number => {
    // Simplified distance calculation - in real app, use proper geolocation API
    const distances: Record<string, Record<string, number>> = {
      Antioquia: { Atlántico: 650, "Bogotá D.C.": 450, "Valle del Cauca": 340 },
      "Bogotá D.C.": { Antioquia: 450, Atlántico: 1000, "Valle del Cauca": 450 },
      "Valle del Cauca": { Antioquia: 340, "Bogotá D.C.": 450, Atlántico: 800 },
    }

    return distances[origin]?.[destination] || 500 // Default distance
  }

  const calculateShipping = async () => {
    if (!formData.origin || !formData.destination || !formData.weight || !formData.productType) {
      return
    }

    setIsCalculating(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const weight = Number.parseFloat(formData.weight)
    const volume = Number.parseFloat(formData.volume) || weight * 0.001 // Default volume calculation
    const distance = calculateDistance(formData.origin, formData.destination)

    // Base price calculation
    const basePrice = (weight * 0.8 + volume * 1000 + distance * 0.15) * 1000

    const generatedQuotes: ShippingQuote[] = [
      {
        id: "1",
        carrier: "Transportes Agro",
        service: "Estándar",
        price: Math.round(basePrice * 0.9),
        estimatedDays: distance > 500 ? "4-6 días" : "2-4 días",
        rating: 4.8,
        features: ["Seguimiento en tiempo real", "Seguro incluido", "Manejo especializado"],
        co2Emissions: Math.round(distance * weight * 0.12),
      },
      {
        id: "2",
        carrier: "LogiCampo",
        service: "Express",
        price: Math.round(basePrice * 1.4),
        estimatedDays: distance > 500 ? "2-3 días" : "1-2 días",
        rating: 4.6,
        features: ["Entrega express", "Seguimiento GPS", "Seguro premium"],
        co2Emissions: Math.round(distance * weight * 0.18),
      },
      {
        id: "3",
        carrier: "Carga Rural",
        service: "Económico",
        price: Math.round(basePrice * 0.7),
        estimatedDays: distance > 500 ? "6-8 días" : "4-6 días",
        rating: 4.2,
        features: ["Precio competitivo", "Cobertura nacional"],
        restrictions: ["Sin seguimiento en tiempo real"],
        co2Emissions: Math.round(distance * weight * 0.1),
      },
    ]

    // Add refrigerated option if needed
    if (formData.refrigerated) {
      generatedQuotes.push({
        id: "4",
        carrier: "Frío Express",
        service: "Cadena de Frío",
        price: Math.round(basePrice * 1.8),
        estimatedDays: distance > 500 ? "3-4 días" : "2-3 días",
        rating: 4.9,
        features: ["Refrigeración controlada", "Monitoreo de temperatura", "Certificación HACCP"],
        restrictions: ["Solo productos perecederos"],
        co2Emissions: Math.round(distance * weight * 0.25),
      })
    }

    // Apply urgent filter
    let filteredQuotes = generatedQuotes
    if (formData.urgent) {
      filteredQuotes = filteredQuotes.filter((q) => q.service.includes("Express") || q.estimatedDays.includes("1-2"))
    }

    setQuotes(filteredQuotes)
    onQuoteGenerated?.(filteredQuotes)
    setIsCalculating(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Calculadora de Envíos
          </CardTitle>
          <CardDescription>Obtén cotizaciones instantáneas basadas en peso, volumen y distancia</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="origin">Origen *</Label>
              <Select value={formData.origin} onValueChange={(value) => setFormData({ ...formData, origin: value })}>
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
                value={formData.destination}
                onValueChange={(value) => setFormData({ ...formData, destination: value })}
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
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="volume">Volumen (m³)</Label>
              <Input
                id="volume"
                type="number"
                step="0.1"
                value={formData.volume}
                onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                placeholder="1.5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="productType">Tipo de Producto *</Label>
              <Select
                value={formData.productType}
                onValueChange={(value) => setFormData({ ...formData, productType: value })}
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
            <Label className="text-sm font-semibold">Opciones de Envío</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="refrigerated"
                  checked={formData.refrigerated}
                  onCheckedChange={(checked) => setFormData({ ...formData, refrigerated: checked as boolean })}
                />
                <Label htmlFor="refrigerated" className="text-sm flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  Refrigerado
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="fragile"
                  checked={formData.fragile}
                  onCheckedChange={(checked) => setFormData({ ...formData, fragile: checked as boolean })}
                />
                <Label htmlFor="fragile" className="text-sm flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Frágil
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={formData.urgent}
                  onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked as boolean })}
                />
                <Label htmlFor="urgent" className="text-sm flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Urgente
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="insurance"
                  checked={formData.insurance}
                  onCheckedChange={(checked) => setFormData({ ...formData, insurance: checked as boolean })}
                />
                <Label htmlFor="insurance" className="text-sm">
                  Seguro Extra
                </Label>
              </div>
            </div>
          </div>

          <Button
            onClick={calculateShipping}
            disabled={
              !formData.origin || !formData.destination || !formData.weight || !formData.productType || isCalculating
            }
            className="w-full"
          >
            {isCalculating ? "Calculando..." : "Obtener Cotizaciones"}
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
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
                  {quote.co2Emissions && (
                    <div className="text-sm text-muted-foreground">CO₂: {quote.co2Emissions}g</div>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {quote.features.slice(0, 2).map((feature, index) => (
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
  )
}
