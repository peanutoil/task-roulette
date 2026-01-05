"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

interface Comment {
  id: string;
  name: string;
  message: string;
  created_at: string;
  reply_from_admin: string | null;
}

interface CommentsSectionProps {
  postId: string | null;
  initialComments: Comment[];
}

export default function CommentsSection({
  postId,
  initialComments,
}: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          postId,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="comment-name"
            className="block text-xs font-bold mb-2 uppercase tracking-wider"
            style={{ color: '#4d2d52' }}
          >
            Name
          </label>
          <input
            type="text"
            id="comment-name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full"
            placeholder="ENTER NAME"
          />
        </div>

        <div>
          <label
            htmlFor="comment-message"
            className="block text-xs font-bold mb-2 uppercase tracking-wider"
            style={{ color: '#4d2d52' }}
          >
            Message
          </label>
          <textarea
            id="comment-message"
            required
            rows={3}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full"
            placeholder="ENTER COMMENT"
          />
        </div>

        {status === "success" && (
          <div className="inset-panel border-l-4" style={{ borderColor: '#ff85c0' }}>
            <p className="text-xs uppercase tracking-wider font-bold" style={{ color: '#ff4da6' }}>
              SUBMITTED • AWAITING APPROVAL
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="inset-panel border-l-4" style={{ borderColor: '#ff4da6' }}>
            <p className="text-xs uppercase tracking-wider font-bold" style={{ color: '#ff4da6' }}>
              SUBMISSION FAILED • RETRY
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="metal-button-silver metal-button w-full text-center"
        >
          {status === "submitting" ? "SUBMITTING..." : "SUBMIT COMMENT"}
        </button>
      </form>

      {/* Comments List */}
      <div className="metal-divider"></div>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="inset-panel text-center">
            <p className="text-xs uppercase tracking-wider data-display font-bold">
              NO COMMNENTS RECORDED
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="inset-panel border-l-4"
              style={{ borderColor: '#ffc0e0' }}
            >
              <div className="flex items-baseline justify-between mb-2">
                <h4 className="font-bold text-sm uppercase tracking-wide" style={{ color: '#4d2d52' }}>
                  {comment.name}
                </h4>
                <time className="data-display text-xs font-bold">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  }).toUpperCase()}
                </time>
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: '#4d2d52' }}>
                {comment.message}
              </p>

              {comment.reply_from_admin && (
                <div className="mt-3 ml-4 inset-panel border-l-4" style={{ borderColor: '#ff85c0' }}>
                  <p className="text-xs font-bold mb-2 uppercase tracking-wider" style={{ color: '#ff4da6' }}>
                    ADMIN RESPONSE:
                  </p>
                  <p className="text-sm whitespace-pre-wrap leading-relaxed" style={{ color: '#4d2d52' }}>
                    {comment.reply_from_admin}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
