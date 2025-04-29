"use client";

import { useState } from "react";
import { Subreddit, SubredditPost } from "@/types";
import { Menu, ArrowLeft } from "lucide-react";

import LeftSidebar from "@/components/layout/LeftSidebar";
import PostList from "@/components/layout/PostList";
import PostDetail from "@/components/layout/PostDetail";
import { toast } from "sonner";
import { defaultSubreddit } from "@/lib/DefaultSubreddit";

export default function Home() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>(defaultSubreddit);

  const [selectedSubreddit, setSelectedSubreddit] = useState<string>("popular");
  const [selectedPost, setSelectedPost] = useState<SubredditPost | null>(null);
  const [showSidebar, setShowSidebar] = useState(false); // mobile menu

  const handleSelectSubreddit = (name: string) => {
    setSelectedSubreddit(name);
    setSelectedPost(null);
    setShowSidebar(false); // Close sidebar on mobile
  };

  const handleAddSubreddit = (subreddit: Subreddit) => {
    setSubreddits((prev) => [...prev, subreddit]);
  };

  const handleDeleteSubreddit = (name: string) => {
    const subredditToDelete = subreddits.find((sub) => sub.name === name);
    if (!subredditToDelete?.isCustom) {
      toast("Default subreddits cannot be deleted");
      return;
    }
    setSubreddits((prev) => prev.filter((sub) => sub.name !== name));
    if (selectedSubreddit === name) {
      setSelectedSubreddit("popular");
    }
    toast(`Subreddit 'r/${name}' deleted`);
  };

  const handleRefreshSubreddit = (name: string) => {
    if (name === selectedSubreddit) {
      toast(`Posts for r/${name} refreshed`);
    } else {
      setSubreddits((prev) =>
        prev.map((sub) => (sub.name === name ? { ...sub, count: 0 } : sub))
      );
      toast(`Will refresh r/${name} when selected`);
    }
  };

  const handlePostsLoaded = (count: number) => {
    setSubreddits((prev) =>
      prev.map((sub) =>
        sub.name === selectedSubreddit ? { ...sub, count } : sub
      )
    );
  };

  return (
    <div className="flex h-screen bg-[#1a1a1b] text-[#d7dadc]">
      {/* Mobile Topbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-12 bg-[#1a1a1b] border-b border-[#343536] flex items-center justify-between px-4 z-20">
        {selectedPost ? (
          <button onClick={() => setSelectedPost(null)}>
            <ArrowLeft className="h-6 w-6" />
          </button>
        ) : (
          <button onClick={() => setShowSidebar(true)}>
            <Menu className="h-6 w-6" />
          </button>
        )}
        <span className="font-bold text-lg">Reddit Client</span>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </div>

      {/* Left Sidebar */}
      <div className="hidden lg:flex">
        <LeftSidebar
          subreddits={subreddits}
          selectedSubreddit={selectedSubreddit}
          onSelectSubreddit={handleSelectSubreddit}
          onAddSubreddit={handleAddSubreddit}
          onDeleteSubreddit={handleDeleteSubreddit}
          onRefreshSubreddit={handleRefreshSubreddit}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex">
          <div className="bg-[#1a1a1b] w-60 h-full">
            <LeftSidebar
              subreddits={subreddits}
              selectedSubreddit={selectedSubreddit}
              onSelectSubreddit={handleSelectSubreddit}
              onAddSubreddit={handleAddSubreddit}
              onDeleteSubreddit={handleDeleteSubreddit}
              onRefreshSubreddit={handleRefreshSubreddit}
            />
          </div>
          <div className="flex-1" onClick={() => setShowSidebar(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row pt-12 md:pt-0">
        {/* PostList (middle) */}

        <PostList
          subredditName={selectedSubreddit}
          selectedPost={selectedPost}
          onPostSelect={(post) => {
            setSelectedPost(post);
          }}
          onPostsLoaded={handlePostsLoaded}
          onDeleteSubreddit={handleDeleteSubreddit}
        />

        {/* PostDetail (right) */}
        <PostDetail selectedPost={selectedPost} />
      </div>
    </div>
  );
}
