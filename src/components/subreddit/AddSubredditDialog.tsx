import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { validateSubreddit } from "@/lib/reddit";
import { toast } from "sonner";

interface AddSubredditDialogProps {
  onAddSubreddit: (name: string) => void;
}

export default function AddSubredditDialog({ onAddSubreddit }: AddSubredditDialogProps) {
  const [open, setOpen] = useState(false);
  const [newSubredditName, setNewSubredditName] = useState("");

  const handleAddSubreddit = async () => {
    if (!newSubredditName.trim()) {
      toast("Please enter a subreddit name");
      return;
    }

    // Clean up the subreddit name
    const normalizedName = newSubredditName.trim().toLowerCase();

    // Validate if the subreddit exists on Reddit
    const exists = await validateSubreddit(normalizedName);
    
    if (!exists) {
      toast(`Subreddit 'r/${normalizedName}' not found`);
      return;
    }

    // If subreddit exists, add it
    onAddSubreddit(normalizedName);
    
    // Clear the input field and close dialog
    setNewSubredditName("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="w-full flex items-center justify-start gap-3 cursor-pointer"
        >
          <Plus /> Add Subreddit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a Subreddit</DialogTitle>
          <DialogDescription>
            Enter the name of the subreddit you want to add. The
            subreddit must exist on Reddit.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={newSubredditName}
          onChange={(e) => setNewSubredditName(e.target.value)}
          placeholder="Enter subreddit name (e.g. reactjs)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSubreddit();
            }
          }}
        />
        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            variant="default"
            onClick={handleAddSubreddit}
          >
            Add
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setNewSubredditName("");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}