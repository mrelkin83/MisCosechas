"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Star,
  MapPin,
  Calendar,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Award,
  MessageCircle,
  Plus,
  Minus,
} from "lucide-react"

export default function ProductDetailPage() {
  const params = useParams()
  const [quantity, setQuantity] = useState(100)
  const [selectedImage, setSelectedImage] = useState(0)

  // Mock product data - in real app, fetch based on params.id
  const product = {
    id: 1,
    name: "Aguacate Hass Premium",
    category: "Frutas y Verduras",
    producer: "Finca Los Andes",
    producerImage: "/producer-avatar.jpg",
    location: "Antioquia, Medellín",
    price: 4500,
    unit: "kg",
    minQuantity: 100,
    maxQuantity: 5000,
    availability: "Disponible",
    stock: 2500,
    harvestWindow: "Marzo - Mayo 2024",
    certifications: ["Orgánico", "GlobalGAP", "Fair Trade"],
    rating: 4.8,
    reviews: 24,
    images: [
      "/avocado-hass-premium-1.jpg",
      "/avocado-hass-premium-2.jpg",
      "/avocado-hass-premium-3.jpg",
      "/avocado-hass-premium-4.jpg",
    ],
    description:
      "Aguacate Hass de primera calidad, cultivado en las montañas de Antioquia a 2,200 metros sobre el nivel del mar. Nuestros aguacates se caracterizan por su excelente sabor, textura cremosa y alto contenido de aceites naturales. Cultivados bajo estrictos estándares orgánicos y de comercio justo.",
    specifications: {
      variety: "Hass",
      caliber: "14-18 cm",
      weight: "180-250g por unidad",
      maturity: "Óptimo para consumo",
      packaging: "Cajas de 10kg",
      shelfLife: "7-10 días a temperatura ambiente",
    },
    producer_info: {
      name: "Finca Los Andes",
      experience: "25 años",
      certifications: ["Orgánico", "GlobalGAP", "Fair Trade"],
      description:
        "Somos una finca familiar con más de 25 años de experiencia en el cultivo de aguacate Hass. Nos especializamos en producción orgánica y sostenible, cuidando tanto la calidad de nuestros productos como el medio ambiente.",
      rating: 4.9,
      totalSales: 1250,
    },
    shipping: {
      freeShipping: true,
      estimatedDays: "2-3 días hábiles",
      regions: ["Antioquia", "Cundinamarca", "Valle del Cauca"],
    },
  }

  const totalPrice = quantity * product.price

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= product.minQuantity && newQuantity <= product.maxQuantity) {
      setQuantity(newQuantity)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/productos" className="hover:text-foreground">
            Productos
          </Link>
          <span>/</span>
          <Link href={`/productos?category=${product.category}`} className="hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden border-2">
              <img
                src={product.images[selectedImage] || "/placeholder.svg?height=500&width=500"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg?height=100&width=100"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <Badge variant={product.availability === "Disponible" ? "default" : "secondary"} className="text-xs">
                  {product.availability}
                </Badge>
              </div>
              <h1 className="font-montserrat font-bold text-3xl mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{product.rating}</span>
                  <span>({product.reviews} reseñas)</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {product.location}
                </div>
              </div>
            </div>

            {/* Producer Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={product.producerImage || "/placeholder.svg"} />
                    <AvatarFallback>{product.producer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.producer}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.producer_info.rating}</span>
                      <span>•</span>
                      <span>{product.producer_info.totalSales} ventas</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contactar
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Price and Purchase */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="font-bold text-3xl text-primary">${product.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">por {product.unit}</div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Ventana de cosecha: {product.harvestWindow}</span>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="quantity" className="text-sm font-semibold">
                        Cantidad ({product.unit})
                      </Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(quantity - 10)}
                          disabled={quantity <= product.minQuantity}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          id="quantity"
                          type="number"
                          value={quantity}
                          onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || product.minQuantity)}
                          min={product.minQuantity}
                          max={product.maxQuantity}
                          className="w-24 text-center"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(quantity + 10)}
                          disabled={quantity >= product.maxQuantity}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Mínimo: {product.minQuantity} {product.unit} • Máximo: {product.maxQuantity} {product.unit}
                      </div>
                    </div>

                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-xl text-primary">${totalPrice.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                      <Button variant="outline">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Solicitar Cotización Personalizada
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="flex items-center gap-1">
                  <Award className="h-3 w-3" />
                  {cert}
                </Badge>
              ))}
            </div>

            {/* Shipping Info */}
            {product.shipping.freeShipping && (
              <Alert>
                <Truck className="h-4 w-4" />
                <AlertDescription>
                  <strong>Envío gratis</strong> • Entrega en {product.shipping.estimatedDays}
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Descripción</TabsTrigger>
            <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
            <TabsTrigger value="producer">Productor</TabsTrigger>
            <TabsTrigger value="reviews">Reseñas ({product.reviews})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="producer" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={product.producerImage || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">{product.producer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{product.producer_info.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.producer_info.rating}</span>
                        <span>•</span>
                        <span>{product.producer_info.experience} de experiencia</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{product.producer_info.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {product.producer_info.certifications.map((cert) => (
                      <Badge key={cert} variant="outline">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">Sistema de reseñas próximamente</h3>
                  <p className="text-muted-foreground">
                    Estamos trabajando en implementar un sistema completo de reseñas y calificaciones.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  )
}
