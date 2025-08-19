import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function WalletPage() {
  const balance = {
    available: 2450000,
    pending: 125000,
    total: 2575000,
  }

  const transactions = [
    {
      id: "TXN-001",
      type: "Venta",
      description: "Venta de Aguacate Hass - ORD-001",
      amount: 125000,
      fee: 3125,
      net: 121875,
      status: "Completado",
      date: "2024-01-20",
    },
    {
      id: "TXN-002",
      type: "Payout",
      description: "Retiro a cuenta bancaria",
      amount: -50000,
      fee: 2500,
      net: -52500,
      status: "Procesando",
      date: "2024-01-19",
    },
    {
      id: "TXN-003",
      type: "Venta",
      description: "Venta de Café Premium - ORD-002",
      amount: 89500,
      fee: 2685,
      net: 86815,
      status: "Pendiente",
      date: "2024-01-18",
    },
  ]

  const payoutRequests = [
    {
      id: "PAY-001",
      amount: 50000,
      bankAccount: "****1234",
      status: "Procesando",
      requestDate: "2024-01-19",
      estimatedDate: "2024-01-22",
    },
    {
      id: "PAY-002",
      amount: 100000,
      bankAccount: "****5678",
      status: "Completado",
      requestDate: "2024-01-15",
      estimatedDate: "2024-01-18",
    },
  ]

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <Wallet className="h-6 w-6 text-amber-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Mi Wallet</h1>
        </div>
      </div>

      <div className="p-6">
        {/* Balance Cards */}
        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saldo Disponible</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(balance.available)}</div>
              <p className="text-xs text-gray-600">Listo para retirar</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saldo Pendiente</CardTitle>
              <Clock className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">{formatCurrency(balance.pending)}</div>
              <p className="text-xs text-gray-600">En proceso de liberación</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Saldo Total</CardTitle>
              <Wallet className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(balance.total)}</div>
              <p className="text-xs text-gray-600">Disponible + Pendiente</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transactions">Transacciones</TabsTrigger>
            <TabsTrigger value="payouts">Retiros</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Historial de Transacciones</CardTitle>
                    <CardDescription>Todas tus ventas y movimientos</CardDescription>
                  </div>
                  <Button variant="outline">Exportar</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transacción</TableHead>
                      <TableHead>Monto Bruto</TableHead>
                      <TableHead>Comisión</TableHead>
                      <TableHead>Monto Neto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {transaction.type === "Venta" ? (
                              <ArrowDownLeft className="h-4 w-4 text-green-600 mr-2" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-blue-600 mr-2" />
                            )}
                            <div>
                              <div className="font-medium">{transaction.id}</div>
                              <div className="text-sm text-gray-500">{transaction.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                          {formatCurrency(Math.abs(transaction.amount))}
                        </TableCell>
                        <TableCell className="text-red-600">-{formatCurrency(transaction.fee)}</TableCell>
                        <TableCell
                          className={transaction.net > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}
                        >
                          {formatCurrency(transaction.net)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Completado"
                                ? "default"
                                : transaction.status === "Procesando"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{transaction.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Retiros</CardTitle>
                    <CardDescription>Solicitar y gestionar retiros a tu cuenta bancaria</CardDescription>
                  </div>
                  <Button>Solicitar Retiro</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium text-blue-900">Información de Retiros</p>
                        <p className="text-sm text-blue-700">
                          Los retiros se procesan en 1-3 días hábiles. Monto mínimo: {formatCurrency(50000)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Retiro</TableHead>
                      <TableHead>Monto</TableHead>
                      <TableHead>Cuenta Destino</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Fecha Solicitud</TableHead>
                      <TableHead>Fecha Estimada</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payoutRequests.map((payout) => (
                      <TableRow key={payout.id}>
                        <TableCell className="font-medium">{payout.id}</TableCell>
                        <TableCell className="font-medium">{formatCurrency(payout.amount)}</TableCell>
                        <TableCell>{payout.bankAccount}</TableCell>
                        <TableCell>
                          <Badge variant={payout.status === "Completado" ? "default" : "secondary"}>
                            {payout.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">{payout.requestDate}</TableCell>
                        <TableCell className="text-sm text-gray-600">{payout.estimatedDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
