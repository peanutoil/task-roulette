import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import EmojiReact from '@/components/EmojiReact';

export const revalidate = 60;

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('type', 'blog')
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getReactions(postId: string) {
  const { data, error } = await supabase
    .from('reactions')
    .select('emoji')
    .eq('post_id', postId);

  if (error || !data) {
    return {};
  }

  // Count reactions by emoji
  const counts: Record<string, number> = {};
  data.forEach((reaction) => {
    counts[reaction.emoji] = (counts[reaction.emoji] || 0) + 1;
  });

  return counts;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const reactions = await getReactions(post.id);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <article className="industrial-box corner-brackets mb-6">
        <header className="mb-8">
          <div className="industrial-header">BLOG ENTRY</div>
          <div className="mb-4">
            <h1 className="text-3xl font-bold chrome-text uppercase tracking-wider mb-3">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-1 h-1 bg-blue-500"></div>
              <time dateTime={post.created_at} className="data-display text-xs font-bold">
                {format(new Date(post.created_at), 'yyyy.MM.dd HH:mm')}
              </time>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-gray-700">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <EmojiReact postId={post.id} initialReactions={reactions} />
    </div>
  );
}
