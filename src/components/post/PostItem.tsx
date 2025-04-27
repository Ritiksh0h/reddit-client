import { SubredditPost } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import UserHoverCard from "@/components/common/UserHoverCard";
import { cn } from "@/lib/utils";
import { formatTimestamp, getAvatarLetter } from "@/lib/reddit";

interface PostItemProps {
  post: SubredditPost;
  isSelected: boolean;
  onSelect: (post: SubredditPost) => void;
}

export default function PostItem({ post, isSelected, onSelect }: PostItemProps) {
  return (
    <button
      className={cn(
        "w-full text-left p-4 border-b border-[#343536] hover:bg-[#272729]",
        isSelected && "bg-[#272729]"
      )}
      onClick={() => onSelect(post)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 mt-1 bg-[#272729] text-white">
          <AvatarImage
            src={post.avatar}
            alt={`Avatar of ${post.author}`}
          />
          <AvatarFallback>
            {getAvatarLetter(post.author)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-[#818384] text-xs mb-1">
            <UserHoverCard username={post.author} avatar={post.avatar}>
              u/{post.author}
            </UserHoverCard>
            <span className="mx-1">•</span>
            <span>{formatTimestamp(post.created_utc)}</span>
          </div>
          <h3 className="font-medium text-sm mb-1">{post.title}</h3>
          {post.selftext && (
            <p className="text-xs text-[#818384] line-clamp-2 mb-2">
              {post.selftext || "No description"}
            </p>
          )}
          <div className="flex items-center gap-3 text-xs text-[#818384]">
            <div className="flex items-center gap-1">
              <span>{post.score} upvotes</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{post.num_comments} comments</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}