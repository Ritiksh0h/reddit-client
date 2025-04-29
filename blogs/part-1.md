# Building a Reddit Client with Next.js and React - Part 1: Project Setup and Core Structure

Welcome to this comprehensive tutorial series where we'll build a Reddit client application from scratch using Next.js, React, and modern web development practices. By the end of this series, you'll have a fully functional Reddit client that allows users to browse posts from different subreddits, view post details, read comments, and manage their favorite subreddits.

## What We're Building

Our Reddit client will feature:

- A responsive layout with sidebar, post list, and post detail views
- Ability to browse default and custom subreddits
- Post viewing with full content and comments
- Subreddit management (add/delete custom subreddits)
- Search functionality
- Sorting options for posts
- Dark/light mode theme support

The UI will be inspired by Reddit's design but with an email-client-like interface for easier content consumption.

![Reddit Client Interface](/api/placeholder/800/450)

## Tech Stack

- **Frontend Framework**: Next.js 14+ with React 18+
- **Styling**: Tailwind CSS for utility-first styling
- **UI Components**: shadcn/ui component library
- **State Management**: React's built-in state and context API
- **Data Fetching**: Native fetch API
- **Notifications**: Sonner for toast notifications
- **Markdown Rendering**: React Markdown for post content

## Prerequisites

Before starting, make sure you have:

- Node.js (v18+) installed
- Basic understanding of React and TypeScript
- Familiarity with modern JavaScript (ES6+)
- Understanding of CSS and Tailwind CSS basics

## Part 1: Project Setup and Core Structure

### Creating the Next.js Project

Let's start by setting up a new Next.js project with TypeScript:

```bash
npx create-next-app@latest reddit-client
```

During the setup, choose the following options:
- Use TypeScript: Yes
- Use ESLint: Yes
- Use Tailwind CSS: Yes
- Use `src/` directory: Yes
- Use App Router: Yes
- Import alias: Yes (default @/*)

### Installing Dependencies

Next, let's install the required dependencies:

```bash
cd reddit-client
npm install lucide-react sonner react-markdown remark-gfm date-fns
npm install @radix-ui/react-avatar @radix-ui/react-context-menu @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-hover-card @radix-ui/react-popover @radix-ui/react-scroll-area @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-tooltip
npm install class-variance-authority tailwind-merge clsx next-themes
```

### Setting Up the shadcn/ui Components

We'll use shadcn/ui, which provides high-quality, accessible, and customizable React components built on top of Radix UI:

```bash
npx shadcn-ui@latest init
```

Choose dark theme, default base color, and the available global CSS file.

Now, let's install the basic components we'll need:

```bash
npx shadcn-ui@latest add button avatar badge card dialog dropdown-menu input scroll-area separator skeleton tooltip
```

### Project Structure

Let's organize our project with the following structure:

```
src/
├── app/                    # Next.js app router
├── components/             # React components
│   ├── common/             # Common UI components
│   ├── layout/             # Layout components
│   ├── post/               # Post-related components
│   ├── subreddit/          # Subreddit-related components
│   ├── comment/            # Comment-related components
│   └── ui/                 # shadcn UI components
├── hooks/                  # Custom hooks
├── lib/                    # Utility functions
└── types/                  # TypeScript type definitions
```

### Creating Basic Types

Let's define our core types in `src/types/index.ts`:

```typescript
// types/index.ts
import { LucideIcon } from "lucide-react";

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
  icon: LucideIcon;
  isCustom?: boolean;
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
```

### Utility Functions

Let's create some utility functions in `src/lib/utils.ts`:

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Setting Up the Theme Provider

Create `src/components/theme-provider.tsx` for dark/light mode support:

```tsx
// components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Setting Up the Theme Toggle Component

Create `src/components/theme-toggle.tsx` for switching between themes:

```tsx
// components/theme-toggle.tsx
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Creating the Root Layout

Let's update our root layout to include the theme provider:

```tsx
// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reddit Client",
  description: "A Reddit client with an email-like interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Setting Up the Default Subreddits

Create `src/lib/DefaultSubreddit.ts` to define our default subreddits:

```typescript
// lib/DefaultSubreddit.ts
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
```

### Creating Reddit API Utility Functions

Let's create some utility functions for fetching data from Reddit in `src/lib/reddit.ts`:

```typescript
// lib/reddit.ts
import { SubredditPost, Comment } from "@/types";
import { toast } from "sonner";

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

// We'll add more functions in the next parts...
```

### Building the Basic Home Page

Create the main page in `src/app/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Subreddit, SubredditPost } from "@/types";
import { defaultSubreddit } from "@/lib/DefaultSubreddit";

export default function Home() {
  const [subreddits, setSubreddits] = useState<Subreddit[]>(defaultSubreddit);
  const [selectedSubreddit, setSelectedSubreddit] = useState<string>("popular");
  const [selectedPost, setSelectedPost] = useState<SubredditPost | null>(null);
  
  return (
    <div className="flex h-screen bg-[#1a1a1b] text-[#d7dadc]">
      <div className="w-60 border-r border-[#343536]">
        {/* Sidebar will go here */}
        <div className="p-3 border-b border-[#343536]">
          <span className="font-bold">Reddit Client</span>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-[450px] border-r border-[#343536]">
          {/* Post list will go here */}
          <div className="p-3 border-b border-[#343536]">
            <h2 className="text-lg font-bold">R/Popular</h2>
          </div>
        </div>

        <div className="flex-1">
          {/* Post detail will go here */}
          <div className="flex items-center justify-center h-full text-[#818384]">
            Select a post to view details
          </div>
        </div>
      </div>
    </div>
  );
}
```

## What's Next?

In this first part, we've set up the project structure, installed dependencies, and created the foundational components and types for our Reddit client. We've also set up theme support and created utility functions for fetching data from Reddit.

In the next part, we'll build the sidebar component and implement subreddit management functionality, including adding and removing subreddits.

Stay tuned for Part 2: Building the Sidebar and Subreddit Management!