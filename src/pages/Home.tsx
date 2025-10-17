import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, MessageSquare, PartyPopper, Users, Send, Shield } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              chato chato
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-3xl shadow-card border border-border p-8 text-center animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-warm mb-6">
              <PartyPopper className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Welcome to chato chato!</h2>
            <p className="text-muted-foreground text-lg mb-6">
              You're all set! Your account has been created successfully.
            </p>
            <div className="bg-secondary/50 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Start connecting with friends and family
                </p>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Send className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Send messages, photos, and videos
                </p>
              </div>
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Your conversations are private and secure
                </p>
              </div>
            </div>
            <Button 
              size="lg" 
              className="rounded-full shadow-glow mt-8 w-full"
              onClick={() => navigate("/chats")}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Start Messaging
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
