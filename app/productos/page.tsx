"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductSearch } from "@/components/products/product-search"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, Grid, List } from "lucide-react"

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("relevance")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    priceRange: [0, 1000000],
    certifications: [] as string[],
    availability: "all",
    searchQuery: "",
  })

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Aguacate Hass Premium",
      category: "Frutas y Verduras",
      producer: "Finca Los Andes",
      location: "Antioquia, Medellín",
      price: 4500,
      unit: "kg",
      minQuantity: 100,
      availability: "Disponible",
      harvestWindow: "Marzo - Mayo 2024",
      certifications: ["Orgánico", "GlobalGAP"],
      rating: 4.8,
      reviews: 24,
      image: "/avocado-hass-premium.png",
      description: "Aguacate Hass de primera calidad, cultivado en las montañas de Antioquia.",
    },
    {
      id: 2,
      name: "Café Especial Huila",
      category: "Café Especial",
      producer: "Cooperativa Café del Sur",
      location: "Huila, Pitalito",
      price: 18000,
      unit: "kg",
      minQuantity: 50,
      availability: "Disponible",
      harvestWindow: "Abril - Junio 2024",
      certifications: ["Fair Trade", "Rainforest Alliance"],
      rating: 4.9,
      reviews: 45,
      image: "/specialty-coffee-huila.png",
      description: "Café especial con notas frutales y acidez balanceada, cultivado a 1800 msnm.",
    },
    {
      id: 3,
      name: "Plátano Hartón",
      category: "Frutas y Verduras",
      producer: "Bananera El Dorado",
      location: "Magdalena, Santa Marta",
      price: 1200,
      unit: "kg",
      minQuantity: 500,
      availability: "Disponible",
      harvestWindow: "Todo el año",
      certifications: ["BPA"],
      rating: 4.6,
      reviews: 18,
      image: "/plantain-harton.png",
      description: "Plátano hartón de excelente calidad para exportación y mercado nacional.",
    },
    {
      id: 4,
      name: "Leche Fresca Premium",
      category: "Productos Lácteos",
      producer: "Ganadería San José",
      location: "Cundinamarca, Zipaquirá",
      price: 1800,
      unit: "litro",
      minQuantity: 200,
      availability: "Disponible",
      harvestWindow: "Producción diaria",
      certifications: ["HACCP"],
      rating: 4.7,
      reviews: 32,
      image: "/fresh-premium-milk.png",
      description: "Leche fresca de vacas Holstein, ordeñada diariamente con los más altos estándares.",
    },
    {
      id: 5,
      name: "Arroz Blanco Premium",
      category: "Granos y Cereales",
      producer: "Arrocera del Tolima",
      location: "Tolima, Ibagué",
      price: 3200,
      unit: "kg",
      minQuantity: 1000,
      availability: "Disponible",
      harvestWindow: "Enero - Marzo 2024",
      certifications: ["BPA"],
      rating: 4.5,
      reviews: 28,
      image: "/premium-white-rice.png",
      description: "Arroz blanco de grano largo, ideal para consumo familiar y restaurantes.",
    },
    {
      id: 6,
      name: "Carne de Res Angus",
      category: "Carne y Aves",
      producer: "Ganadería Premium",
      location: "Casanare, Yopal",
      price: 25000,
      unit: "kg",
      minQuantity: 20,
      availability: "Disponible",
      harvestWindow: "Disponible todo el año",
      certifications: ["Orgánico"],
      rating: 4.9,
      reviews: 15,
      image: "/angus-beef.png",
      description: "Carne de res Angus de pastoreo libre, alimentada con pastos naturales.",
    },
  ])

  const filteredProducts = products.filter((product) => {
    if (filters.category && product.category !== filters.category) return false
    if (filters.searchQuery && !product.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) return false
    if (filters.availability !== "all" && product.availability !== filters.availability) return false
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
    if (filters.certifications.length > 0) {
      const hasMatchingCert = filters.certifications.some((cert) => product.certifications.includes(cert))
      if (!hasMatchingCert) return false
    }
    return true
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-3xl mb-4">Catálogo de Productos</h1>
          <ProductSearch
            onSearch={(query) => setFilters({ ...filters, searchQuery: query })}
            placeholder="Buscar productos, productores, regiones..."
          />
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-80 flex-shrink-0`}>
            <ProductFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{filteredProducts.length} productos encontrados</span>
                  {filters.category && (
                    <Badge variant="secondary" className="text-xs">
                      {filters.category}
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Más relevantes</SelectItem>
                    <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                    <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                    <SelectItem value="rating">Mejor calificados</SelectItem>
                    <SelectItem value="newest">Más recientes</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <ProductGrid products={filteredProducts} viewMode={viewMode} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
