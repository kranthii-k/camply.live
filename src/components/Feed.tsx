import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { Filter, Plus, Search as SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { CreatePost } from "./CreatePost";
import { Input } from "@/components/ui/input";


interface Post {
  id: string;
  username: string;
  trustLevel: "bronze" | "silver" | "gold" | "platinum";
  timeAgo: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  category: "query" | "solution" | "job" | "discussion";
}


export function Feed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [activeFilter, setActiveFilter] = useState("all");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/posts")
        if (!response.ok) throw new Error("Failed to connect");

        const data = await response.json()
        const formattedData = data.map((post: any) => ({
          ...post,
          id: post._id,
          timeAgo: new Date(post.createdAt).toLocaleDateString(),
          trustLevel: post.trustLevel.toLowerCase(),
          category : post.category.toLowerCase()
        }))
        setPosts(formattedData)
      } catch (error) {
        console.error("Error fetching posts:", error)
        toast({                  // <--- STEP 3
          variant: "destructive",
          title: "Connection Error",
          description: "Could not load posts from the server."
        })
      }
    }
    fetchPosts()
  }, [])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === "all" ? "all posts" : filter} posts`,
    });
  };

  const handlePostCreated = (newPost : any) => {
    // We must format the single new post to match our UI Interface
    const formattedNewPost: Post = {
      ...newPost,
      id: newPost._id, // Map _id -> id
      timeAgo: new Date(newPost.createdAt).toLocaleDateString(), // Map createdAt -> timeAgo
      trustLevel: newPost.trustLevel.toLowerCase(),
      category: newPost.category.toLowerCase()
    };

    setPosts([formattedNewPost, ...posts]);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (activeFilter === "all") return true;
    if (activeFilter === "queries") return post.category === "query";
    if (activeFilter === "solutions") return post.category === "solution";
    if (activeFilter === "jobs") return post.category === "job";
    if (activeFilter === "discussions") return post.category === "discussion";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur p-4 border-b md:border-none">
        <h1 className="text-xl font-bold text-foreground md:hidden">Camply</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => toast({ title: "Filter", description: "Filter options opened!" })}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setShowCreatePost(true)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts, users, topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-12"
          />
        </div>
      </div>

      {/* Filter Tabs - Desktop */}
      <div className="hidden md:flex items-center gap-2 px-4">
        <Button
          variant={activeFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick("all")}
        >
          All
        </Button>
        <Button
          variant={activeFilter === "queries" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick("queries")}
        >
          Queries
        </Button>
        <Button
          variant={activeFilter === "solutions" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick("solutions")}
        >
          Solutions
        </Button>
        <Button
          variant={activeFilter === "jobs" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick("jobs")}
        >
          Jobs
        </Button>
        <Button
          variant={activeFilter === "discussions" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFilterClick("discussions")}
        >
          Discussions
        </Button>
      </div>

      {/* Posts */}
      <div className="space-y-4 px-4 pb-20 md:pb-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={handlePostCreated}
        />
      )}
    </div>
  );
}