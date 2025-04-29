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

export default function PostItem({
  post,
  isSelected,
  onSelect,
}: PostItemProps) {
  return (
    <button
      className={cn(
        "w-full text-left p-4 sm:p-5 border-b border-[#343536] hover:bg-[#272729] transition-colors duration-200",
        isSelected && "bg-[#272729]"
      )}
      onClick={() => onSelect(post)}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8 mt-1 bg-[#272729] text-white shrink-0">
          <AvatarImage src={post.avatar} alt={`Avatar of ${post.author}`} />
          <AvatarFallback>{getAvatarLetter(post.author)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center text-[#818384] text-xs mb-1 space-x-1">
            <UserHoverCard username={post.author} avatar={post.avatar}>
              <span className="truncate max-w-[120px] sm:max-w-none">
                u/{post.author}
              </span>
            </UserHoverCard>
            <span className="hidden sm:inline">•</span>
            <span className="truncate">
              {formatTimestamp(post.created_utc)}
            </span>
          </div>

          <h3 className="font-medium text-sm sm:text-base mb-1 line-clamp-2">
            {post.title}
          </h3>

          {post.selftext && (
            <p className="text-xs text-[#818384] line-clamp-2 sm:line-clamp-3 mb-2">
              {post.selftext}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#818384]">
            <span>{post.score} upvotes</span>
            <span>{post.num_comments} comments</span>
          </div>
        </div>
      </div>
    </button>
  );
}
