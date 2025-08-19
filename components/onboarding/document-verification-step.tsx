"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

interface DocumentVerificationStepProps {
  onComplete: (data: any) => void
}

export function DocumentVerificationStep({ onComplete }: DocumentVerificationStepProps) {
  const [formData, setFormData] = useState({
    documentType: "cedula",
    documentNumber: "",
    documents: {
      id: null as File | null,
      rut: null as File | null,
      bankCertification: null as File | null,
    },
  })

  const [uploadStatus, setUploadStatus] = useState({
    id: "pending",
    rut: "pending",
    bankCertification: "pending",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete(formData)
  }

  const handleFileUpload = (documentType: keyof typeof formData.documents, file: File) => {
    setFormData({
      ...formData,
      documents: {
        ...formData.documents,
        [documentType]: file,
      },
    })
    setUploadStatus({
      ...uploadStatus,
      [documentType]: "uploaded",
    })
  }

  const DocumentUpload = ({
    type,
    title,
    description,
    required = false,
  }: {
    type: keyof typeof formData.documents
    title: string
    description: string
    required?: boolean
  }) => {
    const status = uploadStatus[type]
    const file = formData.documents[type]

    return (
      <Card className="border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {title}
                {required && <span className="text-destructive">*</span>}
              </CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
            {status === "uploaded" && <CheckCircle className="h-6 w-6 text-secondary" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {file ? file.name : "Arrastra tu archivo aquí o haz clic para seleccionar"}
                </p>
                <Input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0]
                    if (selectedFile) {
                      handleFileUpload(type, selectedFile)
                    }
                  }}
                  className="hidden"
                  id={`file-${type}`}
                />
                <Label htmlFor={`file-${type}`} className="cursor-pointer">
                  <Button variant="outline" size="sm" asChild>
                    <span>Seleccionar archivo</span>
                  </Button>
                </Label>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Formatos aceptados: PDF, JPG, PNG. Tamaño máximo: 5MB</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Para cumplir con las regulaciones KYC (Know Your Customer), necesitamos verificar tu identidad. Todos los
          documentos son tratados de forma confidencial y segura.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="documentNumber">Número de documento *</Label>
        <Input
          id="documentNumber"
          value={formData.documentNumber}
          onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
          placeholder="12345678"
          required
        />
      </div>

      <div className="space-y-6">
        <DocumentUpload
          type="id"
          title="Documento de Identidad"
          description="Cédula de ciudadanía, cédula de extranjería o pasaporte"
          required
        />

        <DocumentUpload
          type="rut"
          title="RUT (Registro Único Tributario)"
          description="Documento expedido por la DIAN para personas naturales o jurídicas"
          required
        />

        <DocumentUpload
          type="bankCertification"
          title="Certificación Bancaria"
          description="Certificación de cuenta bancaria para pagos y transferencias"
        />
      </div>

      <Alert>
        <AlertDescription>
          Una vez subidos los documentos, nuestro equipo los revisará en un plazo de 24-48 horas. Te notificaremos por
          correo electrónico sobre el estado de la verificación.
        </AlertDescription>
      </Alert>

      <Button type="submit" className="w-full" disabled={!formData.documents.id || !formData.documents.rut}>
        Continuar
      </Button>
    </form>
  )
}
