import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { Filter, Plus } from "lucide-react";

const mockPosts = [
  {
    id: "1",
    username: "@dev_student_2024",
    trustLevel: "silver" as const,
    timeAgo: "2h ago",
    content: "Can anyone help me understand how to implement OAuth 2.0 in a React app? I'm getting confused with the flow and token management. Any good resources or step-by-step guides?",
    upvotes: 23,
    downvotes: 2,
    comments: 8,
    category: "query" as const
  },
  {
    id: "2", 
    username: "@system_architect_pro",
    trustLevel: "platinum" as const,
    timeAgo: "4h ago",
    content: "Here's a complete guide to microservices architecture that helped me land my FAANG internship. Key points: API Gateway, Service Discovery, Circuit Breakers, and proper monitoring. DM for detailed breakdown!",
    upvotes: 156,
    downvotes: 4,
    comments: 34,
    category: "solution" as const
  },
  {
    id: "3",
    username: "@startup_hunter",
    trustLevel: "gold" as const,
    timeAgo: "6h ago", 
    content: "Looking for a referral at Meta or Google for SWE New Grad 2025. Have solid projects including a distributed chat app and ML recommendation system. GPA: 3.8/4.0. Can share resume!",
    upvotes: 45,
    downvotes: 1,
    comments: 12,
    category: "job" as const
  },
  {
    id: "4",
    username: "@ml_enthusiast",
    trustLevel: "gold" as const,
    timeAgo: "8h ago",
    content: "Just finished implementing a neural network from scratch in Python! The math behind backpropagation finally clicked. Happy to share my notes and code walkthrough with anyone interested in ML fundamentals.",
    upvotes: 89,
    downvotes: 3,
    comments: 18,
    category: "solution" as const
  },
  {
    id: "5",
    username: "@hackathon_queen",
    trustLevel: "silver" as const,
    timeAgo: "12h ago",
    content: "Team won 1st place at Stanford TreeHacks! Our project was an AI-powered study planner that adapts to your learning style. Looking to turn this into a startup - need a business co-founder!",
    upvotes: 234,
    downvotes: 8,
    comments: 67,
    category: "discussion" as const
  }
];

export function Feed() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur p-4 border-b md:border-none">
        <h1 className="text-xl font-bold text-foreground md:hidden">StudNet</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs - Desktop */}
      <div className="hidden md:flex items-center gap-2 px-4">
        <Button variant="outline" size="sm">All</Button>
        <Button variant="outline" size="sm">Queries</Button>
        <Button variant="outline" size="sm">Solutions</Button>
        <Button variant="outline" size="sm">Jobs</Button>
        <Button variant="outline" size="sm">Discussions</Button>
      </div>

      {/* Posts */}
      <div className="space-y-4 px-4 pb-20 md:pb-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
}