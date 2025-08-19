"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, MapPin, Truck, Shield, Clock, AlertCircle, Store } from "lucide-react"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("escrow")
  const [deliveryMethod, setDeliveryMethod] = useState("pickup")
  const [formData, setFormData] = useState({
    // Delivery Info
    fullName: "",
    phone: "",
    email: "",
    company: "",
    address: "",
    city: "",
    department: "",
    postalCode: "",
    deliveryNotes: "",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    // Terms
    acceptTerms: false,
    acceptEscrow: false,
  })

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: "Aguacate Hass Premium",
      producer: "Finca Los Andes",
      location: "Antioquia, Medellín",
      price: 4500,
      quantity: 150,
      unit: "kg",
      total: 675000,
      deliveryTime: "7-10 días",
    },
    {
      id: 2,
      name: "Café Especial Huila",
      producer: "Cooperativa Café del Sur",
      location: "Huila, Pitalito",
      price: 18000,
      quantity: 75,
      unit: "kg",
      total: 1350000,
      deliveryTime: "5-7 días",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.total, 0)
  const platformFee = subtotal * 0.035
  const shippingCost = deliveryMethod === "delivery" ? 150000 : 0
  const escrowFee = paymentMethod === "escrow" ? subtotal * 0.02 : 0
  const total = subtotal + platformFee + shippingCost + escrowFee

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Process payment and create order
    console.log("Processing order:", { formData, cartItems, total })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-montserrat font-bold text-3xl mb-2">Checkout</h1>
            <p className="text-muted-foreground">Completa tu pedido de forma segura</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Delivery Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Información de Entrega
                    </CardTitle>
                    <CardDescription>¿Dónde quieres recibir tu pedido?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Nombre completo *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa (opcional)</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Dirección completa *</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="Calle, número, barrio, referencias..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Departamento *</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccionar" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="antioquia">Antioquia</SelectItem>
                            <SelectItem value="bogota">Bogotá D.C.</SelectItem>
                            <SelectItem value="valle">Valle del Cauca</SelectItem>
                            <SelectItem value="cundinamarca">Cundinamarca</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryNotes">Notas de entrega (opcional)</Label>
                      <Textarea
                        id="deliveryNotes"
                        value={formData.deliveryNotes}
                        onChange={(e) => setFormData({ ...formData, deliveryNotes: e.target.value })}
                        placeholder="Instrucciones especiales, horarios preferidos..."
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Método de Entrega
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          deliveryMethod === "pickup" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setDeliveryMethod("pickup")}
                      >
                        <div className="flex items-center gap-3">
                          <Store className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Recoger en Finca</div>
                            <div className="text-sm text-muted-foreground">Gratis</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          deliveryMethod === "delivery" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setDeliveryMethod("delivery")}
                      >
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5" />
                          <div>
                            <div className="font-semibold">Entrega a Domicilio</div>
                            <div className="text-sm text-muted-foreground">$150.000</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Método de Pago
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="escrow">Pago con Garantía</TabsTrigger>
                        <TabsTrigger value="direct">Pago Directo</TabsTrigger>
                      </TabsList>

                      <TabsContent value="escrow" className="mt-4 space-y-4">
                        <Alert>
                          <Shield className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Pago Seguro con Escrow:</strong> Tu dinero se mantiene seguro hasta que recibas y
                            apruebes los productos. Comisión adicional del 2%.
                          </AlertDescription>
                        </Alert>

                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Número de tarjeta</Label>
                              <Input
                                id="cardNumber"
                                placeholder="1234 5678 9012 3456"
                                value={formData.cardNumber}
                                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardName">Nombre en la tarjeta</Label>
                              <Input
                                id="cardName"
                                value={formData.cardName}
                                onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Fecha de vencimiento</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/AA"
                                value={formData.expiryDate}
                                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={formData.cvv}
                                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="direct" className="mt-4">
                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Pago Directo:</strong> El pago se procesa inmediatamente al productor. Sin
                            protección adicional.
                          </AlertDescription>
                        </Alert>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                {/* Terms and Conditions */}
                <Card>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: checked as boolean })}
                      />
                      <Label htmlFor="acceptTerms" className="text-sm">
                        Acepto los{" "}
                        <a href="/terminos" className="text-primary hover:underline">
                          términos y condiciones
                        </a>{" "}
                        y la{" "}
                        <a href="/privacidad" className="text-primary hover:underline">
                          política de privacidad
                        </a>
                      </Label>
                    </div>
                    {paymentMethod === "escrow" && (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptEscrow"
                          checked={formData.acceptEscrow}
                          onCheckedChange={(checked) => setFormData({ ...formData, acceptEscrow: checked as boolean })}
                        />
                        <Label htmlFor="acceptEscrow" className="text-sm">
                          Entiendo y acepto el funcionamiento del sistema de pago con garantía (escrow)
                        </Label>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <Card className="sticky top-4">
                  <CardHeader>
                    <CardTitle>Resumen del Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-start text-sm">
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-muted-foreground">{item.producer}</div>
                            <div className="text-muted-foreground">
                              {item.quantity} {item.unit} × ${item.price.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {item.deliveryTime}
                            </div>
                          </div>
                          <div className="font-medium">${item.total.toLocaleString()}</div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Comisión plataforma (3.5%):</span>
                        <span>${platformFee.toLocaleString()}</span>
                      </div>
                      {deliveryMethod === "delivery" && (
                        <div className="flex justify-between">
                          <span>Envío:</span>
                          <span>${shippingCost.toLocaleString()}</span>
                        </div>
                      )}
                      {paymentMethod === "escrow" && (
                        <div className="flex justify-between">
                          <span>Comisión escrow (2%):</span>
                          <span>${escrowFee.toLocaleString()}</span>
                        </div>
                      )}
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-primary">${total.toLocaleString()}</span>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={!formData.acceptTerms || (paymentMethod === "escrow" && !formData.acceptEscrow)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Confirmar Pedido
                    </Button>

                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>✓ Pago 100% seguro</p>
                      <p>✓ Productos verificados</p>
                      <p>✓ Garantía de calidad</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
