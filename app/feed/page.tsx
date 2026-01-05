import { supabase } from "@/lib/supabase";
import { format, formatDistanceToNow } from "date-fns";
import FeedPost from "@/components/FeedPost";

export const revalidate = 30; // Revalidate every 30 seconds

async function getFeedPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("type", "tweet")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("Error fetching feed posts:", error);
    return [];
  }

  return data || [];
}

async function getAllReactions() {
  const { data, error } = await supabase
    .from("reactions")
    .select("post_id, emoji");

  if (error) {
    console.error("Error fetching reactions:", error);
    return {};
  }

  // Group reactions by post_id
  const reactionsByPost: Record<string, Record<string, number>> = {};

  data?.forEach((reaction) => {
    if (!reactionsByPost[reaction.post_id]) {
      reactionsByPost[reaction.post_id] = {};
    }
    const emoji = reaction.emoji;
    reactionsByPost[reaction.post_id][emoji] =
      (reactionsByPost[reaction.post_id][emoji] || 0) + 1;
  });

  return reactionsByPost;
}

export default async function FeedPage() {
  const posts = await getFeedPosts();
  const reactions = await getAllReactions();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="industrial-box mb-6">
        <div className="industrial-header">#TWIL - This Week I Learned</div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Short-form updates on what I learned this week.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="industrial-box text-center">
          <div className="inset-panel">
            <p className="uppercase tracking-wider data-display mb-2 font-bold">
              NO MESSAGES
            </p>
            <p className="text-gray-600 text-xs">FEED CURRENTLY EMPTY</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              initialReactions={reactions[post.id] || {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
