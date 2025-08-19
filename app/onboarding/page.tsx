"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { PersonalInfoStep } from "@/components/onboarding/personal-info-step"
import { BusinessInfoStep } from "@/components/onboarding/business-info-step"
import { DocumentVerificationStep } from "@/components/onboarding/document-verification-step"
import { ProfileSetupStep } from "@/components/onboarding/profile-setup-step"
import { CheckCircle } from "lucide-react"

const steps = [
  { id: 1, title: "Información Personal", description: "Datos básicos de contacto" },
  { id: 2, title: "Información Comercial", description: "Detalles de tu negocio" },
  { id: 3, title: "Verificación de Documentos", description: "KYC y documentos legales" },
  { id: 4, title: "Configuración de Perfil", description: "Personaliza tu perfil" },
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [formData, setFormData] = useState({})

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100

  const handleStepComplete = (stepData: any) => {
    setFormData({ ...formData, ...stepData })
    setCompletedSteps([...completedSteps, currentStep])

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep onComplete={handleStepComplete} />
      case 2:
        return <BusinessInfoStep onComplete={handleStepComplete} />
      case 3:
        return <DocumentVerificationStep onComplete={handleStepComplete} />
      case 4:
        return <ProfileSetupStep onComplete={handleStepComplete} />
      default:
        return null
    }
  }

  if (completedSteps.length === steps.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="font-montserrat font-bold text-2xl mb-2">¡Bienvenido a MisCosechas!</h2>
            <p className="text-muted-foreground mb-6">
              Tu cuenta ha sido configurada exitosamente. Ya puedes comenzar a usar la plataforma.
            </p>
            <Button className="w-full" onClick={() => (window.location.href = "/dashboard")}>
              Ir al Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">M</span>
            </div>
            <span className="font-montserrat font-bold text-2xl">MisCosechas</span>
          </div>
          <h1 className="font-montserrat font-bold text-3xl mb-2">Configuración de Cuenta</h1>
          <p className="text-muted-foreground">
            Completa estos pasos para verificar tu cuenta y comenzar a usar la plataforma
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    completedSteps.includes(step.id)
                      ? "bg-secondary text-secondary-foreground"
                      : currentStep === step.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {completedSteps.includes(step.id) ? <CheckCircle className="h-4 w-4" /> : step.id}
                </div>
                {step.id < steps.length && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${completedSteps.includes(step.id) ? "bg-secondary" : "bg-muted"}`}
                  />
                )}
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current Step */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="font-montserrat font-bold">
              Paso {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
                Anterior
              </Button>
              <div className="text-sm text-muted-foreground">
                Paso {currentStep} de {steps.length}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
