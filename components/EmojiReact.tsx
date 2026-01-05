"use client";

import { useState, useEffect } from "react";

interface EmojiReactProps {
  postId: string;
  initialReactions: Record<string, number>;
}

const availableReactions = [
  { id: "👍", emoji: "👍", label: "Like" },
  { id: "👏", emoji: "👏", label: "Applause" },
  { id: "🤔", emoji: "🤔", label: "Interesting" },
  { id: "👎", emoji: "👎", label: "Dislike" },
  { id: "🫤", emoji: "🫤", label: "Meh" },
];

export default function EmojiReact({
  postId,
  initialReactions,
}: EmojiReactProps) {
  const [reactions, setReactions] =
    useState<Record<string, number>>(initialReactions);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userReactions, setUserReactions] = useState<string[]>([]);

  useEffect(() => {
    // Check which reactions the user has already made
    const storedReactions = JSON.parse(
      localStorage.getItem("reactions") || "{}"
    );
    setUserReactions(storedReactions[postId] || []);
  }, [postId]);

  const handleReaction = async (reactionId: string) => {
    if (isSubmitting || userReactions.includes(reactionId)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          emoji: reactionId,
        }),
      });

      if (response.ok) {
        // Update the UI
        setReactions((prev) => ({
          ...prev,
          [reactionId]: (prev[reactionId] || 0) + 1,
        }));

        // Store in localStorage
        const storedReactions = JSON.parse(
          localStorage.getItem("reactions") || "{}"
        );
        if (!storedReactions[postId]) {
          storedReactions[postId] = [];
        }
        storedReactions[postId].push(reactionId);
        localStorage.setItem("reactions", JSON.stringify(storedReactions));
        setUserReactions(storedReactions[postId]);
      }
    } catch (error) {
      console.error("Error submitting reaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="industrial-box industrial-box-silver">
      <div className="industrial-header industrial-header-silver">
        Reactions
      </div>
      <div className="flex flex-wrap gap-3">
        {availableReactions.map((reaction) => {
          const hasReacted = userReactions.includes(reaction.id);
          const count = reactions[reaction.id] || 0;

          return (
            <button
              key={reaction.id}
              onClick={() => handleReaction(reaction.id)}
              disabled={isSubmitting || hasReacted}
              className={`flex items-center gap-2 px-4 py-2 text-lg ${
                hasReacted
                  ? "metal-button text-white cursor-not-allowed"
                  : "inset-panel hover:bg-white/80 cursor-pointer"
              } ${isSubmitting ? "opacity-50" : ""}`}
              title={reaction.label}
            >
              <span className="text-2xl leading-none">{reaction.emoji}</span>
              {count > 0 && (
                <span className="data-display text-xs bg-white/30 px-2 py-0.5 font-bold leading-none">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-600 mt-4 uppercase tracking-wider data-display font-bold">
        ANONYMOUS
      </p>
    </div>
  );
}
