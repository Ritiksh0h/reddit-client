// components/layout/PostList.tsx
import { useState, useEffect } from "react";
import { SubredditPost } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostItem from "@/components/post/PostItem";
import SubredditHeader from "@/components/subreddit/SubredditHeader";
import SortTabs from "@/components/common/SortTabs";
import { fetchPosts } from "@/lib/reddit";

interface PostListProps {
  subredditName: string;
  selectedPost: SubredditPost | null;
  onPostSelect: (post: SubredditPost) => void;
  onPostsLoaded: (count: number) => void;
}

export default function PostList({
  subredditName,
  selectedPost,
  onPostSelect,
  onPostsLoaded,
}: PostListProps) {
  const [posts, setPosts] = useState<SubredditPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("hot");

  // Fetch posts when subreddit or sort changes
  useEffect(() => {
    loadPosts();
  }, [subredditName, sortBy]);

  if (!subredditName) return;

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const fetchedPosts = await fetchPosts(subredditName, sortBy);
      setPosts(fetchedPosts);
      onPostsLoaded(fetchedPosts.length);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter posts based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={`md:w-[300px] lg:w-[450px] border-r border-[#343536] flex flex-col ${
        selectedPost ? "hidden md:flex" : "flex"
      }`}
    >
      <SubredditHeader
        subredditName={subredditName}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onRefresh={loadPosts}
      />

      <SortTabs sortBy={sortBy} onSortChange={setSortBy} />

      <ScrollArea className="flex-1 overflow-y-scroll">
        {isLoading ? (
          <div className="p-4 text-center text-[#818384]">Loading posts...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-4 text-center text-[#818384]">
            {searchQuery ? "No posts match your search" : "No posts found"}
          </div>
        ) : (
          <div>
            {filteredPosts.map((post) => (
              <PostItem
                key={post.id}
                post={post}
                isSelected={selectedPost?.id === post.id}
                onSelect={onPostSelect}
              />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
