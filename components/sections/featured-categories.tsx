import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Apple, Wheat, Milk, Beef, Leaf, Coffee } from "lucide-react"

const categories = [
  {
    name: "Frutas y Verduras",
    icon: Apple,
    count: "12,500+ productos",
    color: "bg-green-100 text-green-700",
    image: "/colombian-produce.png",
  },
  {
    name: "Granos y Cereales",
    icon: Wheat,
    count: "8,200+ productos",
    color: "bg-amber-100 text-amber-700",
    image: "/colombian-grains-cereals.png",
  },
  {
    name: "Productos Lácteos",
    icon: Milk,
    count: "3,400+ productos",
    color: "bg-blue-100 text-blue-700",
    image: "/colombian-dairy.png",
  },
  {
    name: "Carne y Aves",
    icon: Beef,
    count: "2,800+ productos",
    color: "bg-red-100 text-red-700",
    image: "/colombian-meat-poultry.png",
  },
  {
    name: "Productos Orgánicos",
    icon: Leaf,
    count: "4,600+ productos",
    color: "bg-emerald-100 text-emerald-700",
    image: "/organic-colombian-products.png",
  },
  {
    name: "Café Especial",
    icon: Coffee,
    count: "1,900+ productos",
    color: "bg-orange-100 text-orange-700",
    image: "/colombian-specialty-coffee-beans.png",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Explora Nuestras Categorías
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre la mejor selección de productos agropecuarios colombianos, directamente de los productores más
            confiables del país.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card
                key={category.name}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-montserrat font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-sm">
                      {category.count}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
