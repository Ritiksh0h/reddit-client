// lib/reddit.ts
import { SubredditPost, Comment } from "@/types";
import { toast } from "sonner";
import { getCachedAvatar, setCachedAvatar } from "@/lib/avatarCache";

// Format timestamp to relative time
export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);
  const now = new Date();

  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays > 0) {
    return `about ${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  } else if (diffInHours > 0) {
    return `about ${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  } else if (diffInMinutes > 0) {
    return `about ${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  } else {
    return "just now";
  }
};

// Get first letter of username for avatar fallback
export const getAvatarLetter = (username: string) => {
  return username.charAt(0).toUpperCase();
};

// Fetch posts from a subreddit
export const fetchPosts = async (subreddit: string, sort: string) => {
  try {
    if (!subreddit) throw new Error("No subreddit provided");

    const url = `https://www.reddit.com/r/${subreddit}/${sort}.json`;

    const response = await fetch(url);
    if (!response.ok) {
      console.warn("First fetch failed, retrying...");
      const retryResponse = await fetch(url);
      if (!retryResponse.ok) {
        throw new Error(`Failed to fetch posts after retry: ${retryResponse.status}`);
      }
      const retryData = await retryResponse.json();
      return retryData.data.children.map((child: { data: SubredditPost }) => ({
        ...child.data,
        subreddit: child.data.subreddit,
        avatar: null,
      }));
    }

    const data = await response.json();
    return data.data.children.map((child: { data: SubredditPost }) => ({
      ...child.data,
      subreddit: child.data.subreddit,
      avatar: null,
    }));
  } catch (error) {
    console.error(`Error fetching posts for r/${subreddit}:`, error);
    toast.error(`Could not load posts for r/${subreddit}. Please try again.`);
    return [];
  }
};

// Fetch comments for a post
export const fetchComments = async (permalink: string) => {
  try {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    if (!response.ok) throw new Error("Failed to fetch comments");

    const data = await response.json();
    if (data[1] && data[1].data && data[1].data.children) {
      const commentPromises = data[1].data.children
        .filter((child: { kind: string }) => child.kind === "t1")
        .map(async (child: { data: Comment }) => {
          const commentData = child.data;
          const avatar = await fetchUserAvatar(commentData.author);
          return {
            ...commentData,
            avatar, // Attach avatar to each comment
          };
        });

      return await Promise.all(commentPromises);
    }
    return [];
  } catch (error) {
    console.error("Error fetching comments:", error);
    toast("Failed to load comments");
    return [];
  }
};

// Fetch user avatar
export const fetchUserAvatar = async (username: string) => {
  // Check cache first
  const cachedAvatar = getCachedAvatar(username);
  if (cachedAvatar !== null) {
    return cachedAvatar;
  }

  try {
    const response = await fetch(
      `https://www.reddit.com/user/${username}/about.json`
    );
    if (!response.ok) throw new Error("Failed to fetch user info");

    const data = await response.json();
    const avatarUrl = data.data.icon_img || null;

    // Save in cache
    setCachedAvatar(username, avatarUrl);

    return avatarUrl;
  } catch (error) {
    console.error("Error fetching user avatar:", error);
    return null;
  }
};


// Validate if subreddit exists
export const validateSubreddit = async (name: string) => {
  try {
    const response = await fetch(
      `https://www.reddit.com/r/${name}/about.json`
    );
    return response.ok;
  } catch (error) {
    console.error("Error validating subreddit:", error);
    return false;
  }
};