"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, MapPin, Calendar, ShoppingCart, Heart, Eye } from "lucide-react"

interface Product {
  id: number
  name: string
  category: string
  producer: string
  location: string
  price: number
  unit: string
  minQuantity: number
  availability: string
  harvestWindow: string
  certifications: string[]
  rating: number
  reviews: number
  image: string
  description: string
}

interface ProductGridProps {
  products: Product[]
  viewMode: "grid" | "list"
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg mb-2">No se encontraron productos</h3>
        <p className="text-muted-foreground">Intenta ajustar los filtros o buscar con otros términos.</p>
      </div>
    )
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <div className="flex">
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={product.image || "/placeholder.svg?height=128&width=192"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-l-lg"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link href={`/productos/${product.id}`}>
                      <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl text-primary">${product.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">por {product.unit}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{product.producer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{product.producer}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{product.rating}</span>
                    <span className="text-sm text-muted-foreground">({product.reviews})</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={product.availability === "Disponible" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {product.availability}
                    </Badge>
                    {product.certifications.slice(0, 2).map((cert) => (
                      <Badge key={cert} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
        >
          <CardHeader className="p-0">
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={product.image || "/placeholder.svg?height=200&width=300"}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge variant={product.availability === "Disponible" ? "default" : "secondary"} className="text-xs">
                  {product.availability}
                </Badge>
              </div>
              <div className="absolute top-3 right-3 flex gap-2">
                <Button variant="ghost" size="sm" className="bg-background/80 hover:bg-background">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="bg-background/80 hover:bg-background">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="space-y-3">
              <div>
                <Link href={`/productos/${product.id}`}>
                  <h3 className="font-semibold text-lg group-hover:text-primary cursor-pointer line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-muted-foreground">{product.category}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-xs">{product.producer.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{product.producer}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{product.rating}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {product.location}
              </div>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {product.harvestWindow}
              </div>

              <div className="flex flex-wrap gap-1">
                {product.certifications.slice(0, 2).map((cert) => (
                  <Badge key={cert} variant="outline" className="text-xs">
                    {cert}
                  </Badge>
                ))}
                {product.certifications.length > 2 && (
                  <Badge variant="outline" className="text-xs">
                    +{product.certifications.length - 2}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xl text-primary">${product.price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">
                    por {product.unit} • Min: {product.minQuantity} {product.unit}
                  </div>
                </div>
              </div>
              <Button className="w-full">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Agregar al Carrito
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
