import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
import { Heart, X, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface HackathonProfile {
  id: string;
  username: string;
  trustLevel: "bronze" | "silver" | "gold" | "platinum";
  skills: string[];
  location: string;
  experience: string;
  lookingFor: string;
  hackathon: string;
  bio: string;
}

const mockProfile: HackathonProfile = {
  id: "1",
  username: "@code_ninja_99",
  trustLevel: "gold",
  skills: ["React", "Node.js", "Python", "ML"],
  location: "San Francisco, CA",
  experience: "3+ years",
  lookingFor: "Backend Developer",
  hackathon: "TechCrunch Disrupt 2024",
  bio: "Passionate full-stack developer looking for a ML expert to build an AI-powered fintech solution!"
};

export function HackathonMatch() {
  const [currentAction, setCurrentAction] = useState<"like" | "pass" | null>(null);
  const { toast } = useToast();

  const handleAction = (action: "like" | "pass") => {
    setCurrentAction(action);
    
    if (action === "like") {
      toast({
        title: "Match Sent! 🎉",
        description: "Your connection request has been sent to @code_ninja_99",
      });
    } else {
      toast({
        title: "Finding Next Teammate",
        description: "Loading the next potential teammate...",
      });
    }
    
    // Simulate loading next profile
    setTimeout(() => {
      setCurrentAction(null);
    }, 2000);
  };

  return (
    <Card className="p-6 max-w-md mx-auto shadow-medium animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="h-5 w-5 text-accent" />
        <h2 className="text-lg font-semibold text-foreground">Hackathon Match</h2>
      </div>

      <div className="space-y-4">
        {/* Profile Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl font-bold text-foreground">{mockProfile.username}</h3>
            <TrustBadge level={mockProfile.trustLevel} />
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{mockProfile.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{mockProfile.experience}</span>
            </div>
          </div>
        </div>

        {/* Hackathon Info */}
        <div className="p-3 bg-accent/10 rounded-lg text-center">
          <p className="text-sm text-muted-foreground">Looking for</p>
          <p className="font-semibold text-accent">{mockProfile.lookingFor}</p>
          <p className="text-xs text-muted-foreground mt-1">for {mockProfile.hackathon}</p>
        </div>

        {/* Skills */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Skills</p>
          <div className="flex flex-wrap gap-2">
            {mockProfile.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">About</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {mockProfile.bio}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40"
            onClick={() => handleAction("pass")}
            disabled={currentAction !== null}
          >
            <X className="h-5 w-5 text-destructive" />
            Pass
          </Button>
          <Button
            variant="accent"
            size="lg"
            className="flex-1"
            onClick={() => handleAction("like")}
            disabled={currentAction !== null}
          >
            <Heart className="h-5 w-5" />
            Connect
          </Button>
        </div>

        {currentAction && (
          <div className="text-center p-4 bg-primary/5 rounded-lg animate-bounce-in">
            <p className="text-sm text-primary font-medium">
              {currentAction === "like" ? "Match sent! 🎉" : "Finding next teammate..."}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}