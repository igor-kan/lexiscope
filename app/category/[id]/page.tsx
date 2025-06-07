"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, BookOpen, Brain, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InteractiveImage from "@/components/interactive-image"
import Interactive3D from "@/components/interactive-3d"
import WordDetailModal from "@/components/word-detail-modal"

const categoryData = {
  "human-body": {
    title: "Human Body",
    description: "Learn anatomy and body parts",
    type: "both",
    imageUrl: "/placeholder.svg?height=600&width=800",
    modelUrl: "/assets/3d/duck.glb", // Using placeholder model
    hotspots: [
      { id: "head", x: 50, y: 15, word: "head", translations: { es: "cabeza", fr: "tête", de: "Kopf" } },
      { id: "eye", x: 48, y: 20, word: "eye", translations: { es: "ojo", fr: "œil", de: "Auge" } },
      { id: "nose", x: 50, y: 25, word: "nose", translations: { es: "nariz", fr: "nez", de: "Nase" } },
      { id: "mouth", x: 50, y: 30, word: "mouth", translations: { es: "boca", fr: "bouche", de: "Mund" } },
      { id: "neck", x: 50, y: 35, word: "neck", translations: { es: "cuello", fr: "cou", de: "Hals" } },
      { id: "shoulder", x: 40, y: 40, word: "shoulder", translations: { es: "hombro", fr: "épaule", de: "Schulter" } },
      { id: "arm", x: 35, y: 50, word: "arm", translations: { es: "brazo", fr: "bras", de: "Arm" } },
      { id: "hand", x: 30, y: 65, word: "hand", translations: { es: "mano", fr: "main", de: "Hand" } },
      { id: "chest", x: 50, y: 45, word: "chest", translations: { es: "pecho", fr: "poitrine", de: "Brust" } },
      { id: "stomach", x: 50, y: 55, word: "stomach", translations: { es: "estómago", fr: "estomac", de: "Bauch" } },
      { id: "leg", x: 45, y: 75, word: "leg", translations: { es: "pierna", fr: "jambe", de: "Bein" } },
      { id: "foot", x: 45, y: 90, word: "foot", translations: { es: "pie", fr: "pied", de: "Fuß" } },
    ],
  },
  kitchen: {
    title: "Kitchen & Cooking",
    description: "Kitchen tools, appliances, and food",
    type: "image",
    imageUrl: "/placeholder.svg?height=600&width=800",
    hotspots: [
      { id: "stove", x: 20, y: 40, word: "stove", translations: { es: "estufa", fr: "cuisinière", de: "Herd" } },
      {
        id: "refrigerator",
        x: 80,
        y: 30,
        word: "refrigerator",
        translations: { es: "refrigerador", fr: "réfrigérateur", de: "Kühlschrank" },
      },
      { id: "sink", x: 60, y: 50, word: "sink", translations: { es: "fregadero", fr: "évier", de: "Spüle" } },
      {
        id: "microwave",
        x: 25,
        y: 25,
        word: "microwave",
        translations: { es: "microondas", fr: "micro-ondes", de: "Mikrowelle" },
      },
      { id: "knife", x: 40, y: 60, word: "knife", translations: { es: "cuchillo", fr: "couteau", de: "Messer" } },
      { id: "plate", x: 50, y: 70, word: "plate", translations: { es: "plato", fr: "assiette", de: "Teller" } },
    ],
  },
  "car-engine": {
    title: "Car Engine",
    description: "Explore engine components in 3D",
    type: "3d",
    modelUrl: "/assets/3d/duck.glb", // Using placeholder model
    hotspots: [
      {
        id: "cylinder",
        x: 40,
        y: 30,
        word: "cylinder",
        translations: { es: "cilindro", fr: "cylindre", de: "Zylinder" },
      },
      { id: "piston", x: 45, y: 35, word: "piston", translations: { es: "pistón", fr: "piston", de: "Kolben" } },
      {
        id: "spark-plug",
        x: 50,
        y: 25,
        word: "spark plug",
        translations: { es: "bujía", fr: "bougie", de: "Zündkerze" },
      },
      { id: "valve", x: 55, y: 30, word: "valve", translations: { es: "válvula", fr: "soupape", de: "Ventil" } },
    ],
  },
}

