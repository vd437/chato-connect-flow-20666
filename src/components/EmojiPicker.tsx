import EmojiPickerReact, { EmojiClickData } from "emoji-picker-react";
import { Card } from "@/components/ui/card";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onEmojiSelect, onClose }: EmojiPickerProps) {
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
  };

  return (
    <Card className="shadow-glow border-border animate-scale-in">
      <EmojiPickerReact
        onEmojiClick={handleEmojiClick}
        autoFocusSearch={false}
        width={320}
        height={400}
      />
    </Card>
  );
}
