import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, TrendingUp, Shield, Truck } from "lucide-react"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-montserrat font-black text-4xl lg:text-6xl text-foreground leading-tight">
                El Marketplace
                <span className="text-primary block">Agropecuario</span>
                de Colombia
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Conectamos productores con compradores de manera directa, segura y eficiente. Encuentra los mejores
                productos agrícolas colombianos o vende tus cosechas al mejor precio.
              </p>
            </div>

            {/* Search CTA */}
            <div className="bg-card p-6 rounded-xl border shadow-sm">
              <h3 className="font-montserrat font-semibold text-lg mb-4">¿Qué estás buscando hoy?</h3>
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input type="search" placeholder="Ej: Café, Aguacate, Plátano..." className="h-12 text-base" />
                </div>
                <Button size="lg" className="px-8 bg-primary hover:bg-primary/90">
                  <Search className="h-5 w-5 mr-2" />
                  Buscar
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Mejores Precios</h4>
                <p className="text-xs text-muted-foreground">Directamente del productor</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <h4 className="font-semibold text-sm">Pagos Seguros</h4>
                <p className="text-xs text-muted-foreground">Protección garantizada</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">Logística</h4>
                <p className="text-xs text-muted-foreground">Entrega confiable</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
              <img
                src="/colombian-farmers-market.png"
                alt="Productos agropecuarios colombianos"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating stats */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="font-montserrat font-bold text-2xl text-primary">5,000+</div>
                <div className="text-sm text-muted-foreground">Productores</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 bg-card p-4 rounded-xl shadow-lg border">
              <div className="text-center">
                <div className="font-montserrat font-bold text-2xl text-secondary">50,000+</div>
                <div className="text-sm text-muted-foreground">Productos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
