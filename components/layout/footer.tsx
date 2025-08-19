import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">M</span>
              </div>
              <span className="font-montserrat font-bold text-xl">MisCosechas</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              El marketplace líder en productos agropecuarios de Colombia. Conectamos productores con compradores de
              manera segura y eficiente.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-lg">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <Link href="/categorias" className="block text-muted-foreground hover:text-foreground">
                Categorías
              </Link>
              <Link href="/productores" className="block text-muted-foreground hover:text-foreground">
                Productores
              </Link>
              <Link href="/ofertas" className="block text-muted-foreground hover:text-foreground">
                Ofertas
              </Link>
              <Link href="/rfq" className="block text-muted-foreground hover:text-foreground">
                Cotizaciones
              </Link>
              <Link href="/logistica" className="block text-muted-foreground hover:text-foreground">
                Logística
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-lg">Soporte</h3>
            <div className="space-y-2">
              <Link href="/ayuda" className="block text-muted-foreground hover:text-foreground">
                Centro de Ayuda
              </Link>
              <Link href="/contacto" className="block text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
              <Link href="/terminos" className="block text-muted-foreground hover:text-foreground">
                Términos y Condiciones
              </Link>
              <Link href="/privacidad" className="block text-muted-foreground hover:text-foreground">
                Política de Privacidad
              </Link>
              <Link href="/disputas" className="block text-muted-foreground hover:text-foreground">
                Resolución de Disputas
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-montserrat font-semibold text-lg">Mantente Informado</h3>
            <p className="text-muted-foreground text-sm">
              Recibe las últimas noticias del sector agropecuario y ofertas especiales.
            </p>
            <div className="space-y-2">
              <Input type="email" placeholder="Tu correo electrónico" className="w-full" />
              <Button className="w-full bg-primary hover:bg-primary/90">Suscribirse</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Email</div>
              <div className="text-muted-foreground text-sm">contacto@miscosechas.com</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Phone className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <div className="font-semibold">Teléfono</div>
              <div className="text-muted-foreground text-sm">+57 1 234 5678</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-semibold">Ubicación</div>
              <div className="text-muted-foreground text-sm">Bogotá, Colombia</div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">© 2024 MisCosechas.com. Todos los derechos reservados.</div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Hecho con ❤️ en Colombia</span>
            <Link href="/sitemap" className="hover:text-foreground">
              Mapa del Sitio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
