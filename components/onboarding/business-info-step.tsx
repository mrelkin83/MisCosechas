"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

interface BusinessInfoStepProps {
  onComplete: (data: any) => void
}

export function BusinessInfoStep({ onComplete }: BusinessInfoStepProps) {
  const [formData, setFormData] = useState({
    businessType: "",
    companyName: "",
    nit: "",
    businessSize: "",
    mainProducts: "",
    description: "",
    website: "",
    certifications: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const businessTypes = [
    "Productor Agrícola",
    "Ganadero",
    "Procesador de Alimentos",
    "Distribuidor",
    "Exportador",
    "Importador",
    "Cooperativa",
    "Asociación de Productores",
    "Otro",
  ]

  const businessSizes = [
    "Micro (1-10 empleados)",
    "Pequeña (11-50 empleados)",
    "Mediana (51-200 empleados)",
    "Grande (200+ empleados)",
  ]

  const availableCertifications = [
    "Orgánico",
    "Fair Trade",
    "GlobalGAP",
    "BPA (Buenas Prácticas Agrícolas)",
    "HACCP",
    "ISO 22000",
    "Rainforest Alliance",
    "UTZ Certified",
  ]

  const handleCertificationChange = (certification: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        certifications: [...formData.certifications, certification],
      })
    } else {
      setFormData({
        ...formData,
        certifications: formData.certifications.filter((c) => c !== certification),
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessType">Tipo de negocio *</Label>
          <Select
            value={formData.businessType}
            onValueChange={(value) => setFormData({ ...formData, businessType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona tu tipo de negocio" />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessSize">Tamaño de empresa</Label>
          <Select
            value={formData.businessSize}
            onValueChange={(value) => setFormData({ ...formData, businessSize: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tamaño" />
            </SelectTrigger>
            <SelectContent>
              {businessSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="companyName">Nombre de la empresa</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            placeholder="Agrícola Los Andes S.A.S."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="nit">NIT</Label>
          <Input
            id="nit"
            value={formData.nit}
            onChange={(e) => setFormData({ ...formData, nit: e.target.value })}
            placeholder="900123456-7"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mainProducts">Principales productos *</Label>
        <Input
          id="mainProducts"
          value={formData.mainProducts}
          onChange={(e) => setFormData({ ...formData, mainProducts: e.target.value })}
          placeholder="Ej: Café, Aguacate, Plátano"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descripción del negocio</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe tu negocio, experiencia y lo que ofreces..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Sitio web (opcional)</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          placeholder="https://www.tuempresa.com"
        />
      </div>

      {/* Certifications */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Certificaciones (opcional)</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableCertifications.map((certification) => (
            <div key={certification} className="flex items-center space-x-2">
              <Checkbox
                id={certification}
                checked={formData.certifications.includes(certification)}
                onCheckedChange={(checked) => handleCertificationChange(certification, checked as boolean)}
              />
              <Label htmlFor={certification} className="text-sm">
                {certification}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continuar
      </Button>
    </form>
  )
}
