import { Subreddit } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface SubredditItemProps {
  subreddit: Subreddit;
  isSelected: boolean;
  onSelect: (name: string) => void;
  onDelete: (name: string) => void;
  onRefresh: (name: string) => void;
}

export default function SubredditItem({
  subreddit,
  isSelected,
  onSelect,
  onDelete,
  onRefresh,
}: SubredditItemProps) {
  const handleDelete = () => {
    if (!subreddit.isCustom) {
      toast("Default subreddits cannot be deleted");
      return;
    }
    onDelete(subreddit.name);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          variant={isSelected ? "secondary" : "ghost"}
          size="lg"
          className="w-full flex items-center justify-start gap-3"
          onClick={() => onSelect(subreddit.name)}
        >
          {subreddit.icon}
          <span>R/{subreddit.displayName}</span>

          {subreddit.count > 0 && (
            <Badge
              variant="outline"
              className="ml-auto bg-transparent text-[#818384] border-[#343536]"
            >
              {subreddit.count}
            </Badge>
          )}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onRefresh(subreddit.name)}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </ContextMenuItem>
        <ContextMenuItem
          onClick={handleDelete}
          disabled={!subreddit.isCustom}
          className={
            !subreddit.isCustom ? "text-gray-500 cursor-not-allowed" : ""
          }
        >
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}