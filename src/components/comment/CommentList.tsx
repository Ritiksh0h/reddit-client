// components/comment/CommentList.tsx
import { Comment } from "@/types";
import CommentItem from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
}

export default function CommentList({ comments, isLoading }: CommentListProps) {
  return (
    <div>
      <h3 className="font-bold">Comments</h3>
      
      {isLoading ? (
        <div className="text-center text-[#818384] py-4">
          Loading comments...
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center text-[#818384] py-4">
          No comments yet
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}