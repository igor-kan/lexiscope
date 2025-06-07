"use client"

import { useState, useEffect } from "react"
import { X, Clock, BookOpen, Brain, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface UserProfileProps {
  onClose: () => void
}

export default function UserProfile({ onClose }: UserProfileProps) {
  const [userStats, setUserStats] = useState({
    totalWordsLearned: 0,
    totalTimeSpent: 0,
    categoriesCompleted: 0,
    currentStreak: 0,
    achievements: [],
    recentActivity: [],
  })

  useEffect(() => {
    // Load user stats from localStorage
    const stats = localStorage.getItem("lexiscope-user-stats")
    if (stats) {
      setUserStats(JSON.parse(stats))
    }
  }, [])

  const achievements = [
    { id: "first-word", name: "First Word", description: "Learned your first word", icon: "🎯", unlocked: true },
    { id: "week-streak", name: "Week Warrior", description: "7-day learning streak", icon: "🔥", unlocked: false },
    {
      id: "category-master",
      name: "Category Master",
      description: "Complete a full category",
      icon: "🏆",
      unlocked: false,
    },
    { id: "polyglot", name: "Polyglot", description: "Learn in 3+ languages", icon: "🌍", unlocked: true },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Your Learning Profile</h2>
            <p className="text-gray-600">Track your progress and achievements</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <BookOpen className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.totalWordsLearned}</p>
                        <p className="text-sm text-gray-600">Words Learned</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{Math.round(userStats.totalTimeSpent / 60)}</p>
                        <p className="text-sm text-gray-600">Hours Studied</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Target className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.categoriesCompleted}</p>
                        <p className="text-sm text-gray-600">Categories Done</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-8 w-8 text-orange-600" />
                      <div>
                        <p className="text-2xl font-bold">{userStats.currentStreak}</p>
                        <p className="text-sm text-gray-600">Day Streak</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Completed "Kitchen & Cooking" quiz</span>
                      </div>
                      <span className="text-sm text-gray-600">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>Learned 5 new words in "Human Body"</span>
                      </div>
                      <span className="text-sm text-gray-600">Yesterday</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span>Explored "Solar System" 3D model</span>
                      </div>
                      <span className="text-sm text-gray-600">2 days ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress by Category</CardTitle>
                  <CardDescription>See how you're progressing in each topic</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Human Body</span>
                      <span className="text-sm text-gray-600">32/45 words</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Kitchen & Cooking</span>
                      <span className="text-sm text-gray-600">28/38 words</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Forest & Nature</span>
                      <span className="text-sm text-gray-600">15/41 words</span>
                    </div>
                    <Progress value={37} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Car Engine</span>
                      <span className="text-sm text-gray-600">8/52 words</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={achievement.unlocked ? "border-green-200 bg-green-50" : "border-gray-200"}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`text-3xl ${achievement.unlocked ? "" : "grayscale opacity-50"}`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}>
                            {achievement.name}
                          </h3>
                          <p className={`text-sm ${achievement.unlocked ? "text-green-600" : "text-gray-500"}`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.unlocked && (
                          <Badge variant="default" className="bg-green-600">
                            Unlocked
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Preferences</CardTitle>
                  <CardDescription>Customize your learning experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Audio Pronunciation</h4>
                      <p className="text-sm text-gray-600">Play audio when clicking words</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Show IPA Transcription</h4>
                      <p className="text-sm text-gray-600">Display phonetic notation</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Quiz Difficulty</h4>
                      <p className="text-sm text-gray-600">Adjust challenge level</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Intermediate
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Daily Goal</h4>
                      <p className="text-sm text-gray-600">Words to learn per day</p>
                    </div>
                    <Button variant="outline" size="sm">
                      10 words
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
