"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Package, MapPin, Clock, Truck, CheckCircle, AlertCircle } from "lucide-react"

interface TrackingEvent {
  date: string
  location: string
  event: string
  status: "completed" | "current" | "pending"
}

interface TrackingInfo {
  trackingNumber: string
  orderId: string
  carrier: string
  status: "pending" | "picked-up" | "in-transit" | "out-for-delivery" | "delivered" | "exception"
  currentLocation: string
  destination: string
  estimatedDelivery: string
  progress: number
  events: TrackingEvent[]
}

interface TrackingWidgetProps {
  trackingNumber?: string
  compact?: boolean
}

export function TrackingWidget({ trackingNumber: initialTrackingNumber = "", compact = false }: TrackingWidgetProps) {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingNumber)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const mockTrackingData: Record<string, TrackingInfo> = {
    "TRK-2024-001": {
      trackingNumber: "TRK-2024-001",
      orderId: "ORD-2024-001",
      carrier: "Transportes Agro",
      status: "in-transit",
      currentLocation: "Bucaramanga, Santander",
      destination: "Barranquilla, Atlántico",
      estimatedDelivery: "2024-03-25",
      progress: 65,
      events: [
        { date: "2024-03-22 08:00", location: "Medellín, Antioquia", event: "Paquete recogido", status: "completed" },
        {
          date: "2024-03-22 14:30",
          location: "Medellín, Antioquia",
          event: "En centro de distribución",
          status: "completed",
        },
        { date: "2024-03-23 09:15", location: "Bogotá, D.C.", event: "En tránsito", status: "completed" },
        { date: "2024-03-23 18:45", location: "Bucaramanga, Santander", event: "En tránsito", status: "current" },
        { date: "", location: "Barranquilla, Atlántico", event: "Fuera para entrega", status: "pending" },
        { date: "", location: "Barranquilla, Atlántico", event: "Entregado", status: "pending" },
      ],
    },
    "TRK-2024-002": {
      trackingNumber: "TRK-2024-002",
      orderId: "ORD-2024-003",
      carrier: "LogiCampo",
      status: "delivered",
      currentLocation: "Zipaquirá, Cundinamarca",
      destination: "Zipaquirá, Cundinamarca",
      estimatedDelivery: "2024-03-20",
      progress: 100,
      events: [
        {
          date: "2024-03-18 10:00",
          location: "Zipaquirá, Cundinamarca",
          event: "Paquete recogido",
          status: "completed",
        },
        {
          date: "2024-03-18 16:30",
          location: "Zipaquirá, Cundinamarca",
          event: "Fuera para entrega",
          status: "completed",
        },
        { date: "2024-03-18 18:15", location: "Zipaquirá, Cundinamarca", event: "Entregado", status: "completed" },
      ],
    },
  }

  const getStatusConfig = (status: TrackingInfo["status"]) => {
    const configs = {
      pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      "picked-up": { label: "Recogido", color: "bg-blue-100 text-blue-800", icon: Package },
      "in-transit": { label: "En Tránsito", color: "bg-purple-100 text-purple-800", icon: Truck },
      "out-for-delivery": { label: "Fuera para Entrega", color: "bg-orange-100 text-orange-800", icon: Truck },
      delivered: { label: "Entregado", color: "bg-green-100 text-green-800", icon: CheckCircle },
      exception: { label: "Excepción", color: "bg-red-100 text-red-800", icon: AlertCircle },
    }
    return configs[status]
  }

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setError("Por favor ingresa un número de seguimiento")
      return
    }

    setIsLoading(true)
    setError("")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const data = mockTrackingData[trackingNumber.trim()]
    if (data) {
      setTrackingInfo(data)
    } else {
      setError("Número de seguimiento no encontrado")
      setTrackingInfo(null)
    }

    setIsLoading(false)
  }

  if (compact && trackingInfo) {
    const statusConfig = getStatusConfig(trackingInfo.status)
    const StatusIcon = statusConfig.icon

    return (
      <Card className="w-full">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StatusIcon className="h-4 w-4" />
              <span className="font-semibold text-sm">{trackingInfo.trackingNumber}</span>
            </div>
            <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-3 w-3 text-muted-foreground" />
              <span>{trackingInfo.currentLocation}</span>
            </div>
            <Progress value={trackingInfo.progress} className="h-1" />
            <div className="text-xs text-muted-foreground">
              Entrega estimada: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Rastrear Envío
          </CardTitle>
          <CardDescription>Ingresa tu número de seguimiento para ver el estado actual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Número de seguimiento (ej: TRK-2024-001)"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === "Enter" && handleTrack()}
            />
            <Button onClick={handleTrack} disabled={isLoading}>
              {isLoading ? "Buscando..." : "Rastrear"}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive mt-2">{error}</p>}
        </CardContent>
      </Card>

      {trackingInfo && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-3">
                  <span>{trackingInfo.trackingNumber}</span>
                  <Badge className={getStatusConfig(trackingInfo.status).color}>
                    {getStatusConfig(trackingInfo.status).label}
                  </Badge>
                </CardTitle>
                <CardDescription>
                  Pedido: {trackingInfo.orderId} • {trackingInfo.carrier}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="font-semibold">{trackingInfo.progress}%</div>
                <div className="text-sm text-muted-foreground">Completado</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Status */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="font-semibold">Ubicación Actual</span>
                </div>
                <div className="text-sm text-muted-foreground">Destino: {trackingInfo.destination}</div>
              </div>
              <div className="text-lg font-semibold">{trackingInfo.currentLocation}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <Clock className="h-4 w-4" />
                <span>Entrega estimada: {new Date(trackingInfo.estimatedDelivery).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso del envío</span>
                <span>{trackingInfo.progress}%</span>
              </div>
              <Progress value={trackingInfo.progress} className="h-2" />
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h3 className="font-semibold">Historial de Seguimiento</h3>
              <div className="space-y-3">
                {trackingInfo.events.map((event, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                        event.status === "completed"
                          ? "bg-green-500"
                          : event.status === "current"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{event.event}</div>
                        {event.date && (
                          <div className="text-sm text-muted-foreground">{new Date(event.date).toLocaleString()}</div>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">{event.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" className="flex-1 bg-transparent">
                Contactar Transportista
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Reportar Problema
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
