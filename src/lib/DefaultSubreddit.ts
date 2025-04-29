import {
  Star,
  FileText,
  Globe,
  MessageSquare,
  Gamepad2,
  Atom,
} from "lucide-react";

import { Subreddit } from "@/types";

export const defaultSubreddit: Subreddit[] = [
  {
    name: "popular",
    displayName: "Popular",
    count: 0,
    icon: Star,
  },
  {
    name: "all",
    displayName: "All",
    count: 0,
    icon: Globe,
  },
  {
    name: "news",
    displayName: "News",
    count: 0,
    icon: FileText,
  },
  {
    name: "worldnews",
    displayName: "Worldnews",
    count: 0,
    icon: Globe,
  },
  {
    name: "funny",
    displayName: "Funny",
    count: 0,
    icon: MessageSquare,
  },
  {
    name: "askreddit",
    displayName: "Askreddit",
    count: 0,
    icon: MessageSquare,
  },
  {
    name: "gaming",
    displayName: "Gaming",
    count: 0,
    icon: Gamepad2,
  },
  {
    name: "science",
    displayName: "Science",
    count: 0,
    icon: Atom,
  },
];
