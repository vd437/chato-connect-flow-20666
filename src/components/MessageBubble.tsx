import { cn } from "@/lib/utils";

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
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const { content, timestamp, isSent, type, mediaUrl } = message;

  return (
    <div
      className={cn(
        "flex animate-fade-in",
        isSent ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl shadow-sm overflow-hidden",
          isSent
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-muted text-foreground rounded-bl-sm"
        )}
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
  );
}
