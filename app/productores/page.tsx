"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Star, Users, Package, Award, Grid, List } from "lucide-react"

export default function ProductoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const productores = [
    {
      id: 1,
      name: "Finca El Paraíso",
      owner: "Carlos Mendoza",
      avatar: "/farmer-portrait.png",
      location: "Huila, Colombia",
      rating: 4.8,
      reviews: 156,
      products: 24,
      followers: 1200,
      specialties: ["Café Especial", "Aguacate Hass"],
      certifications: ["Orgánico", "Fair Trade", "Rainforest Alliance"],
      description:
        "Productor de café especial con más de 20 años de experiencia. Especializado en variedades de alta calidad y prácticas sostenibles.",
      experience: "20+ años",
      verified: true,
      featured: true,
    },
    {
      id: 2,
      name: "Granja Los Andes",
      owner: "María Elena Rodríguez",
      avatar: "/female-farmer.png",
      location: "Antioquia, Colombia",
      rating: 4.9,
      reviews: 203,
      products: 18,
      followers: 890,
      specialties: ["Plátano Hartón", "Yuca", "Ñame"],
      certifications: ["Orgánico", "BPA"],
      description:
        "Agricultura familiar enfocada en tubérculos y plátanos de alta calidad. Pioneros en agricultura orgánica en la región.",
      experience: "15+ años",
      verified: true,
      featured: false,
    },
    {
      id: 3,
      name: "Hacienda San José",
      owner: "Roberto Silva",
      avatar: "/weathered-rancher.png",
      location: "Valle del Cauca, Colombia",
      rating: 4.7,
      reviews: 89,
      products: 12,
      followers: 650,
      specialties: ["Caña de Azúcar", "Panela"],
      certifications: ["Comercio Justo"],
      description:
        "Producción tradicional de caña de azúcar y panela artesanal. Comprometidos con el comercio justo y la sostenibilidad.",
      experience: "25+ años",
      verified: true,
      featured: false,
    },
    {
      id: 4,
      name: "Finca Verde Esperanza",
      owner: "Ana Lucía Torres",
      avatar: "/young-farmer-woman.png",
      location: "Cundinamarca, Colombia",
      rating: 4.6,
      reviews: 124,
      products: 32,
      followers: 1450,
      specialties: ["Hortalizas", "Hierbas Aromáticas", "Flores"],
      certifications: ["Orgánico", "GlobalGAP"],
      description:
        "Joven emprendedora agrícola especializada en hortalizas orgánicas y hierbas aromáticas para el mercado gourmet.",
      experience: "8+ años",
      verified: true,
      featured: true,
    },
    {
      id: 5,
      name: "Cooperativa El Progreso",
      owner: "Junta Directiva",
      avatar: "/cooperative-logo.png",
      location: "Nariño, Colombia",
      rating: 4.5,
      reviews: 67,
      products: 45,
      followers: 2100,
      specialties: ["Quinua", "Frijol", "Papa Criolla"],
      certifications: ["Orgánico", "Comercio Justo"],
      description:
        "Cooperativa de pequeños productores enfocada en granos andinos y productos tradicionales de alta montaña.",
      experience: "12+ años",
      verified: true,
      featured: false,
    },
    {
      id: 6,
      name: "Rancho La Esperanza",
      owner: "Diego Martínez",
      avatar: "/cattle-rancher.png",
      location: "Córdoba, Colombia",
      rating: 4.4,
      reviews: 92,
      products: 8,
      followers: 780,
      specialties: ["Carne Bovina", "Leche", "Quesos"],
      certifications: ["BPG", "HACCP"],
      description: "Ganadería sostenible con enfoque en bienestar animal y calidad de productos lácteos y cárnicos.",
      experience: "18+ años",
      verified: true,
      featured: false,
    },
  ]

  const regiones = ["Antioquia", "Huila", "Valle del Cauca", "Cundinamarca", "Nariño", "Córdoba", "Santander", "Tolima"]

  const categorias = ["Café", "Frutas", "Hortalizas", "Granos", "Lácteos", "Cárnicos", "Orgánicos", "Flores"]

  const filteredProductores = productores.filter((productor) => {
    const matchesSearch =
      productor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productor.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      productor.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesRegion = selectedRegion === "all" || productor.location.includes(selectedRegion)

    const matchesCategory =
      selectedCategory === "all" ||
      productor.specialties.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()))

    return matchesSearch && matchesRegion && matchesCategory
  })

  const featuredProductores = filteredProductores.filter((p) => p.featured)
  const allProductores = filteredProductores

  const ProductorCard = ({ productor, isGrid = true }: { productor: any; isGrid?: boolean }) => (
    <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${isGrid ? "" : "flex flex-row"}`}>
      <CardHeader className={`${isGrid ? "text-center" : "flex-shrink-0 w-48"}`}>
        <div className={`flex ${isGrid ? "flex-col items-center" : "flex-row items-center"} gap-4`}>
          <Avatar className="h-16 w-16">
            <AvatarImage src={productor.avatar || "/placeholder.svg"} alt={productor.name} />
            <AvatarFallback>{productor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className={`${isGrid ? "text-center" : "text-left"}`}>
            <div className="flex items-center gap-2 justify-center">
              <h3 className="font-semibold text-lg">{productor.name}</h3>
              {productor.verified && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Award className="h-3 w-3 mr-1" />
                  Verificado
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{productor.owner}</p>
            <div className="flex items-center gap-1 justify-center mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{productor.location}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-4">
          {/* Stats */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{productor.rating}</span>
              <span className="text-sm text-muted-foreground">({productor.reviews})</span>
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Package className="h-4 w-4" />
                <span>{productor.products} productos</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{productor.followers} seguidores</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-2">{productor.description}</p>

          {/* Specialties */}
          <div>
            <p className="text-sm font-medium mb-2">Especialidades:</p>
            <div className="flex flex-wrap gap-1">
              {productor.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <p className="text-sm font-medium mb-2">Certificaciones:</p>
            <div className="flex flex-wrap gap-1">
              {productor.certifications.map((cert: string, index: number) => (
                <Badge key={index} className="text-xs bg-green-100 text-green-800">
                  {cert}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm">
              Ver Perfil
            </Button>
            <Button variant="outline" size="sm">
              Seguir
            </Button>
            <Button variant="outline" size="sm">
              Contactar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-50 to-amber-50 border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground mb-4">Conoce a Nuestros Productores</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Conecta directamente con productores verificados de toda Colombia. Descubre historias, productos únicos y
              construye relaciones comerciales duraderas.
            </p>

            {/* Search and Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar productores, productos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Región" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las regiones</SelectItem>
                    {regiones.map((region) => (
                      <SelectItem key={region} value={region}>
                        {region}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="destacados" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="destacados">Destacados</TabsTrigger>
              <TabsTrigger value="todos">Todos los Productores</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="destacados">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold mb-2">Productores Destacados</h2>
              <p className="text-muted-foreground">Los mejores productores verificados de nuestra plataforma</p>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {featuredProductores.map((productor) => (
                <ProductorCard key={productor.id} productor={productor} isGrid={viewMode === "grid"} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="todos">
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Todos los Productores</h2>
                <p className="text-muted-foreground">{filteredProductores.length} productores encontrados</p>
              </div>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
            >
              {allProductores.map((productor) => (
                <ProductorCard key={productor.id} productor={productor} isGrid={viewMode === "grid"} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
