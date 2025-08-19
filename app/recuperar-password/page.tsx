"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement password recovery logic
    setTimeout(() => {
      setIsLoading(false)
      setIsEmailSent(true)
    }, 2000)
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="border-2 text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
              <h2 className="font-montserrat font-bold text-2xl mb-2">Email Enviado</h2>
              <p className="text-muted-foreground mb-6">
                Hemos enviado las instrucciones para recuperar tu contraseña a <strong>{email}</strong>
              </p>
              <div className="space-y-3">
                <Button className="w-full" onClick={() => (window.location.href = "/login")}>
                  Volver al Login
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setIsEmailSent(false)}>
                  Enviar de nuevo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to login */}
        <div className="mb-6">
          <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al login
          </Link>
        </div>

        <Card className="border-2">
          <CardHeader className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <span className="font-montserrat font-bold text-2xl">MisCosechas</span>
            </div>
            <div>
              <CardTitle className="text-2xl font-montserrat font-bold">Recuperar Contraseña</CardTitle>
              <CardDescription className="mt-2">
                Ingresa tu correo electrónico y te enviaremos las instrucciones
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <Alert>
              <Mail className="h-4 w-4" />
              <AlertDescription>Te enviaremos un enlace seguro para restablecer tu contraseña.</AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="h-11"
                />
              </div>

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Enviando..." : "Enviar Instrucciones"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
