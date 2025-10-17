import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StoryViewer } from "@/components/StoryViewer";
import { CreateStoryDialog } from "@/components/CreateStoryDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Story {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  items: StoryItem[];
  seen: boolean;
  timestamp: Date;
}

interface StoryItem {
  id: string;
  type: "image" | "video" | "text";
  content: string;
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  duration: number;
}

const Stories = () => {
  const navigate = useNavigate();
  const [stories] = useState<Story[]>([
    {
      id: "1",
      userId: "user1",
      userName: "Sarah Connor",
      userAvatar: "/placeholder.svg",
      seen: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      items: [
        {
          id: "s1",
          type: "image",
          content: "/placeholder.svg",
          text: "Beautiful day!",
          duration: 5000,
        },
      ],
    },
    {
      id: "2",
      userId: "user2",
      userName: "John Smith",
      userAvatar: "/placeholder.svg",
      seen: true,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      items: [
        {
          id: "s2",
          type: "text",
          content: "Hello World!",
          backgroundColor: "#6366f1",
          textColor: "#ffffff",
          duration: 5000,
        },
      ],
    },
  ]);

  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const currentUser = {
    id: "current-user",
    name: "You",
    avatar: "/placeholder.svg",
  };

  const handleStoryClick = (index: number) => {
    setSelectedStoryIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedStoryIndex(null);
  };

  const handleNextStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex < stories.length - 1) {
      setSelectedStoryIndex(selectedStoryIndex + 1);
    } else {
      handleCloseViewer();
    }
  };

  const handlePreviousStory = () => {
    if (selectedStoryIndex !== null && selectedStoryIndex > 0) {
      setSelectedStoryIndex(selectedStoryIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Stories</h1>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <button
            onClick={() => setCreateDialogOpen(true)}
            className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors"
          >
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                <Plus className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
            <span className="text-sm font-medium">Add Story</span>
          </button>

          {stories.map((story, index) => (
            <button
              key={story.id}
              onClick={() => handleStoryClick(index)}
              className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-accent transition-colors"
            >
              <div
                className={`p-0.5 rounded-full ${
                  story.seen
                    ? "bg-muted"
                    : "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-700"
                }`}
              >
                <Avatar className="h-20 w-20 border-2 border-background">
                  <AvatarImage src={story.userAvatar} alt={story.userName} />
                  <AvatarFallback>{story.userName[0]}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-sm font-medium truncate w-full text-center">
                {story.userName}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedStoryIndex !== null && (
        <StoryViewer
          story={stories[selectedStoryIndex]}
          onClose={handleCloseViewer}
          onNext={handleNextStory}
          onPrevious={handlePreviousStory}
          hasNext={selectedStoryIndex < stories.length - 1}
          hasPrevious={selectedStoryIndex > 0}
        />
      )}

      <CreateStoryDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        currentUser={currentUser}
      />
    </div>
  );
};

export default Stories;
