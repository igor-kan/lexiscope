"use client"

import { useState, useEffect } from "react"
import { Globe, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
]

export default function LanguageSelector() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"])
  const [nativeLanguage, setNativeLanguage] = useState("en")

  useEffect(() => {
    const saved = localStorage.getItem("lexiscope-languages")
    const savedNative = localStorage.getItem("lexiscope-native-language")

    if (saved) {
      setSelectedLanguages(JSON.parse(saved))
    }
    if (savedNative) {
      setNativeLanguage(savedNative)
    }
  }, [])

  const toggleLanguage = (code: string) => {
    const updated = selectedLanguages.includes(code)
      ? selectedLanguages.filter((lang) => lang !== code)
      : [...selectedLanguages, code]

    if (updated.length > 0) {
      setSelectedLanguages(updated)
      localStorage.setItem("lexiscope-languages", JSON.stringify(updated))
    }
  }

  const setAsNative = (code: string) => {
    setNativeLanguage(code)
    localStorage.setItem("lexiscope-native-language", code)
  }

  const getLanguageName = (code: string) => {
    return languages.find((lang) => lang.code === code)?.name || code
  }

  const getLanguageFlag = (code: string) => {
    return languages.find((lang) => lang.code === code)?.flag || "🌐"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center space-x-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">
            {selectedLanguages.length === 1
              ? getLanguageName(selectedLanguages[0])
              : `${selectedLanguages.length} Languages`}
          </span>
          {selectedLanguages.length > 1 && (
            <Badge variant="secondary" className="ml-1">
              {selectedLanguages.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end">
        <DropdownMenuLabel>Study Languages</DropdownMenuLabel>
        <div className="px-2 py-1">
          <p className="text-xs text-gray-600 mb-2">Select languages you want to learn</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedLanguages.map((code) => (
              <Badge key={code} variant="default" className="text-xs">
                {getLanguageFlag(code)} {getLanguageName(code)}
              </Badge>
            ))}
          </div>
        </div>

        <DropdownMenuSeparator />

        <div className="max-h-64 overflow-y-auto">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => toggleLanguage(language.code)}
              className="flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
                {language.code === nativeLanguage && (
                  <Badge variant="outline" className="text-xs">
                    Native
                  </Badge>
                )}
              </div>
              {selectedLanguages.includes(language.code) && <Check className="h-4 w-4 text-green-600" />}
            </DropdownMenuItem>
          ))}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel>Native Language</DropdownMenuLabel>
        <div className="px-2 py-1">
          <p className="text-xs text-gray-600 mb-2">Your native language for definitions</p>
          <div className="grid grid-cols-2 gap-1">
            {languages.slice(0, 6).map((language) => (
              <Button
                key={language.code}
                variant={nativeLanguage === language.code ? "default" : "ghost"}
                size="sm"
                onClick={() => setAsNative(language.code)}
                className="justify-start text-xs h-8"
              >
                {language.flag} {language.name}
              </Button>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
