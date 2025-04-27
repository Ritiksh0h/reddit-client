import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { FileText, MessageSquare } from "lucide-react";
import { getAvatarLetter } from "@/lib/reddit";

interface UserHoverCardProps {
  username: string;
  avatar?: string;
  children: React.ReactNode;
}

export default function UserHoverCard({ 
  username, 
  avatar, 
  children 
}: UserHoverCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span className="hover:underline cursor-pointer">
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 bg-[#1a1a1b] border-[#343536] text-[#d7dadc]">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={avatar}
              alt={`Avatar of ${username}`}
            />
            <AvatarFallback>
              {getAvatarLetter(username)}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">
              u/{username}
            </h4>
            <div className="text-xs text-[#818384]">
              <div className="flex items-center">
                <FileText className="mr-1 h-3 w-3" />
                <span>Post Karma: 12,345</span>
              </div>
              <div className="flex items-center">
                <MessageSquare className="mr-1 h-3 w-3" />
                <span>Comment Karma: 6,789</span>
              </div>
            </div>
            <div className="flex items-center pt-2">
              <Button
                variant="outline"
                className="h-8 w-full text-xs border-[#343536] bg-[#272729] hover:bg-[#343536] text-[#d7dadc]"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}