import { SubredditPost } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { formatTimestamp, getAvatarLetter } from "@/lib/reddit";

interface PostHeaderProps {
  post: SubredditPost;
}

export default function PostHeader({ post }: PostHeaderProps) {
  return (
    <div className="p-4 border-b border-[#343536]">
      <div className="mb-2">
        <div className="text-xs text-[#818384] mb-1 flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            <AvatarImage
              src={post.avatar}
              alt={`Avatar of ${post.author}`}
            />
            <AvatarFallback>
              {getAvatarLetter(post.author)}
            </AvatarFallback>
          </Avatar>
          Posted by u/{post.author} • {formatTimestamp(post.created_utc)}
        </div>
        <h2 className="text-xl font-bold">{post.title}</h2>
        <div className="text-xs text-[#818384] mt-1">
          Reply-To: u/{post.author}
        </div>
      </div>
    </div>
  );
}