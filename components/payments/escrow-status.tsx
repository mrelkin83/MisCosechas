"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Clock, CheckCircle, AlertTriangle, DollarSign } from "lucide-react"

interface EscrowStatusProps {
  orderId: string
  status: "pending" | "funded" | "held" | "released" | "disputed" | "refunded"
  amount: number
  createdAt: string
  releaseDate?: string
  disputeReason?: string
  milestones?: {
    id: string
    name: string
    amount: number
    status: "pending" | "completed" | "released"
    dueDate: string
  }[]
}

export function EscrowStatus({
  orderId,
  status,
  amount,
  createdAt,
  releaseDate,
  disputeReason,
  milestones = [],
}: EscrowStatusProps) {
  const getStatusConfig = (status: EscrowStatusProps["status"]) => {
    const configs = {
      pending: {
        label: "Pendiente de Fondeo",
        description: "Esperando confirmación del pago",
        color: "bg-yellow-100 text-yellow-800",
        icon: Clock,
        progress: 20,
      },
      funded: {
        label: "Fondeado",
        description: "Fondos recibidos y seguros",
        color: "bg-blue-100 text-blue-800",
        icon: Shield,
        progress: 40,
      },
      held: {
        label: "Fondos Retenidos",
        description: "Fondos seguros hasta completar la transacción",
        color: "bg-blue-100 text-blue-800",
        icon: Shield,
        progress: 60,
      },
      released: {
        label: "Fondos Liberados",
        description: "Pago completado exitosamente",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
        progress: 100,
      },
      disputed: {
        label: "En Disputa",
        description: "Transacción bajo revisión",
        color: "bg-red-100 text-red-800",
        icon: AlertTriangle,
        progress: 60,
      },
      refunded: {
        label: "Reembolsado",
        description: "Fondos devueltos al comprador",
        color: "bg-gray-100 text-gray-800",
        icon: DollarSign,
        progress: 100,
      },
    }
    return configs[status]
  }

  const statusConfig = getStatusConfig(status)
  const StatusIcon = statusConfig.icon

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <StatusIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Estado del Escrow
                  <Badge className={statusConfig.color}>{statusConfig.label}</Badge>
                </CardTitle>
                <CardDescription>{statusConfig.description}</CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-2xl text-primary">${amount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Monto total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progreso de la transacción</span>
              <span>{statusConfig.progress}%</span>
            </div>
            <Progress value={statusConfig.progress} className="h-2" />
          </div>

          {/* Timeline */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Cronología:</div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Escrow creado: {new Date(createdAt).toLocaleDateString()}</span>
              </div>
              {status !== "pending" && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fondos recibidos y asegurados</span>
                </div>
              )}
              {status === "released" && releaseDate && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Fondos liberados: {new Date(releaseDate).toLocaleDateString()}</span>
                </div>
              )}
              {status === "disputed" && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Disputa iniciada</span>
                </div>
              )}
            </div>
          </div>

          {/* Actions based on status */}
          <div className="flex gap-2 pt-4 border-t">
            {status === "held" && (
              <>
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Confirmar Recepción
                </Button>
                <Button variant="outline" className="text-red-600 border-red-600 bg-transparent">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Reportar Problema
                </Button>
              </>
            )}
            {status === "disputed" && (
              <Button variant="outline" className="w-full bg-transparent">
                Ver Detalles de la Disputa
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Milestones (for complex orders) */}
      {milestones.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hitos de Pago</CardTitle>
            <CardDescription>Pagos escalonados según el progreso del pedido</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        milestone.status === "completed"
                          ? "bg-green-500"
                          : milestone.status === "released"
                            ? "bg-blue-500"
                            : "bg-gray-300"
                      }`}
                    ></div>
                    <div>
                      <div className="font-medium">{milestone.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Vence: {new Date(milestone.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${milestone.amount.toLocaleString()}</div>
                    <Badge
                      variant={
                        milestone.status === "completed"
                          ? "default"
                          : milestone.status === "released"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {milestone.status === "completed"
                        ? "Completado"
                        : milestone.status === "released"
                          ? "Liberado"
                          : "Pendiente"}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dispute Information */}
      {status === "disputed" && disputeReason && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Razón de la disputa:</strong> {disputeReason}
            <br />
            Nuestro equipo está revisando el caso y se pondrá en contacto contigo en las próximas 24 horas.
          </AlertDescription>
        </Alert>
      )}

      {/* Security Information */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-900">Protección del Comprador</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>✓ Tus fondos están protegidos hasta que confirmes la recepción</p>
            <p>✓ Puedes reportar problemas en cualquier momento</p>
            <p>✓ Mediación gratuita en caso de disputas</p>
            <p>✓ Reembolso completo si no se cumple lo acordado</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
