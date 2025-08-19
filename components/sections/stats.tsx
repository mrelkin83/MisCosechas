import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Package, MapPin } from "lucide-react"

const stats = [
  {
    value: "5,000+",
    label: "Productores Activos",
    description: "En todo el territorio colombiano",
    icon: Users,
    color: "text-primary",
  },
  {
    value: "50,000+",
    label: "Productos Disponibles",
    description: "Frescos y de alta calidad",
    icon: Package,
    color: "text-secondary",
  },
  {
    value: "$2.5B COP",
    label: "Volumen de Transacciones",
    description: "Procesadas mensualmente",
    icon: TrendingUp,
    color: "text-primary",
  },
  {
    value: "32",
    label: "Departamentos",
    description: "Con cobertura nacional",
    icon: MapPin,
    color: "text-secondary",
  },
]

export function Stats() {
  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Impulsando el Agro Colombiano
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Números que reflejan nuestro compromiso con el desarrollo del sector agropecuario nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.label} className="text-center border-2 hover:border-primary/20 transition-colors">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div className={`font-montserrat font-black text-3xl lg:text-4xl ${stat.color} mb-2`}>
                    {stat.value}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
