"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, BookOpen, Brain, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import LanguageSelector from "@/components/language-selector"
import UserProfile from "@/components/user-profile"

const categories = [
  {
    id: "human-body",
    title: "Human Body",
    description: "Learn anatomy and body parts",
    image: "/placeholder.svg?height=200&width=300",
    type: "both",
    wordsCount: 45,
    difficulty: "beginner",
  },
  {
    id: "kitchen",
    title: "Kitchen & Cooking",
    description: "Kitchen tools, appliances, and food",
    image: "/placeholder.svg?height=200&width=300",
    type: "image",
    wordsCount: 38,
    difficulty: "beginner",
  },
  {
    id: "car-engine",
    title: "Car Engine",
    description: "Explore engine components in 3D",
    image: "/placeholder.svg?height=200&width=300",
    type: "3d",
    wordsCount: 52,
    difficulty: "advanced",
  },
  {
    id: "forest",
    title: "Forest & Nature",
    description: "Trees, plants, and wildlife",
    image: "/placeholder.svg?height=200&width=300",
    type: "image",
    wordsCount: 41,
    difficulty: "intermediate",
  },
  {
    id: "solar-system",
    title: "Solar System",
    description: "Planets and celestial bodies in 3D",
    image: "/placeholder.svg?height=200&width=300",
    type: "3d",
    wordsCount: 28,
    difficulty: "intermediate",
  },
  {
    id: "musical-instruments",
    title: "Musical Instruments",
    description: "Orchestra and band instruments",
    image: "/placeholder.svg?height=200&width=300",
    type: "both",
    wordsCount: 35,
    difficulty: "intermediate",
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showProfile, setShowProfile] = useState(false)
  const [userProgress, setUserProgress] = useState<any>({})

  useEffect(() => {
    const progress = localStorage.getItem("lexiscope-progress")
    if (progress) {
      setUserProgress(JSON.parse(progress))
    }
  }, [])

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "3d":
        return "🧊"
      case "image":
        return "🖼️"
      case "both":
        return "🔄"
      default:
        return "📚"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Globe className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LexiScope</h1>
                <p className="text-sm text-gray-600">See the word. Know the world.</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <LanguageSelector />
              <Button variant="outline" size="sm" onClick={() => setShowProfile(true)}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Stats */}
        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">239</p>
                    <p className="text-sm text-gray-600">Total Words</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Brain className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">{Object.keys(userProgress).length}</p>
                    <p className="text-sm text-gray-600">Words Learned</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-600">Languages</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link key={category.id} href={`/category/${category.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="relative">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className="text-lg">
                      {getTypeIcon(category.type)}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                    <Badge className={getDifficultyColor(category.difficulty)}>{category.difficulty}</Badge>
                  </div>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{category.wordsCount} words</span>
                    <div className="flex items-center space-x-1">
                      {category.type === "3d" && <span className="text-xs text-blue-600">3D Model</span>}
                      {category.type === "image" && <span className="text-xs text-green-600">Interactive Image</span>}
                      {category.type === "both" && <span className="text-xs text-purple-600">Image + 3D</span>}
                    </div>
                  </div>

                  {userProgress[category.id] && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((userProgress[category.id].learned / category.wordsCount) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(userProgress[category.id].learned / category.wordsCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Start Quiz Mode</h3>
              <p className="mb-4 opacity-90">Test your knowledge with interactive quizzes</p>
              <Button variant="secondary">
                <Brain className="h-4 w-4 mr-2" />
                Start Quiz
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">Flashcard Review</h3>
              <p className="mb-4 opacity-90">Review your saved words and phrases</p>
              <Button variant="secondary">
                <BookOpen className="h-4 w-4 mr-2" />
                Review Cards
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">AI Visual Labeling</h3>
              <p className="mb-4 opacity-90">Upload or generate images with automatic labeling</p>
              <Link href="/ai-labeling">
                <Button variant="secondary">
                  <Brain className="h-4 w-4 mr-2" />
                  Try AI Labeling
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* User Profile Modal */}
      {showProfile && <UserProfile onClose={() => setShowProfile(false)} />}
    </div>
  )
}
