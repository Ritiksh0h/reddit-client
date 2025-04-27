// types/index.ts
import { ReactNode } from "react";

export interface SubredditPost {
  id: string;
  title: string;
  author: string;
  score: number;
  num_comments: number;
  created_utc: number;
  permalink: string;
  url: string;
  is_self: boolean;
  thumbnail: string;
  selftext: string;
  subreddit: string;
  avatar?: string; // Avatar URL or null if not available
}

export interface Subreddit {
  name: string;
  displayName: string;
  count: number;
  icon: ReactNode;
  isCustom?: boolean; // Flag to indicate if this is a user-added subreddit
}

export interface Comment {
  id: string;
  author: string;
  body: string;
  created_utc: number;
  score: number;
  avatar?: string;
  replies?: {
    data: {
      children: Array<{
        data: Comment;
      }>;
    };
  };
}