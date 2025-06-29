"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Users, MessageCircle, Heart, ThumbsUp, Plus } from "lucide-react"
import { VoiceAIControls } from "@/components/voice-ai-controls"

interface Post {
  id: string
  title: string
  content: string
  author: string
  category: string
  upvotes: number
  comments: number
  timestamp: string
}

const mockPosts: Post[] = [
  {
    id: "1",
    title: "Successfully matched with 96% compatibility!",
    content: "After 18 months of waiting, I finally found a perfect match through HLAhub. The blockchain verification gave me complete confidence in the process.",
    author: "Sarah M.",
    category: "Success Story",
    upvotes: 247,
    comments: 23,
    timestamp: "2 hours ago"
  },
  {
    id: "2",
    title: "HLA typing test experience at HealthFirst",
    content: "Just completed my HLA typing test. The process was smooth and payment with Algorand was instant. Results expected in 3 days!",
    author: "Michael R.",
    category: "Experience",
    upvotes: 156,
    comments: 18,
    timestamp: "5 hours ago"
  }
]

export default function CommunityPage() {
  const [posts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "General" })
  const [showNewPost, setShowNewPost] = useState(false)

  const handleSubmitPost = () => {
    alert("Post submitted! It will be reviewed before publishing.")
    setNewPost({ title: "", content: "", category: "General" })
    setShowNewPost(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community</h1>
          <p className="text-gray-600 dark:text-gray-300">Connect with other patients and share experiences</p>
        </div>
        <VoiceAIControls 
          text="Welcome to the HLAhub community. Here you can share your experiences, ask questions, and connect with other patients on their healthcare journey."
          compact={true}
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            <Users className="w-4 h-4 mr-1" />
            1,247 Members
          </Badge>
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            <MessageCircle className="w-4 h-4 mr-1" />
            89 Active Today
          </Badge>
        </div>
        <Button onClick={() => setShowNewPost(!showNewPost)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {showNewPost && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
            <CardDescription>Share your experience with the community</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              />
            </div>
            <div>
              <Textarea
                placeholder="Share your story, ask a question, or provide advice..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitPost} disabled={!newPost.title || !newPost.content}>
                Submit Post
              </Button>
              <Button variant="outline" onClick={() => setShowNewPost(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      by {post.author} • {post.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">{post.content}</p>
              
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  {post.upvotes}
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments} Comments
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Support
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}