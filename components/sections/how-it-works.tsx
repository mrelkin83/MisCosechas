import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, MessageSquare, ShoppingCart, Truck } from "lucide-react"

const steps = [
  {
    step: "01",
    title: "Busca y Descubre",
    description: "Explora miles de productos agropecuarios de productores verificados en toda Colombia.",
    icon: Search,
    color: "bg-primary/10 text-primary",
  },
  {
    step: "02",
    title: "Conecta y Negocia",
    description: "Comunícate directamente con productores, solicita cotizaciones y negocia los mejores precios.",
    icon: MessageSquare,
    color: "bg-secondary/10 text-secondary",
  },
  {
    step: "03",
    title: "Compra Seguro",
    description: "Realiza pagos protegidos con nuestro sistema de escrow y garantías de calidad.",
    icon: ShoppingCart,
    color: "bg-primary/10 text-primary",
  },
  {
    step: "04",
    title: "Recibe tu Pedido",
    description: "Seguimiento en tiempo real de tu envío hasta la entrega en tu ubicación.",
    icon: Truck,
    color: "bg-secondary/10 text-secondary",
  },
]

export function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-3xl lg:text-4xl text-foreground mb-4">¿Cómo Funciona?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conectamos el campo colombiano con compradores de todo el país en 4 simples pasos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={step.step} className="relative">
                <Card className="text-center h-full border-2 hover:border-primary/20 transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <div
                        className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="h-8 w-8" />
                      </div>
                      <div className="font-montserrat font-black text-4xl text-muted-foreground/30 mb-2">
                        {step.step}
                      </div>
                    </div>
                    <h3 className="font-montserrat font-semibold text-xl mb-3">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </CardContent>
                </Card>
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border transform -translate-y-1/2 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-xl">¿Listo para comenzar?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Registrarse como Comprador
              </Button>
              <Button size="lg" variant="outline">
                Registrarse como Productor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
