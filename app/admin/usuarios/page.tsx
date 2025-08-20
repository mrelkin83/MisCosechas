"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Download, UserPlus, MoreHorizontal } from "lucide-react"

export default function UsersManagement() {
  const users = [
    {
      id: "USR-001",
      name: "María González",
      email: "maria@fincalaesperanza.com",
      type: "Productor",
      status: "Activo",
      kyc: "Verificado",
      joinDate: "2024-01-15",
      lastActivity: "2024-01-20",
    },
    {
      id: "USR-002",
      name: "Distribuidora Norte S.A.S",
      email: "compras@distribuidoranorte.com",
      type: "Comprador",
      status: "Activo",
      kyc: "Pendiente",
      joinDate: "2024-01-10",
      lastActivity: "2024-01-19",
    },
    {
      id: "USR-003",
      name: "Carlos Rodríguez",
      email: "carlos@cafepremium.com",
      type: "Productor",
      status: "Suspendido",
      kyc: "Rechazado",
      joinDate: "2023-12-20",
      lastActivity: "2024-01-18",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="flex h-16 items-center px-6">
          <h1 className="text-2xl font-bold text-gray-900">Gestión de Usuarios</h1>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Usuarios Registrados</CardTitle>
                <CardDescription>Administrar usuarios, roles y verificaciones</CardDescription>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Nuevo Usuario
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Buscar usuarios..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Tipo de usuario" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="productor">Productor</SelectItem>
                  <SelectItem value="comprador">Comprador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Estado KYC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="verificado">Verificado</SelectItem>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="rechazado">Rechazado</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>KYC</TableHead>
                  <TableHead>Registro</TableHead>
                  <TableHead>Última Actividad</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">{user.id}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.type === "Productor" ? "default" : "secondary"}>{user.type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "Activo"
                            ? "default"
                            : user.status === "Suspendido"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.kyc === "Verificado" ? "default" : user.kyc === "Pendiente" ? "secondary" : "destructive"
                        }
                      >
                        {user.kyc}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{user.joinDate}</TableCell>
                    <TableCell className="text-sm text-gray-600">{user.lastActivity}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
