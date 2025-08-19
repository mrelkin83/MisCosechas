"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  MapPin,
  Package,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  Calendar,
  CheckCircle,
  AlertCircle,
  Send,
} from "lucide-react"
import Link from "next/link"

export default function RFQDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("details")

  // Mock data - in real app, fetch based on params.id
  const rfq = {
    id: 1,
    title: "Aguacate Hass para exportación - 50 toneladas",
    category: "Frutas y Verduras",
    buyer: "Exportadora del Caribe",
    buyerRating: 4.8,
    buyerReviews: 156,
    location: "Atlántico, Barranquilla",
    quantity: "50 toneladas",
    budget: "$200,000,000 - $250,000,000",
    deadline: "2024-04-15",
    status: "active",
    quotations: 12,
    description:
      "Buscamos aguacate Hass de primera calidad para exportación a Europa. El producto debe cumplir con estándares internacionales y contar con certificación GlobalGAP. Necesitamos entrega programada en nuestras instalaciones en Barranquilla para posterior exportación.",
    requirements: ["Certificación GlobalGAP", "Calibre 14-18", "Empaque para exportación"],
    specifications:
      "Aguacate Hass con calibre entre 14-18 cm, grado de madurez 1-2, empaque en cajas de 4kg aptas para exportación. Análisis de residuos de pesticidas requerido.",
    deliveryTerms:
      "Entrega en nuestras instalaciones en Barranquilla, horario de 8:00 AM a 4:00 PM, de lunes a viernes.",
    paymentTerms: "Pago con garantía (escrow) - 50% al confirmar orden, 50% contra entrega",
    createdAt: "2024-03-20",
    closingDate: "2024-04-15",
  }

  const quotations = [
    {
      id: 1,
      producer: "Finca Los Andes",
      location: "Antioquia, Medellín",
      rating: 4.9,
      reviews: 87,
      price: 4200,
      unit: "kg",
      totalAmount: 210000000,
      deliveryTime: "7-10 días",
      message:
        "Contamos con aguacate Hass de primera calidad con certificación GlobalGAP. Podemos garantizar entrega puntual y calidad constante.",
      certifications: ["GlobalGAP", "Orgánico"],
      submittedAt: "2024-03-21",
      status: "pending",
    },
    {
      id: 2,
      producer: "Aguacates del Valle",
      location: "Valle del Cauca, Cali",
      rating: 4.7,
      reviews: 124,
      price: 4000,
      unit: "kg",
      totalAmount: 200000000,
      deliveryTime: "5-7 días",
      message: "Ofrecemos aguacate Hass premium con todas las certificaciones requeridas. Experiencia en exportación.",
      certifications: ["GlobalGAP", "BPA"],
      submittedAt: "2024-03-22",
      status: "pending",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Activa</Badge>
      case "closing-soon":
        return <Badge className="bg-yellow-100 text-yellow-800">Cierra Pronto</Badge>
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800">Cerrada</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const daysUntilDeadline = Math.ceil((new Date(rfq.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-montserrat font-bold text-3xl">{rfq.title}</h1>
                  {getStatusBadge(rfq.status)}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">{rfq.buyer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span>{rfq.buyer}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{rfq.buyerRating}</span>
                      <span>({rfq.buyerReviews})</span>
                    </div>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{rfq.location}</span>
                  </div>
                  <span>•</span>
                  <span>{rfq.category}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-2xl text-primary mb-1">{rfq.budget}</div>
                <div className="text-muted-foreground mb-2">{rfq.quantity}</div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{daysUntilDeadline > 0 ? `${daysUntilDeadline} días restantes` : "Plazo vencido"}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span className="font-semibold">{rfq.quotations}</span>
                <span className="text-muted-foreground">cotizaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Publicado:</span>
                <span>{new Date(rfq.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">Cierra:</span>
                <span>{new Date(rfq.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Detalles</TabsTrigger>
                  <TabsTrigger value="quotations">Cotizaciones ({quotations.length})</TabsTrigger>
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-6 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Descripción
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{rfq.description}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Especificaciones Técnicas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{rfq.specifications}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Requisitos y Certificaciones</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {rfq.requirements.map((req, index) => (
                          <Badge key={index} variant="outline">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Términos de Entrega
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{rfq.deliveryTerms}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5" />
                          Términos de Pago
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">{rfq.paymentTerms}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="quotations" className="mt-6">
                  <div className="space-y-4">
                    {quotations.map((quote) => (
                      <Card key={quote.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-10 h-10">
                                <AvatarFallback>{quote.producer.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-semibold">{quote.producer}</h3>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="h-3 w-3" />
                                  <span>{quote.location}</span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{quote.rating}</span>
                                    <span>({quote.reviews})</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-xl text-primary">
                                ${quote.totalAmount.toLocaleString()}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                ${quote.price.toLocaleString()} por {quote.unit}
                              </div>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4">{quote.message}</p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex flex-wrap gap-1">
                                {quote.certifications.map((cert) => (
                                  <Badge key={cert} variant="outline" className="text-xs">
                                    {cert}
                                  </Badge>
                                ))}
                              </div>
                              <div className="text-sm text-muted-foreground">Entrega: {quote.deliveryTime}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Ver Perfil
                              </Button>
                              <Button size="sm">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Contactar
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="mt-6">
                  <Card>
                    <CardContent className="p-6 text-center">
                      <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-lg mb-2">Chat no disponible</h3>
                      <p className="text-muted-foreground">El chat estará disponible después de recibir cotizaciones</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enviar Cotización</CardTitle>
                  <CardDescription>¿Puedes suministrar este producto?</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/rfq/${rfq.id}/cotizar`}>
                    <Button className="w-full">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Cotización
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen de la RFQ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cantidad:</span>
                    <span className="font-medium">{rfq.quantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Presupuesto:</span>
                    <span className="font-medium">{rfq.budget}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ubicación:</span>
                    <span className="font-medium">{rfq.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Fecha límite:</span>
                    <span className="font-medium">{new Date(rfq.deadline).toLocaleDateString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Cotizaciones:</span>
                    <span className="font-medium">{rfq.quotations}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sobre el Comprador</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{rfq.buyer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{rfq.buyer}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{rfq.buyerRating}</span>
                        <span className="text-muted-foreground">({rfq.buyerReviews} reseñas)</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    Ver Perfil Completo
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
