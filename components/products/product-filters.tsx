"use client"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { X, RotateCcw } from "lucide-react"

interface ProductFiltersProps {
  filters: {
    category: string
    region: string
    priceRange: number[]
    certifications: string[]
    availability: string
    searchQuery: string
  }
  onFiltersChange: (filters: any) => void
}

export function ProductFilters({ filters, onFiltersChange }: ProductFiltersProps) {
  const categories = [
    "Frutas y Verduras",
    "Granos y Cereales",
    "Productos Lácteos",
    "Carne y Aves",
    "Productos Orgánicos",
    "Café Especial",
  ]

  const regions = [
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

  const handleCertificationChange = (certification: string, checked: boolean) => {
    const updatedCertifications = checked
      ? [...filters.certifications, certification]
      : filters.certifications.filter((c) => c !== certification)

    onFiltersChange({
      ...filters,
      certifications: updatedCertifications,
    })
  }

  const clearAllFilters = () => {
    onFiltersChange({
      category: "",
      region: "",
      priceRange: [0, 1000000],
      certifications: [],
      availability: "all",
      searchQuery: "",
    })
  }

  const activeFiltersCount =
    (filters.category ? 1 : 0) +
    (filters.region ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0) +
    filters.certifications.length +
    (filters.availability !== "all" ? 1 : 0)

  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filtros</CardTitle>
          {activeFiltersCount > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {activeFiltersCount}
              </Badge>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Category Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Categoría</Label>
          <Select value={filters.category} onValueChange={(value) => onFiltersChange({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Region Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Región</Label>
          <Select value={filters.region} onValueChange={(value) => onFiltersChange({ ...filters, region: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las regiones" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las regiones</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Price Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Rango de Precio (COP)</Label>
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
              max={1000000}
              min={0}
              step={1000}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${filters.priceRange[0].toLocaleString()}</span>
            <span>${filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        {/* Availability Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Disponibilidad</Label>
          <Select
            value={filters.availability}
            onValueChange={(value) => onFiltersChange({ ...filters, availability: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="Disponible">Disponible</SelectItem>
              <SelectItem value="Próximamente">Próximamente</SelectItem>
              <SelectItem value="Agotado">Agotado</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Certifications Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Certificaciones</Label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {certifications.map((certification) => (
              <div key={certification} className="flex items-center space-x-2">
                <Checkbox
                  id={certification}
                  checked={filters.certifications.includes(certification)}
                  onCheckedChange={(checked) => handleCertificationChange(certification, checked as boolean)}
                />
                <Label htmlFor={certification} className="text-sm font-normal">
                  {certification}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-sm font-semibold">Filtros Activos</Label>
              <div className="flex flex-wrap gap-2">
                {filters.category && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onFiltersChange({ ...filters, category: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.region && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.region}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => onFiltersChange({ ...filters, region: "" })}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                )}
                {filters.certifications.map((cert) => (
                  <Badge key={cert} variant="secondary" className="text-xs">
                    {cert}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleCertificationChange(cert, false)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
