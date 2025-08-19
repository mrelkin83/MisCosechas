"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, DollarSign, Package, FileText, Info } from "lucide-react"

export default function CreateRFQPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    quantity: "",
    unit: "kg",
    budgetMin: "",
    budgetMax: "",
    deadline: "",
    deliveryLocation: "",
    department: "",
    requirements: [] as string[],
    specifications: "",
    paymentTerms: "",
    deliveryTerms: "",
  })

  const categories = [
    "Frutas y Verduras",
    "Granos y Cereales",
    "Productos Lácteos",
    "Carne y Aves",
    "Productos Orgánicos",
    "Café Especial",
  ]

  const commonRequirements = [
    "Certificación Orgánica",
    "GlobalGAP",
    "BPA",
    "HACCP",
    "Fair Trade",
    "Rainforest Alliance",
    "Trazabilidad completa",
    "Empaque para exportación",
    "Análisis de calidad",
    "Entrega programada",
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

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    const updatedRequirements = checked
      ? [...formData.requirements, requirement]
      : formData.requirements.filter((r) => r !== requirement)

    setFormData({ ...formData, requirements: updatedRequirements })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement RFQ creation logic
    console.log("Creating RFQ:", formData)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Crear Solicitud de Cotización (RFQ)</h1>
            <p className="text-muted-foreground">
              Describe tu requerimiento y recibe cotizaciones de productores verificados
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Información Básica
                </CardTitle>
                <CardDescription>Describe claramente qué producto necesitas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título de la RFQ *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Aguacate Hass para exportación - 50 toneladas"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Fecha límite para cotizaciones *</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción detallada *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe el producto que necesitas, uso previsto, características específicas..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Budget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Cantidad y Presupuesto
                </CardTitle>
                <CardDescription>Especifica las cantidades y rango de presupuesto</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Cantidad requerida *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="100"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unit">Unidad *</Label>
                    <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilogramo (kg)</SelectItem>
                        <SelectItem value="ton">Tonelada (ton)</SelectItem>
                        <SelectItem value="lb">Libra (lb)</SelectItem>
                        <SelectItem value="unit">Unidad</SelectItem>
                        <SelectItem value="box">Caja</SelectItem>
                        <SelectItem value="sack">Bulto</SelectItem>
                        <SelectItem value="liter">Litro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Frecuencia</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Una vez" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="once">Una vez</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                        <SelectItem value="quarterly">Trimestral</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budgetMin">Presupuesto mínimo (COP)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budgetMin"
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budgetMax">Presupuesto máximo (COP)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="budgetMax"
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        placeholder="0"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location and Delivery */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Ubicación y Entrega
                </CardTitle>
                <CardDescription>¿Dónde necesitas recibir el producto?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento *</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) => setFormData({ ...formData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu departamento" />
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
                    <Label htmlFor="deliveryLocation">Ciudad/Ubicación de entrega *</Label>
                    <Input
                      id="deliveryLocation"
                      value={formData.deliveryLocation}
                      onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                      placeholder="Ej: Medellín, Zona Industrial"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryTerms">Términos de entrega</Label>
                  <Textarea
                    id="deliveryTerms"
                    value={formData.deliveryTerms}
                    onChange={(e) => setFormData({ ...formData, deliveryTerms: e.target.value })}
                    placeholder="Especifica horarios, condiciones de entrega, responsabilidades..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Requirements and Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Requisitos y Especificaciones</CardTitle>
                <CardDescription>Define los estándares de calidad y certificaciones requeridas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Certificaciones y requisitos</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonRequirements.map((requirement) => (
                      <div key={requirement} className="flex items-center space-x-2">
                        <Checkbox
                          id={requirement}
                          checked={formData.requirements.includes(requirement)}
                          onCheckedChange={(checked) => handleRequirementChange(requirement, checked as boolean)}
                        />
                        <Label htmlFor={requirement} className="text-sm">
                          {requirement}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specifications">Especificaciones técnicas adicionales</Label>
                  <Textarea
                    id="specifications"
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    placeholder="Calibre, grado de madurez, empaque específico, análisis requeridos..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Términos de pago</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona términos de pago" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="advance">Pago anticipado</SelectItem>
                      <SelectItem value="delivery">Pago contra entrega</SelectItem>
                      <SelectItem value="30-days">30 días</SelectItem>
                      <SelectItem value="60-days">60 días</SelectItem>
                      <SelectItem value="escrow">Pago con garantía (escrow)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Selected Requirements Preview */}
            {formData.requirements.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Requisitos Seleccionados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {formData.requirements.map((req) => (
                      <Badge key={req} variant="secondary">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Importante:</strong> Una vez publicada tu RFQ, los productores podrán enviar cotizaciones.
                Recibirás notificaciones por email y podrás gestionar las respuestas desde tu panel.
              </AlertDescription>
            </Alert>

            {/* Submit */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Publicar RFQ
              </Button>
              <Button type="button" variant="outline">
                Guardar Borrador
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
