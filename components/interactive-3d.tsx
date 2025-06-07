"use client"

import { useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, useGLTF, Html } from "@react-three/drei"
import { Badge } from "@/components/ui/badge"

interface Hotspot {
  id: string
  x: number
  y: number
  word: string
  translations: Record<string, string>
}

interface Interactive3DProps {
  modelUrl: string
  hotspots: Hotspot[]
  onWordClick: (hotspot: Hotspot) => void
  showLabels: boolean
  selectedLanguages: string[]
}

function Model({ url, hotspots, onWordClick, showLabels, selectedLanguages }: any) {
  const { scene } = useGLTF(url)
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null)

  const getDisplayText = (hotspot: Hotspot) => {
    const languages = selectedLanguages.filter((lang) => lang !== "en")
    if (languages.length === 0) return hotspot.word

    const translations = languages.map((lang) => hotspot.translations[lang] || hotspot.word)
    return `${hotspot.word} / ${translations.join(" / ")}`
  }

  return (
    <group>
      <primitive object={scene} scale={[2, 2, 2]} />

      {/* 3D Hotspots */}
      {hotspots.map((hotspot) => (
        <group key={hotspot.id}>
          {/* Hotspot Sphere */}
          <mesh
            position={[(hotspot.x - 50) / 10, (50 - hotspot.y) / 10, 1]}
            onClick={() => onWordClick(hotspot)}
            onPointerEnter={() => setHoveredHotspot(hotspot.id)}
            onPointerLeave={() => setHoveredHotspot(null)}
          >
            <sphereGeometry args={[0.1]} />
            <meshBasicMaterial
              color={hoveredHotspot === hotspot.id ? "#2563eb" : "#3b82f6"}
              transparent
              opacity={0.8}
            />
          </mesh>

          {/* 3D Label */}
          {(showLabels || hoveredHotspot === hotspot.id) && (
            <Html position={[(hotspot.x - 50) / 10, (50 - hotspot.y) / 10 + 0.3, 1]} center distanceFactor={10}>
              <Badge
                variant="default"
                className={`${
                  showLabels ? "bg-white text-gray-900 border border-gray-200" : "bg-gray-900 text-white"
                } shadow-lg whitespace-nowrap pointer-events-none`}
              >
                {getDisplayText(hotspot)}
              </Badge>
            </Html>
          )}
        </group>
      ))}
    </group>
  )
}

export default function Interactive3D({
  modelUrl,
  hotspots,
  onWordClick,
  showLabels,
  selectedLanguages,
}: Interactive3DProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-96 md:h-[500px] relative">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model
            url={modelUrl}
            hotspots={hotspots}
            onWordClick={onWordClick}
            showLabels={showLabels}
            selectedLanguages={selectedLanguages}
          />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Canvas>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-gray-50 border-t">
        <p className="text-sm text-gray-600 text-center">
          Rotate, zoom, and click on the blue spheres to explore the 3D model. Use your mouse or touch to navigate.
        </p>
      </div>
    </div>
  )
}
