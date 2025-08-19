"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Phone, Video } from "lucide-react"

interface Message {
  id: number
  sender: string
  senderType: "buyer" | "seller"
  content: string
  timestamp: string
  type: "text" | "offer" | "counter-offer"
  offerData?: {
    price: number
    quantity: number
    unit: string
    deliveryTime: string
  }
}

interface ChatInterfaceProps {
  rfqId: string
  currentUser: "buyer" | "seller"
  otherParty: {
    name: string
    avatar?: string
  }
}

export function ChatInterface({ rfqId, currentUser, otherParty }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Finca Los Andes",
      senderType: "seller",
      content:
        "Hola, he revisado tu RFQ para aguacate Hass. Tenemos disponibilidad para las 50 toneladas que necesitas.",
      timestamp: "2024-03-21T10:30:00Z",
      type: "text",
    },
    {
      id: 2,
      sender: "Exportadora del Caribe",
      senderType: "buyer",
      content: "Perfecto, ¿podrías enviarme más detalles sobre la calidad y certificaciones?",
      timestamp: "2024-03-21T11:15:00Z",
      type: "text",
    },
    {
      id: 3,
      sender: "Finca Los Andes",
      senderType: "seller",
      content: "Te envío mi oferta formal:",
      timestamp: "2024-03-21T14:20:00Z",
      type: "offer",
      offerData: {
        price: 4200,
        quantity: 50,
        unit: "toneladas",
        deliveryTime: "7-10 días",
      },
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: messages.length + 1,
      sender: currentUser === "buyer" ? "Exportadora del Caribe" : "Finca Los Andes",
      senderType: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback>{otherParty.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold">{otherParty.name}</div>
            <div className="text-sm text-muted-foreground">En línea</div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Video className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderType === currentUser ? "justify-end" : "justify-start"}`}
          >
            <div className={`max-w-[70%] ${message.senderType === currentUser ? "order-2" : "order-1"}`}>
              {message.type === "text" && (
                <div
                  className={`p-3 rounded-lg ${
                    message.senderType === currentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              )}

              {message.type === "offer" && message.offerData && (
                <Card className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">Oferta Formal</CardTitle>
                      <Badge variant="outline">Nueva</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Precio:</span>
                        <span className="font-semibold">${message.offerData.price.toLocaleString()} por tonelada</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Cantidad:</span>
                        <span>
                          {message.offerData.quantity} {message.offerData.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Entrega:</span>
                        <span>{message.offerData.deliveryTime}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-primary">
                        <span>Total:</span>
                        <span>${(message.offerData.price * message.offerData.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                    {message.senderType !== currentUser && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Aceptar
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          Contraoferta
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              <div className="text-xs text-muted-foreground mt-1 px-1">{formatTimestamp(message.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Escribe tu mensaje..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
