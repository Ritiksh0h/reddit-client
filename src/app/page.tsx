"use client";

import { useState } from "react";
import { Subreddit, SubredditPost } from "@/types";
import {
  Star,
  FileText,
  Globe,
  MessageSquare,
  Gamepad2,
  Atom,
} from "lucide-react";

import LeftSidebar from "@/components/layout/LeftSidebar";
import PostList from "@/components/layout/PostList";
import PostDetail from "@/components/layout/PostDetail";
import { toast } from "sonner";

export default function Home() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>([
    {
      name: "popular",
      displayName: "Popular",
      count: 0,
      icon: <Star className="h-4 w-4" />,
    },
    {
      name: "all",
      displayName: "All",
      count: 0,
      icon: <Globe className="h-4 w-4" />,
    },
    {
      name: "news",
      displayName: "News",
      count: 0,
      icon: <FileText className="h-4 w-4" />,
    },
    {
      name: "worldnews",
      displayName: "Worldnews",
      count: 0,
      icon: <Globe className="h-4 w-4" />,
    },
    {
      name: "funny",
      displayName: "Funny",
      count: 0,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: "askreddit",
      displayName: "Askreddit",
      count: 0,
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      name: "gaming",
      displayName: "Gaming",
      count: 0,
      icon: <Gamepad2 className="h-4 w-4" />,
    },
    {
      name: "science",
      displayName: "Science",
      count: 0,
      icon: <Atom className="h-4 w-4" />,
    },
  ]);

  const [selectedSubreddit, setSelectedSubreddit] = useState<string>("popular");
  const [selectedPost, setSelectedPost] = useState<SubredditPost | null>(null);

  // Handle subreddit selection
  const handleSelectSubreddit = (name: string) => {
    setSelectedSubreddit(name);
    // Reset selected post when changing subreddits
    setSelectedPost(null);
  };

  // Add a new subreddit
  const handleAddSubreddit = (subreddit: Subreddit) => {
    setSubreddits((prev) => [...prev, subreddit]);
  };

  // Delete a subreddit
  const handleDeleteSubreddit = (name: string) => {
    // Only allow deleting custom subreddits
    const subredditToDelete = subreddits.find((sub) => sub.name === name);

    if (!subredditToDelete?.isCustom) {
      toast("Default subreddits cannot be deleted");
      return;
    }

    setSubreddits((prev) => prev.filter((sub) => sub.name !== name));

    // If the deleted subreddit was selected, switch to 'popular'
    if (selectedSubreddit === name) {
      setSelectedSubreddit("popular");
    }

    toast(`Subreddit 'r/${name}' deleted`);
  };

  // Refresh a specific subreddit
  const handleRefreshSubreddit = (name: string) => {
    if (name === selectedSubreddit) {
      // If it's the currently selected subreddit, the PostList component will handle the refresh
      toast(`Posts for r/${name} refreshed`);
    } else {
      // If it's not the currently selected subreddit, reset its count
      setSubreddits((prev) =>
        prev.map((sub) => (sub.name === name ? { ...sub, count: 0 } : sub))
      );

      toast(`Will refresh r/${name} when selected`);
    }
  };

  // Update post count for a subreddit
  const handlePostsLoaded = (count: number) => {
    setSubreddits((prev) =>
      prev.map((sub) =>
        sub.name === selectedSubreddit ? { ...sub, count } : sub
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#1a1a1b] text-[#d7dadc]">
      {/* Left Sidebar - Subreddits */}
      <LeftSidebar
        subreddits={subreddits}
        selectedSubreddit={selectedSubreddit}
        onSelectSubreddit={handleSelectSubreddit}
        onAddSubreddit={handleAddSubreddit}
        onDeleteSubreddit={handleDeleteSubreddit}
        onRefreshSubreddit={handleRefreshSubreddit}
      />

      {/* Middle Column - Posts List */}
      <PostList
        subredditName={selectedSubreddit}
        selectedPost={selectedPost}
        onPostSelect={setSelectedPost}
        onPostsLoaded={handlePostsLoaded}
      />

      {/* Right Column - Post Detail */}
      <PostDetail selectedPost={selectedPost} />
    </div>
  );
}