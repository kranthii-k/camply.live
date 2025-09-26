import { Navigation } from "@/components/Navigation";
import { Feed } from "@/components/Feed";
import { Search } from "@/components/Search";
import { Explore } from "@/components/Explore";
import { Match } from "@/components/Match";
import { Placements } from "@/components/Placements";
import { Profile } from "@/components/Profile";
import { CreatePost } from "@/components/CreatePost";
import { useState } from "react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("feed");
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleTabChange = (tab: string) => {
    if (tab === "post") {
      setShowCreatePost(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "feed":
        return <Feed />;
      case "search":
        return <Search />;
      case "daily":
        return <Explore />;
      case "match":
        return <Match />;
      case "placements":
        return <Placements />;
      case "profile":
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
      
      {/* Main Content */}
      <main className="md:ml-64">
        <div className="max-w-2xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </div>
  );
};

export default Index;
