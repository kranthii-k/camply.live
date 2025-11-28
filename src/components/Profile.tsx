import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrustBadge } from "@/components/TrustBadge";
import { Settings, Share, Calendar, MapPin } from "lucide-react";
import { useCurrentUser, useLogout } from "@/hooks/api/useAuth";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { data: user, isLoading } = useCurrentUser();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur p-4 border-b md:border-none">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground md:hidden">Profile</h1>
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="sm">
              <Share className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button 
              // variant="ghost" 
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-6 pb-20 md:pb-4">
        {/* Profile Card */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-2xl">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            
            {/* User Info */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold text-foreground">@{user.username}</h2>
                <TrustBadge level={user.trustLevel} />
              </div>
              <p className="text-lg font-medium text-foreground">{user.name}</p>
              {(user.college || user.location) && (
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mt-2">
                  {user.college && <span>{user.college}</span>}
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span>{user.location}</span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="text-sm text-foreground leading-relaxed max-w-md mx-auto">
                {user.bio}
              </p>
            )}

            {/* Skills */}
            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {user.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">{skill}</Badge>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.stats.posts}</p>
            <p className="text-xs text-muted-foreground">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.stats.upvotes}</p>
            <p className="text-xs text-muted-foreground">Upvotes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.stats.comments}</p>
            <p className="text-xs text-muted-foreground">Comments</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.stats.followers}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{user.stats.following}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>

        {/* Trust Level Progress */}
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="font-semibold text-foreground">Trust Level: {user.trustLevel}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Score: {user.trustScore}</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-badge-gold h-2 rounded-full" 
                style={{ width: `${Math.min((user.trustScore / 500) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full">Edit Profile</Button>
          <Button variant="hero" className="w-full">Upgrade to Premium</Button>
        </div>
      </div>
    </div>
  );
}