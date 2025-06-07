"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

interface Hotspot {
  id: string
  x: number
  y: number
  word: string
  translations: Record<string, string>
}

interface InteractiveImageProps {
  imageUrl: string
  hotspots: Hotspot[]
  onWordClick: (hotspot: Hotspot) => void
  showLabels: boolean
  selectedLanguages: string[]
}

export default function InteractiveImage({
  imageUrl,
  hotspots,
  onWordClick,
  showLabels,
  selectedLanguages,
}: InteractiveImageProps) {
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)

  const getDisplayText = (hotspot: Hotspot) => {
    const languages = selectedLanguages.filter((lang) => lang !== "en")
    if (languages.length === 0) return hotspot.word

    const translations = languages.map((lang) => hotspot.translations[lang] || hotspot.word)
    return `${hotspot.word} / ${translations.join(" / ")}`
  }

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt="Interactive learning image"
          width={800}
          height={600}
          className="w-full h-auto"
        />

        {/* Hotspots */}
        {hotspots.map((hotspot) => (
          <div key={hotspot.id} className="absolute">
            {/* Hotspot Button */}
            <button
              className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-200 ${
                hoveredHotspot === hotspot.id
                  ? "bg-blue-600 scale-125 z-20"
                  : "bg-blue-500 hover:bg-blue-600 hover:scale-110 z-10"
              }`}
              style={{
                left: `${hotspot.x}%`,
                top: `${hotspot.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => onWordClick(hotspot)}
              onMouseEnter={() => setHoveredHotspot(hotspot.id)}
              onMouseLeave={() => setHoveredHotspot(null)}
            >
              <div className="w-full h-full rounded-full bg-white opacity-30"></div>
            </button>

            {/* Label */}
            {showLabels && (
              <div
                className={`absolute pointer-events-none transition-all duration-200 ${
                  hoveredHotspot === hotspot.id ? "scale-110 z-20" : "z-10"
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y - 8}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <Badge
                  variant="default"
                  className="bg-white text-gray-900 border border-gray-200 shadow-lg whitespace-nowrap"
                >
                  {getDisplayText(hotspot)}
                </Badge>
              </div>
            )}

            {/* Hover Tooltip */}
            {hoveredHotspot === hotspot.id && !showLabels && (
              <div
                className="absolute pointer-events-none z-30"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y - 8}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <Badge
                  variant="default"
                  className="bg-gray-900 text-white shadow-lg whitespace-nowrap animate-in fade-in-0 zoom-in-95"
                >
                  {getDisplayText(hotspot)}
                </Badge>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-600 text-center">
          Click on the blue dots to learn about different parts.
          {!showLabels && " Hover to see labels."}
        </p>
      </div>
    </div>
  )
}
