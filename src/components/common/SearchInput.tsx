import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ 
  value, 
  onChange, 
  placeholder = "Search" 
}: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#818384]" />
      <Input
        placeholder={placeholder}
        className="pl-9 bg-[#272729] border-[#343536] text-[#d7dadc] placeholder:text-[#818384] focus-visible:ring-0 focus-visible:ring-offset-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}