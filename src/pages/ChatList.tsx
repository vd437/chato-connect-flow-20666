import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare, Circle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
  hasStory?: boolean;
  storySeenStatus?: "unseen" | "seen" | "none";
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    lastMessage: "Hey! How are you doing?",
    timestamp: "2m ago",
    unread: 2,
    online: true,
    hasStory: true,
    storySeenStatus: "unseen",
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    lastMessage: "Thanks for the help earlier!",
    timestamp: "1h ago",
    unread: 0,
    online: true,
    hasStory: true,
    storySeenStatus: "seen",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    lastMessage: "See you tomorrow 👋",
    timestamp: "3h ago",
    unread: 0,
    online: false,
    hasStory: false,
    storySeenStatus: "none",
  },
  {
    id: "4",
    name: "Alex Turner",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    lastMessage: "Did you see the photos?",
    timestamp: "1d ago",
    unread: 5,
    online: false,
    hasStory: false,
    storySeenStatus: "none",
  },
];

export default function ChatList() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border backdrop-blur-lg bg-card/80">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold">chato chato</h1>
            </div>
            <Button variant="ghost" size="icon" onClick={() => navigate("/stories")}>
              <Circle className="h-5 w-5" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="container max-w-2xl mx-auto px-4 py-2">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-accent/50 cursor-pointer transition-all animate-fade-in group"
            >
              <div className="relative">
                {chat.hasStory && chat.storySeenStatus !== "none" ? (
                  <div
                    className={`p-0.5 rounded-full ${
                      chat.storySeenStatus === "unseen"
                        ? "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700"
                        : "bg-muted"
                    }`}
                  >
                    <Avatar className="w-14 h-14 border-2 border-background">
                      <AvatarImage src={chat.avatar} alt={chat.name} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <Avatar className="w-14 h-14 border-2 border-primary/20">
                    <AvatarImage src={chat.avatar} alt={chat.name} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                )}
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-success rounded-full border-2 border-background" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-foreground truncate">
                    {chat.name}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {chat.lastMessage}
                </p>
              </div>

              {chat.unread > 0 && (
                <div className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
