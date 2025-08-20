"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export default function AdminDashboard() {
  const kpis = [
    { title: "GMV Total", value: "$2,450,000", change: "+12.5%", icon: "DollarSign", color: "text-green-600" },
    { title: "Take Rate", value: "3.2%", change: "+0.3%", icon: "TrendingUp", color: "text-blue-600" },
    { title: "Fill Rate RFQ", value: "78%", change: "+5.2%", icon: "CheckCircle", color: "text-emerald-600" },
    { title: "OTD (On Time Delivery)", value: "92%", change: "+2.1%", icon: "Clock", color: "text-amber-600" },
    { title: "Usuarios Activos", value: "1,247", change: "+18%", icon: "Users", color: "text-purple-600" },
    { title: "Disputas Activas", value: "23", change: "-15%", icon: "AlertTriangle", color: "text-red-600" },
  ]

  const recentOrders = [
    {
      id: "ORD-001",
      buyer: "Mercados del Campo",
      seller: "Finca La Esperanza",
      product: "Aguacate Hass",
      amount: "$125,000",
      status: "En tránsito",
    },
    {
      id: "ORD-002",
      buyer: "Distribuidora Norte",
      seller: "Café Premium Huila",
      product: "Café Especial",
      amount: "$89,500",
      status: "Entregado",
    },
    {
      id: "ORD-003",
      buyer: "Supermercados Unidos",
      seller: "Lácteos San José",
      product: "Leche Fresca",
      amount: "$45,200",
      status: "Procesando",
    },
  ]

  const pendingKyc = [
    {
      id: "KYC-001",
      name: "Agrícola Los Andes S.A.S",
      type: "Empresa",
      documents: "RUT, Cámara de Comercio",
      status: "Pendiente",
    },
    {
      id: "KYC-002",
      name: "María González",
      type: "Persona Natural",
      documents: "Cédula, Certificación Bancaria",
      status: "En revisión",
    },
    {
      id: "KYC-003",
      name: "Cooperativa Cafetera",
      type: "Cooperativa",
      documents: "Personería Jurídica",
      status: "Rechazado",
    },
  ]

  const renderIcon = (iconName: string, className: string) => {
    const iconProps = { className }
    switch (iconName) {
      case "DollarSign":
        return <DollarSign {...iconProps} />
      case "TrendingUp":
        return <TrendingUp {...iconProps} />
      case "CheckCircle":
        return <CheckCircle {...iconProps} />
      case "Clock":
        return <Clock {...iconProps} />
      case "Users":
        return <Users {...iconProps} />
      case "AlertTriangle":
        return <AlertTriangle {...iconProps} />
      default:
        return <DollarSign {...iconProps} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              Admin Master
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPIs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{kpi.title}</CardTitle>
                {renderIcon(kpi.icon, `h-4 w-4 ${kpi.color}`)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className={`text-xs ${kpi.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                  {kpi.change} vs mes anterior
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="products">Productos</TabsTrigger>
            <TabsTrigger value="orders">Órdenes</TabsTrigger>
            <TabsTrigger value="kyc">KYC</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Órdenes Recientes</CardTitle>
                  <CardDescription>Últimas transacciones en la plataforma</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-600">
                            {order.buyer} → {order.seller}
                          </p>
                          <p className="text-sm text-gray-500">{order.product}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.amount}</p>
                          <Badge variant={order.status === "Entregado" ? "default" : "secondary"}>{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>KYC Pendientes</CardTitle>
                  <CardDescription>Verificaciones que requieren atención</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingKyc.map((kyc) => (
                      <div key={kyc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{kyc.name}</p>
                          <p className="text-sm text-gray-600">{kyc.type}</p>
                          <p className="text-sm text-gray-500">{kyc.documents}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              kyc.status === "Pendiente"
                                ? "destructive"
                                : kyc.status === "En revisión"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {kyc.status}
                          </Badge>
                          <div className="mt-2 space-x-2">
                            <Button size="sm" variant="outline">
                              Ver
                            </Button>
                            {kyc.status !== "Rechazado" && <Button size="sm">Aprobar</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Usuarios</CardTitle>
                <CardDescription>Administrar usuarios, roles y permisos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Usuarios Registrados: 1,247</h3>
                    <Button>Exportar Lista</Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">892</div>
                        <p className="text-sm text-gray-600">Compradores</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">345</div>
                        <p className="text-sm text-gray-600">Productores</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-purple-600">10</div>
                        <p className="text-sm text-gray-600">Administradores</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Productos</CardTitle>
                <CardDescription>Administrar catálogo y publicaciones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Productos Activos: 2,156</h3>
                    <Button>Agregar Categoría</Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">1,234</div>
                        <p className="text-sm text-gray-600">Frutas y Verduras</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-amber-600">456</div>
                        <p className="text-sm text-gray-600">Granos y Cereales</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">234</div>
                        <p className="text-sm text-gray-600">Lácteos</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">232</div>
                        <p className="text-sm text-gray-600">Cárnicos</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Órdenes</CardTitle>
                <CardDescription>Monitorear transacciones y disputas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <p className="text-sm text-gray-600">Órdenes Activas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">1,892</div>
                        <p className="text-sm text-gray-600">Completadas</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">23</div>
                        <p className="text-sm text-gray-600">En Disputa</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-amber-600">$2.4M</div>
                        <p className="text-sm text-gray-600">En Escrow</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kyc" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión KYC</CardTitle>
                <CardDescription>Verificación de identidad y documentos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-amber-600">45</div>
                        <p className="text-sm text-gray-600">Pendientes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-green-600">1,156</div>
                        <p className="text-sm text-gray-600">Aprobados</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="text-2xl font-bold text-red-600">46</div>
                        <p className="text-sm text-gray-600">Rechazados</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
                <CardDescription>Comisiones, membresías y configuraciones generales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Comisiones por Categoría</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Frutas y Verduras</span>
                        <Badge>2.5%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Granos y Cereales</span>
                        <Badge>3.0%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Lácteos</span>
                        <Badge>3.5%</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Cárnicos</span>
                        <Badge>4.0%</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Membresías Activas</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-gray-600">892</div>
                          <p className="text-sm text-gray-600">Básica (Gratis)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-blue-600">234</div>
                          <p className="text-sm text-gray-600">Premium ($50/mes)</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="text-2xl font-bold text-purple-600">121</div>
                          <p className="text-sm text-gray-600">Enterprise ($200/mes)</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
