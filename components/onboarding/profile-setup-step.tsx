"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Bell, Mail, MessageSquare } from "lucide-react"

interface ProfileSetupStepProps {
  onComplete: (data: any) => void
}

export function ProfileSetupStep({ onComplete }: ProfileSetupStepProps) {
  const [formData, setFormData] = useState({
    profileImage: null as File | null,
    bio: "",
    specialties: "",
    notifications: {
      email: true,
      sms: false,
      push: true,
      marketing: false,
    },
    privacy: {
      showEmail: false,
      showPhone: false,
      showLocation: true,
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const handleImageUpload = (file: File) => {
    setFormData({ ...formData, profileImage: file })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Profile Image */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Foto de Perfil</CardTitle>
          <CardDescription>Agrega una foto para que otros usuarios te reconozcan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={formData.profileImage ? URL.createObjectURL(formData.profileImage) : undefined} />
              <AvatarFallback className="text-lg">
                <Camera className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleImageUpload(file)
                }}
                className="hidden"
                id="profile-image"
              />
              <Label htmlFor="profile-image">
                <Button variant="outline" size="sm" asChild>
                  <span>Subir foto</span>
                </Button>
              </Label>
              <p className="text-xs text-muted-foreground">JPG, PNG hasta 2MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio and Specialties */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bio">Biografía</Label>
          <Textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Cuéntanos sobre ti, tu experiencia en el sector agropecuario..."
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="specialties">Especialidades</Label>
          <Input
            id="specialties"
            value={formData.specialties}
            onChange={(e) => setFormData({ ...formData, specialties: e.target.value })}
            placeholder="Ej: Café orgánico, Aguacate Hass, Ganadería sostenible"
          />
        </div>
      </div>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Preferencias de Notificaciones
          </CardTitle>
          <CardDescription>Configura cómo quieres recibir notificaciones</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label>Notificaciones por email</Label>
                <p className="text-sm text-muted-foreground">Pedidos, mensajes y actualizaciones</p>
              </div>
            </div>
            <Switch
              checked={formData.notifications.email}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, email: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label>Notificaciones SMS</Label>
                <p className="text-sm text-muted-foreground">Solo para pedidos urgentes</p>
              </div>
            </div>
            <Switch
              checked={formData.notifications.sms}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, sms: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div>
                <Label>Notificaciones push</Label>
                <p className="text-sm text-muted-foreground">En la aplicación web</p>
              </div>
            </div>
            <Switch
              checked={formData.notifications.push}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, push: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing y ofertas</Label>
              <p className="text-sm text-muted-foreground">Promociones y noticias del sector</p>
            </div>
            <Switch
              checked={formData.notifications.marketing}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  notifications: { ...formData.notifications, marketing: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Configuración de Privacidad</CardTitle>
          <CardDescription>Controla qué información es visible para otros usuarios</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Mostrar email en perfil</Label>
              <p className="text-sm text-muted-foreground">Otros usuarios podrán ver tu email</p>
            </div>
            <Switch
              checked={formData.privacy.showEmail}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  privacy: { ...formData.privacy, showEmail: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mostrar teléfono en perfil</Label>
              <p className="text-sm text-muted-foreground">Otros usuarios podrán ver tu teléfono</p>
            </div>
            <Switch
              checked={formData.privacy.showPhone}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  privacy: { ...formData.privacy, showPhone: checked },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Mostrar ubicación</Label>
              <p className="text-sm text-muted-foreground">Departamento y ciudad en tu perfil</p>
            </div>
            <Switch
              checked={formData.privacy.showLocation}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  privacy: { ...formData.privacy, showLocation: checked },
                })
              }
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        Completar Configuración
      </Button>
    </form>
  )
}
