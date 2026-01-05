'use client';

import { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';

interface FeedPostProps {
  post: {
    id: string;
    title: string;
    content: string;
    created_at: string;
  };
  initialReactions: Record<string, number>;
}

export default function FeedPost({ post, initialReactions }: FeedPostProps) {
  const heartCount = initialReactions['❤️'] || 0;
  const [hearts, setHearts] = useState(heartCount);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasReacted, setHasReacted] = useState(false);

  useEffect(() => {
    // Check if user has already reacted to this post
    const reactions = JSON.parse(localStorage.getItem('reactions') || '{}');
    if (reactions[post.id]?.includes('❤️')) {
      setHasReacted(true);
    }
  }, [post.id]);

  const handleHeart = async () => {
    if (isSubmitting || hasReacted) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post.id,
          emoji: '❤️',
        }),
      });

      if (response.ok) {
        setHasReacted(true);
        setHearts((prev) => prev + 1);

        // Store in localStorage
        const reactions = JSON.parse(localStorage.getItem('reactions') || '{}');
        if (!reactions[post.id]) {
          reactions[post.id] = [];
        }
        reactions[post.id].push('❤️');
        localStorage.setItem('reactions', JSON.stringify(reactions));
      }
    } catch (error) {
      console.error('Error submitting reaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <article className="industrial-box">
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
          {post.content}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <time
          dateTime={post.created_at}
          title={new Date(post.created_at).toLocaleString()}
          className="data-display text-xs font-bold"
        >
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true }).toUpperCase()}
        </time>

        <button
          onClick={handleHeart}
          disabled={isSubmitting}
          className={`flex items-center gap-2 px-3 py-1 text-xs ${
            hasReacted
              ? 'metal-button text-white'
              : 'inset-panel text-gray-700 hover:text-red-500'
          } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          <span className="text-base leading-none">{hasReacted ? '❤️' : '🤍'}</span>
          {hearts > 0 && (
            <span className="data-display bg-white/30 px-2 py-0.5 font-bold leading-none">
              {hearts}
            </span>
          )}
        </button>
      </div>
    </article>
  );
}
