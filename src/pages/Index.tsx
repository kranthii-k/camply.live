import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PostCard } from "@/components/PostCard";
import { DailyProblem } from "@/components/DailyProblem";
import { HackathonMatch } from "@/components/HackathonMatch";
import { TrustBadge } from "@/components/TrustBadge";
import { Users, Shield, Brain, Zap, Search, Filter } from "lucide-react";
import heroImage from "@/assets/hero-networking.jpg";

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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-foreground">StudNet</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="hero" size="sm">Join Network</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div 
          className="relative h-96 bg-cover bg-center flex items-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Where Students Connect, Learn & Grow
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90 animate-fade-in">
              The anonymous networking platform built for students. Share knowledge, find opportunities, and build meaningful connections.
            </p>
            <div className="flex gap-4 justify-center animate-fade-in">
              <Button variant="accent" size="lg">
                Start Networking
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why StudNet?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed specifically for students, by students. Our platform combines the best of social networking with academic focus.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 animate-fade-in">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Anonymous & Safe</h3>
              <p className="text-sm text-muted-foreground">Pseudo-anonymous profiles with verified student status</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 animate-fade-in">
              <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">Smart content curation and automatic moderation</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 animate-fade-in">
              <Zap className="h-12 w-12 text-badge-gold mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Trust System</h3>
              <p className="text-sm text-muted-foreground">Earn badges through quality contributions</p>
            </Card>
            <Card className="p-6 text-center hover:shadow-medium transition-all duration-300 animate-fade-in">
              <Users className="h-12 w-12 text-badge-platinum mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Find Teammates</h3>
              <p className="text-sm text-muted-foreground">Match with hackathon partners and collaborators</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Daily Problem */}
            <div className="space-y-6">
              <DailyProblem />
              <HackathonMatch />
            </div>

            {/* Main Feed */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Latest Posts</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">New</Button>
                  <Button variant="outline" size="sm">Trending</Button>
                  <Button variant="outline" size="sm">Answered</Button>
                </div>
              </div>
              
              {mockPosts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>

            {/* Right Sidebar - Trust Levels */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Trust Levels</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <TrustBadge level="bronze" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">New Member</p>
                      <p className="text-muted-foreground">Getting started</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrustBadge level="silver" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Active Contributor</p>
                      <p className="text-muted-foreground">Regular participation</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrustBadge level="gold" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Trusted Expert</p>
                      <p className="text-muted-foreground">High-quality content</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <TrustBadge level="platinum" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Elite Member</p>
                      <p className="text-muted-foreground">Community leader</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Get Started</h3>
                <div className="space-y-3 text-sm">
                  <p className="text-muted-foreground">Ready to join the network?</p>
                  <Button variant="hero" className="w-full">
                    Verify Student Status
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    One-time verification required
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
