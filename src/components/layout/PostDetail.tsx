// components/layout/PostDetail.tsx
import { useState, useEffect } from "react";
import { SubredditPost, Comment } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import PostHeader from "@/components/post/PostHeader";
import PostContent from "@/components/post/PostContent";
import CommentList from "@/components/comment/CommentList";
import { fetchComments } from "@/lib/reddit";

interface PostDetailProps {
  selectedPost: SubredditPost | null;
}

export default function PostDetail({ selectedPost }: PostDetailProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  // Fetch comments when selected post changes
  useEffect(() => {
    if (selectedPost) {
      loadComments(selectedPost.permalink);
    } else {
      setComments([]);
    }
  }, [selectedPost]);

  const loadComments = async (permalink: string) => {
    setIsLoadingComments(true);
    const fetchedComments = await fetchComments(permalink);
    setComments(fetchedComments);
    setIsLoadingComments(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      {!selectedPost ? (
        <div className="flex items-center justify-center h-full text-[#818384]">
          Select a post to view details
        </div>
      ) : (
        <>
          <PostHeader post={selectedPost} />

          <ScrollArea className="flex-1 p-2 overflow-y-scroll">
            <div className="space-y-4">
              <PostContent post={selectedPost} />
              <CommentList comments={comments} isLoading={isLoadingComments} />
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
}
