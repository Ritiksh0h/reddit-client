import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2 } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";
import { toast } from "sonner";
import { defaultSubreddit } from "@/lib/DefaultSubreddit";

interface SubredditHeaderProps {
  subredditName: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
  onDelete: (name: string) => void;
}

export default function SubredditHeader({
  subredditName,
  searchQuery,
  onSearchChange,
  onRefresh,
  onDelete,
}: SubredditHeaderProps) {
  const handleDelete = () => {
    if (
      defaultSubreddit.map(
        (subreddit) => subreddit.name === subredditName.toLowerCase()
      )
    ) {
      toast("Default subreddits cannot be deleted");
      return;
    }
    onDelete(subredditName);
  };

  const displayName =
    subredditName.charAt(0).toUpperCase() + subredditName.slice(1);

  return (
    <div className="p-3 border-b border-[#343536]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">R/{displayName}</h2>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-[#818384] hover:text-white hover:bg-[#272729]"
            onClick={onRefresh}
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
          <Button
            onClick={handleDelete}
            variant="ghost"
            size="icon"
            className="text-[#818384] hover:text-white hover:bg-[#272729]"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search in posts"
      />
    </div>
  );
}
