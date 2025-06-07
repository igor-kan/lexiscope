"use client"

import { useState } from "react"
import { X, Volume2, Heart, Copy, Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface WordDetailModalProps {
  word: {
    id: string
    word: string
    translations: Record<string, string>
    definition: string
    partOfSpeech: string
    examples: string[]
    pronunciation: string
    audio?: string
  }
  selectedLanguages: string[]
  onClose: () => void
}

export default function WordDetailModal({ word, selectedLanguages, onClose }: WordDetailModalProps) {
  const [savedToFlashcards, setSavedToFlashcards] = useState(false)

  const playAudio = () => {
    // Simulate audio playback
    console.log(`Playing audio for: ${word.word}`)
  }

  const saveToFlashcards = () => {
    const flashcards = JSON.parse(localStorage.getItem("lexiscope-flashcards") || "[]")
    if (!flashcards.find((card: any) => card.id === word.id)) {
      flashcards.push(word)
      localStorage.setItem("lexiscope-flashcards", JSON.stringify(flashcards))
      setSavedToFlashcards(true)
    }
  }

  const languageNames: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ru: "Russian",
    zh: "Chinese",
    ja: "Japanese",
    ko: "Korean",
    ar: "Arabic",
    hi: "Hindi",
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold">{word.word}</h2>
            <Button variant="ghost" size="sm" onClick={playAudio}>
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="translations">Translations</TabsTrigger>
              <TabsTrigger value="examples">Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{word.partOfSpeech}</Badge>
                  <span className="text-sm text-gray-600">{word.pronunciation}</span>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Definition</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{word.definition}</p>
                  </CardContent>
                </Card>

                <div className="flex space-x-2">
                  <Button onClick={saveToFlashcards} disabled={savedToFlashcards} className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    {savedToFlashcards ? "Saved!" : "Save to Flashcards"}
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="translations" className="space-y-4">
              <div className="grid gap-3">
                {selectedLanguages
                  .filter((lang) => lang !== "en")
                  .map((langCode) => (
                    <Card key={langCode}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{languageNames[langCode]}</h4>
                            <p className="text-lg">{word.translations[langCode] || "Translation not available"}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={playAudio}>
                              <Volume2 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="examples" className="space-y-4">
              <div className="space-y-3">
                {word.examples.map((example, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <p className="text-gray-700 italic">"{example}"</p>
                      <div className="flex justify-end mt-2">
                        <Button variant="ghost" size="sm" onClick={playAudio}>
                          <Volume2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Practice Tip</h4>
                  <p className="text-sm text-blue-700">
                    Try using this word in your own sentences to better remember it!
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