export default function CategoryPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.id as string
  const [selectedWord, setSelectedWord] = useState<any>(null)
  const [learningMode, setLearningMode] = useState<"explore" | "quiz">("explore")
  const [showLabels, setShowLabels] = useState(true)
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en", "es"])

  const category = categoryData[categoryId as keyof typeof categoryData]

  useEffect(() => {
    const saved = localStorage.getItem("lexiscope-languages")
    if (saved) {
      setSelectedLanguages(JSON.parse(saved))
    }
  }, [])

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  const handleWordClick = (hotspot: any) => {
    setSelectedWord({
      ...hotspot,
      definition: `A ${hotspot.word} is an important part of the human body.`,
      partOfSpeech: "noun",
      examples: [`Point to your ${hotspot.word}.`, `The ${hotspot.word} is essential for daily activities.`],
      pronunciation: `/ˈ${hotspot.word}/`,
      audio: null,
    })

    // Track word interaction
    const progress = JSON.parse(localStorage.getItem("lexiscope-progress") || "{}")
    if (!progress[categoryId]) {
      progress[categoryId] = { learned: 0, viewed: [] }
    }
    if (!progress[categoryId].viewed.includes(hotspot.id)) {
      progress[categoryId].viewed.push(hotspot.id)
      progress[categoryId].learned = progress[categoryId].viewed.length
      localStorage.setItem("lexiscope-progress", JSON.stringify(progress))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push("/")}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">{category.title}</h1>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant={showLabels ? "default" : "outline"} size="sm" onClick={() => setShowLabels(!showLabels)}>
                {showLabels ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {showLabels ? "Hide" : "Show"} Labels
              </Button>

              <Button
                variant={learningMode === "quiz" ? "default" : "outline"}
                size="sm"
                onClick={() => setLearningMode(learningMode === "quiz" ? "explore" : "quiz")}
              >
                <Brain className="h-4 w-4 mr-2" />
                {learningMode === "quiz" ? "Exit Quiz" : "Quiz Mode"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {learningMode === "quiz" && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-800">Quiz Mode Active</span>
            </div>
            <p className="text-sm text-blue-700 mt-1">
              Click on the parts you think you know. Labels are hidden to test your knowledge!
            </p>
          </div>
        )}

        <Tabs defaultValue={category.type === "both" ? "image" : category.type} className="w-full">
          {category.type === "both" && (
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="image" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Interactive Image</span>
              </TabsTrigger>
              <TabsTrigger value="3d" className="flex items-center space-x-2">
                <span className="text-lg">🧊</span>
                <span>3D Model</span>
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="image" className="space-y-6">
            {(category.type === "image" || category.type === "both") && (
              <InteractiveImage
                imageUrl={category.imageUrl!}
                hotspots={category.hotspots}
                onWordClick={handleWordClick}
                showLabels={showLabels && learningMode !== "quiz"}
                selectedLanguages={selectedLanguages}
              />
            )}
          </TabsContent>

          <TabsContent value="3d" className="space-y-6">
            {(category.type === "3d" || category.type === "both") && (
              <Interactive3D
                modelUrl={category.modelUrl!}
                hotspots={category.hotspots}
                onWordClick={handleWordClick}
                showLabels={showLabels && learningMode !== "quiz"}
                selectedLanguages={selectedLanguages}
              />
            )}
          </TabsContent>
        </Tabs>

        {/* Progress Bar */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Category Progress</span>
            <span className="text-sm text-gray-600">
              {Math.round((category.hotspots.length / category.hotspots.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(category.hotspots.length / category.hotspots.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </main>

      {/* Word Detail Modal */}
      {selectedWord && (
        <WordDetailModal
          word={selectedWord}
          selectedLanguages={selectedLanguages}
          onClose={() => setSelectedWord(null)}
        />
      )}
    </div>
  )
}
