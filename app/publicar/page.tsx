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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, X, MapPin, Info } from "lucide-react"

export default function PublishProductPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    title: "",
    category: "",
    subcategory: "",
    variety: "",
    description: "",

    // Pricing & Quantity
    price: "",
    unit: "kg",
    minQuantity: "",
    maxQuantity: "",

    // Harvest & Availability
    harvestStart: "",
    harvestEnd: "",
    availability: "available",

    // Location
    department: "",
    city: "",
    farm: "",

    // Certifications & Quality
    certifications: [] as string[],
    qualityGrade: "",
    caliber: "",

    // Images
    images: [] as File[],

    // Additional
    packaging: "",
    shelfLife: "",
    storageConditions: "",
  })

  const categories = [
    {
      value: "frutas-verduras",
      label: "Frutas y Verduras",
      subcategories: ["Frutas Tropicales", "Frutas de Clima Frío", "Verduras de Hoja", "Tubérculos"],
    },
    { value: "granos-cereales", label: "Granos y Cereales", subcategories: ["Arroz", "Maíz", "Frijol", "Quinua"] },
    {
      value: "lacteos",
      label: "Productos Lácteos",
      subcategories: ["Leche Fresca", "Quesos", "Yogurt", "Mantequilla"],
    },
    { value: "carne-aves", label: "Carne y Aves", subcategories: ["Carne de Res", "Carne de Cerdo", "Pollo", "Pavo"] },
    {
      value: "organicos",
      label: "Productos Orgánicos",
      subcategories: ["Frutas Orgánicas", "Verduras Orgánicas", "Granos Orgánicos"],
    },
    {
      value: "cafe",
      label: "Café Especial",
      subcategories: ["Café Arábica", "Café Robusta", "Café Orgánico", "Café de Especialidad"],
    },
  ]

  const certifications = [
    "Orgánico",
    "Fair Trade",
    "GlobalGAP",
    "BPA",
    "HACCP",
    "ISO 22000",
    "Rainforest Alliance",
    "UTZ Certified",
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

  const handleImageUpload = (files: FileList) => {
    const newImages = Array.from(files).slice(0, 6 - formData.images.length)
    setFormData({ ...formData, images: [...formData.images, ...newImages] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const handleCertificationChange = (certification: string, checked: boolean) => {
    const updatedCertifications = checked
      ? [...formData.certifications, certification]
      : formData.certifications.filter((c) => c !== certification)

    setFormData({ ...formData, certifications: updatedCertifications })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement product publishing logic
    console.log("Publishing product:", formData)
  }

  const selectedCategory = categories.find((cat) => cat.value === formData.category)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Publicar Producto</h1>
            <p className="text-muted-foreground">Comparte tus productos con miles de compradores en toda Colombia</p>
          </div>

          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="basic">Información Básica</TabsTrigger>
                <TabsTrigger value="details">Detalles del Producto</TabsTrigger>
                <TabsTrigger value="images">Imágenes</TabsTrigger>
                <TabsTrigger value="review">Revisar y Publicar</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Información General</CardTitle>
                    <CardDescription>Datos básicos de tu producto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Título del producto *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Ej: Aguacate Hass Premium"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Categoría *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value, subcategory: "" })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.value} value={category.value}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subcategory">Subcategoría</Label>
                        <Select
                          value={formData.subcategory}
                          onValueChange={(value) => setFormData({ ...formData, subcategory: value })}
                          disabled={!selectedCategory}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una subcategoría" />
                          </SelectTrigger>
                          <SelectContent>
                            {selectedCategory?.subcategories.map((subcategory) => (
                              <SelectItem key={subcategory} value={subcategory}>
                                {subcategory}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="variety">Variedad</Label>
                      <Input
                        id="variety"
                        value={formData.variety}
                        onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                        placeholder="Ej: Hass, Fuerte, Quindiño"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Describe tu producto, métodos de cultivo, características especiales..."
                        rows={4}
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ubicación</CardTitle>
                    <CardDescription>¿Dónde se produce tu producto?</CardDescription>
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
                        <Label htmlFor="city">Ciudad/Municipio *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="Ej: Medellín"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="farm">Nombre de la finca (opcional)</Label>
                      <Input
                        id="farm"
                        value={formData.farm}
                        onChange={(e) => setFormData({ ...formData, farm: e.target.value })}
                        placeholder="Ej: Finca Los Andes"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-6 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Precio y Cantidad</CardTitle>
                    <CardDescription>Define el precio y cantidades disponibles</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Precio *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            $
                          </span>
                          <Input
                            id="price"
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                            placeholder="0"
                            className="pl-8"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="unit">Unidad *</Label>
                        <Select
                          value={formData.unit}
                          onValueChange={(value) => setFormData({ ...formData, unit: value })}
                        >
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
                        <Label htmlFor="availability">Disponibilidad</Label>
                        <Select
                          value={formData.availability}
                          onValueChange={(value) => setFormData({ ...formData, availability: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Disponible</SelectItem>
                            <SelectItem value="coming-soon">Próximamente</SelectItem>
                            <SelectItem value="seasonal">Por temporada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minQuantity">Cantidad mínima *</Label>
                        <Input
                          id="minQuantity"
                          type="number"
                          value={formData.minQuantity}
                          onChange={(e) => setFormData({ ...formData, minQuantity: e.target.value })}
                          placeholder="100"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="maxQuantity">Cantidad máxima disponible</Label>
                        <Input
                          id="maxQuantity"
                          type="number"
                          value={formData.maxQuantity}
                          onChange={(e) => setFormData({ ...formData, maxQuantity: e.target.value })}
                          placeholder="5000"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ventana de Cosecha</CardTitle>
                    <CardDescription>¿Cuándo estará disponible tu producto?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="harvestStart">Inicio de cosecha</Label>
                        <Input
                          id="harvestStart"
                          type="date"
                          value={formData.harvestStart}
                          onChange={(e) => setFormData({ ...formData, harvestStart: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="harvestEnd">Fin de cosecha</Label>
                        <Input
                          id="harvestEnd"
                          type="date"
                          value={formData.harvestEnd}
                          onChange={(e) => setFormData({ ...formData, harvestEnd: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Calidad y Certificaciones</CardTitle>
                    <CardDescription>Información sobre la calidad y certificaciones de tu producto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="qualityGrade">Grado de calidad</Label>
                        <Select
                          value={formData.qualityGrade}
                          onValueChange={(value) => setFormData({ ...formData, qualityGrade: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona el grado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="first">Primera</SelectItem>
                            <SelectItem value="second">Segunda</SelectItem>
                            <SelectItem value="export">Exportación</SelectItem>
                            <SelectItem value="domestic">Nacional</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="caliber">Calibre</Label>
                        <Input
                          id="caliber"
                          value={formData.caliber}
                          onChange={(e) => setFormData({ ...formData, caliber: e.target.value })}
                          placeholder="Ej: 14-18 cm, Grande, Mediano"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-semibold">Certificaciones</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {certifications.map((certification) => (
                          <div key={certification} className="flex items-center space-x-2">
                            <Checkbox
                              id={certification}
                              checked={formData.certifications.includes(certification)}
                              onCheckedChange={(checked) =>
                                handleCertificationChange(certification, checked as boolean)
                              }
                            />
                            <Label htmlFor={certification} className="text-sm">
                              {certification}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="packaging">Empaque</Label>
                        <Input
                          id="packaging"
                          value={formData.packaging}
                          onChange={(e) => setFormData({ ...formData, packaging: e.target.value })}
                          placeholder="Ej: Cajas de 10kg, Bultos de 50kg"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="shelfLife">Vida útil</Label>
                        <Input
                          id="shelfLife"
                          value={formData.shelfLife}
                          onChange={(e) => setFormData({ ...formData, shelfLife: e.target.value })}
                          placeholder="Ej: 7-10 días, 6 meses"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="images" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Imágenes del Producto</CardTitle>
                    <CardDescription>
                      Sube hasta 6 imágenes de alta calidad de tu producto. La primera imagen será la principal.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Upload Area */}
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Arrastra tus imágenes aquí o haz clic para seleccionar
                        </p>
                        <Input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                          className="hidden"
                          id="image-upload"
                        />
                        <Label htmlFor="image-upload">
                          <Button variant="outline" asChild>
                            <span>Seleccionar Imágenes</span>
                          </Button>
                        </Label>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        JPG, PNG hasta 5MB cada una. Máximo 6 imágenes.
                      </p>
                    </div>

                    {/* Image Preview */}
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border-2">
                              <img
                                src={URL.createObjectURL(image) || "/placeholder.svg"}
                                alt={`Producto ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {index === 0 && <Badge className="absolute top-2 left-2 text-xs">Principal</Badge>}
                            <Button
                              variant="destructive"
                              size="sm"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Consejos para mejores fotos:</strong> Usa buena iluminación, muestra el producto desde
                        diferentes ángulos, incluye fotos del empaque y certificaciones si las tienes.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="review" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revisar y Publicar</CardTitle>
                    <CardDescription>Revisa toda la información antes de publicar tu producto</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Product Preview */}
                    <div className="border rounded-lg p-6 bg-muted/30">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-background">
                          {formData.images.length > 0 ? (
                            <img
                              src={URL.createObjectURL(formData.images[0]) || "/placeholder.svg"}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              Sin imagen
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{formData.title || "Título del producto"}</h3>
                          <p className="text-sm text-muted-foreground">{formData.category}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              ${formData.price || "0"} por {formData.unit}
                            </Badge>
                            <Badge variant="secondary">
                              Min: {formData.minQuantity || "0"} {formData.unit}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {formData.department && formData.city
                              ? `${formData.city}, ${formData.department}`
                              : "Ubicación no especificada"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Información básica</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Título:</span>
                            <span>{formData.title || "No especificado"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Categoría:</span>
                            <span>{formData.category || "No especificada"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Precio:</span>
                            <span>
                              ${formData.price || "0"} por {formData.unit}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Cantidad mín:</span>
                            <span>
                              {formData.minQuantity || "0"} {formData.unit}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Detalles adicionales</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Ubicación:</span>
                            <span>
                              {formData.city && formData.department
                                ? `${formData.city}, ${formData.department}`
                                : "No especificada"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Disponibilidad:</span>
                            <span>
                              {formData.availability === "available"
                                ? "Disponible"
                                : formData.availability === "coming-soon"
                                  ? "Próximamente"
                                  : "Por temporada"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Certificaciones:</span>
                            <span>{formData.certifications.length || "0"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Imágenes:</span>
                            <span>{formData.images.length}/6</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        Una vez publicado, tu producto será revisado por nuestro equipo en un plazo de 24 horas. Te
                        notificaremos cuando esté disponible para los compradores.
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-4">
                      <Button type="submit" className="flex-1">
                        Publicar Producto
                      </Button>
                      <Button type="button" variant="outline">
                        Guardar Borrador
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
