import { Button } from "@/components/ui/button";
import { RefreshCw, MoreVertical } from "lucide-react";
import SearchInput from "@/components/common/SearchInput";

interface SubredditHeaderProps {
  subredditName: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
}

export default function SubredditHeader({
  subredditName,
  searchQuery,
  onSearchChange,
  onRefresh,
}: SubredditHeaderProps) {
  const displayName = subredditName.charAt(0).toUpperCase() + subredditName.slice(1);
  
  return (
    <div className="p-3 border-b border-[#343536]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold">
          R/{displayName}
        </h2>
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
            variant="ghost"
            size="icon"
            className="text-[#818384] hover:text-white hover:bg-[#272729]"
          >
            <MoreVertical className="h-5 w-5" />
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