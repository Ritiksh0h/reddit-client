import { cn } from "@/lib/utils";

interface SortTabsProps {
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function SortTabs({ sortBy, onSortChange }: SortTabsProps) {
  const sortOptions = [
    { id: "hot", label: "Hot" },
    { id: "new", label: "New" },
    { id: "top", label: "Top" },
    { id: "rising", label: "Rising" },
  ];

  return (
    <div className="flex border-b border-[#343536]">
      {sortOptions.map((option) => (
        <button
          key={option.id}
          className={cn(
            "flex-1 py-2 text-center text-sm font-medium",
            sortBy === option.id
              ? "text-white border-b-2 border-white"
              : "text-[#818384]"
          )}
          onClick={() => onSortChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}