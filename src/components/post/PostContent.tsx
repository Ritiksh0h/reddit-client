import { SubredditPost } from "@/types";
import { MDXContent } from "@/components/mdx-content";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PostContentProps {
  post: SubredditPost;
}

export default function PostContent({ post }: PostContentProps) {
  const hasImage = post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/);
  
  return (
    <div className="space-y-4">
      {post.selftext && (
        <div className="text-sm">
          <MDXContent content={post.selftext} />
        </div>
      )}

      {hasImage && (
        <div className="flex justify-center">
          <Image
            width={500}
            height={500}
            src={post.url || "/placeholder.svg"}
            alt={post.title}
            className="max-h-96 object-contain rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      )}

      <div className="flex items-center gap-4">
        <Badge className="bg-[#272729] text-white hover:bg-[#343536] border-none">
          {post.score} upvotes
        </Badge>
        <Badge className="bg-transparent text-[#818384] hover:bg-[#272729] border-[#343536]">
          {post.num_comments} comments
        </Badge>
      </div>

      <Separator className="bg-[#343536]" />
    </div>
  );
}