import { Comment } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { MDXContent } from "@/components/mdx-content";
import { formatTimestamp, getAvatarLetter } from "@/lib/reddit";

interface CommentItemProps {
  comment: Comment;
}

export default function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className="border border-[#343536] rounded-md p-3 bg-[#1a1a1b]">
      <div className="flex items-center text-xs text-[#818384] mb-2">
        <Avatar className="h-6 w-6 mr-2 ">
          <AvatarImage
            src={comment.avatar}
            alt={`Avatar of ${comment.author}`}
          />
          <AvatarFallback>
            {getAvatarLetter(comment.author)}
          </AvatarFallback>
        </Avatar>
        <span className="font-medium text-white">
          u/{comment.author}
        </span>
        <span className="mx-1">•</span>
        <span>{formatTimestamp(comment.created_utc)}</span>
      </div>
      <div className="text-sm">
        <MDXContent content={comment.body} />
      </div>
      <div className="mt-2 text-xs text-[#818384]">
        {comment.score} points
      </div>
    </div>
  );
}