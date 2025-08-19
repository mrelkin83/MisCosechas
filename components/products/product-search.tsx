"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, X, TrendingUp } from "lucide-react"

interface ProductSearchProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function ProductSearch({ onSearch, placeholder = "Buscar productos..." }: ProductSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  // Mock suggestions - in real app, this would come from API
  const mockSuggestions = [
    "Aguacate Hass",
    "Café especial",
    "Plátano hartón",
    "Arroz blanco",
    "Leche fresca",
    "Carne de res",
    "Pollo campesino",
    "Maíz amarillo",
    "Frijol rojo",
    "Papa criolla",
  ]

  const trendingSearches = ["Aguacate", "Café", "Plátano", "Arroz", "Leche"]

  useEffect(() => {
    if (query.length > 2) {
      const filtered = mockSuggestions.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
      setSuggestions(filtered.slice(0, 5))
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      onSearch(searchQuery)
      setRecentSearches((prev) => {
        const updated = [searchQuery, ...prev.filter((item) => item !== searchQuery)].slice(0, 5)
        return updated
      })
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full h-12 pl-4 pr-12 text-base border-2 focus:border-primary"
          onFocus={() => setShowSuggestions(query.length > 2)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        <Button type="submit" size="sm" className="absolute right-1 top-1 bottom-1 px-4">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Sugerencias</div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded-md text-sm"
                  onClick={() => {
                    setQuery(suggestion)
                    handleSearch(suggestion)
                  }}
                >
                  <Search className="h-4 w-4 inline mr-2 text-muted-foreground" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {query.length <= 2 && (
            <>
              {/* Trending Searches */}
              <div className="p-2 border-t">
                <div className="text-xs font-semibold text-muted-foreground mb-2 px-2 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Búsquedas populares
                </div>
                <div className="flex flex-wrap gap-2 px-2">
                  {trendingSearches.map((trend, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        setQuery(trend)
                        handleSearch(trend)
                      }}
                    >
                      {trend}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="p-2 border-t">
                  <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">Búsquedas recientes</div>
                  {recentSearches.map((recent, index) => (
                    <div key={index} className="flex items-center justify-between px-3 py-2 hover:bg-accent rounded-md">
                      <button
                        className="flex-1 text-left text-sm"
                        onClick={() => {
                          setQuery(recent)
                          handleSearch(recent)
                        }}
                      >
                        <Search className="h-4 w-4 inline mr-2 text-muted-foreground" />
                        {recent}
                      </button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRecentSearches((prev) => prev.filter((item) => item !== recent))
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
