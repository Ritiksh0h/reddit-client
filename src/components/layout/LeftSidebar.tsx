
import { Subreddit } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import SubredditItem from "@/components/subreddit/SubredditItem";
import AddSubredditDialog from "@/components/subreddit/AddSubredditDialog";
import { getAvatarLetter } from "@/lib/reddit";
import { toast } from "sonner";
import { MessageSquare } from "lucide-react";

interface LeftSidebarProps {
  subreddits: Subreddit[];
  selectedSubreddit: string;
  onSelectSubreddit: (name: string) => void;
  onAddSubreddit: (subreddit: Subreddit) => void;
  onDeleteSubreddit: (name: string) => void;
  onRefreshSubreddit: (name: string) => void;
}

export default function LeftSidebar({
  subreddits,
  selectedSubreddit,
  onSelectSubreddit,
  onAddSubreddit,
  onDeleteSubreddit,
  onRefreshSubreddit,
}: LeftSidebarProps) {
  const handleAddSubreddit = (name: string) => {
    // Check if subreddit already exists in our list
    if (subreddits.some((sub) => sub.name.toLowerCase() === name.toLowerCase())) {
      toast("This subreddit is already in your list");
      return;
    }

    // Create new subreddit object
    const newSubreddit: Subreddit = {
      name: name,
      displayName: name.charAt(0).toUpperCase() + name.slice(1),
      count: 0,
      icon: <MessageSquare className="h-4 w-4" />, // Default icon
      isCustom: true,
    };

    // Add subreddit and switch to it
    onAddSubreddit(newSubreddit);
    onSelectSubreddit(name);
    toast(`Subreddit 'r/${name}' added`);
  };

  return (
    <div className="w-60 border-r border-[#343536] flex flex-col">
      <div className="p-3 border-b border-[#343536] flex items-center">
        <Avatar className="h-8 w-8 mr-3 ">
          <AvatarImage src="/logo.png" alt="Reddit Client" />
          <AvatarFallback>{getAvatarLetter("Reddit Client")}</AvatarFallback>
        </Avatar>
        <span className="font-bold">Reddit Client</span>
      </div>

      <ScrollArea className="flex-1 overflow-auto">
        <div className="p-2 space-y-0.5">
          <AddSubredditDialog onAddSubreddit={handleAddSubreddit} />

          <Separator className="my-2" />
          
          {subreddits.map((subreddit) => (
            <SubredditItem
              key={subreddit.name}
              subreddit={subreddit}
              isSelected={selectedSubreddit === subreddit.name}
              onSelect={onSelectSubreddit}
              onDelete={onDeleteSubreddit}
              onRefresh={onRefreshSubreddit}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-2 border-t border-[#343536]">
        <ThemeToggle />
      </div>
    </div>
  );
}