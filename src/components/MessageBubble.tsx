import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  type: "text" | "image" | "video" | "audio";
  mediaUrl?: string;
}

interface MessageBubbleProps {
  message: Message;
  onDelete?: (messageId: string, deleteBothSides: boolean) => void;
}

export default function MessageBubble({ message, onDelete }: MessageBubbleProps) {
  const { content, timestamp, isSent, type, mediaUrl } = message;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

  const handleLongPressStart = () => {
    longPressTimer.current = setTimeout(() => {
      setDeleteDialogOpen(true);
    }, 500); // 500ms for long press
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleDelete = (deleteBothSides: boolean) => {
    if (onDelete) {
      onDelete(message.id, deleteBothSides);
    }
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div
        className={cn(
          "flex animate-fade-in",
          isSent ? "justify-end" : "justify-start"
        )}
      >
        <div
          className={cn(
            "max-w-[70%] rounded-2xl shadow-sm overflow-hidden cursor-pointer select-none",
            isSent
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-foreground rounded-bl-sm"
          )}
          onMouseDown={handleLongPressStart}
          onMouseUp={handleLongPressEnd}
          onMouseLeave={handleLongPressEnd}
          onTouchStart={handleLongPressStart}
          onTouchEnd={handleLongPressEnd}
        >
          {type === "image" && mediaUrl && (
            <div className="relative group">
              <img
                src={mediaUrl}
                alt="Shared image"
                className="w-full h-auto object-cover max-h-[400px] rounded-t-xl"
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-t-xl"
              )} />
            </div>
          )}
          {type === "video" && mediaUrl && (
            <div className="relative">
              <video
                src={mediaUrl}
                controls
                className="w-full h-auto max-h-[400px] object-cover rounded-t-xl"
              />
            </div>
          )}
          {type === "audio" && mediaUrl && (
            <div className="px-4 py-3">
              <audio src={mediaUrl} controls className="w-full max-w-xs" />
            </div>
          )}
          <div className={cn("px-4 py-2", (type === "image" || type === "video" || type === "audio") && mediaUrl && "pt-3")}>
            {content && <p className="text-sm break-words mb-1">{content}</p>}
            <span
              className={cn(
                "text-xs block",
                isSent ? "text-primary-foreground/70" : "text-muted-foreground"
              )}
            >
              {timestamp}
            </span>
          </div>
        </div>
      </div>

      {/* Delete Message Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete message?</AlertDialogTitle>
            <AlertDialogDescription>
              Choose how you want to delete this message.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col gap-2">
            <div className="flex gap-2 w-full">
              <AlertDialogCancel className="flex-1">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(false)} className="flex-1">
                Delete for me
              </AlertDialogAction>
            </div>
            <AlertDialogAction 
              onClick={() => handleDelete(true)}
              className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete for both parties
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
