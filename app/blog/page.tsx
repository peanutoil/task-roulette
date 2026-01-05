import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { format } from 'date-fns';

export const revalidate = 60; // Revalidate every 60 seconds

async function getBlogPosts() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', 'blog')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }

  return data || [];
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="industrial-box mb-6">
        <div className="industrial-header">BLOG ARCHIVES</div>
        <p className="text-gray-600 text-sm leading-relaxed">
          Longer form learnings on technical and non-technical topics. 
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="industrial-box text-center">
          <div className="inset-panel">
            <p className="uppercase tracking-wider data-display mb-2 font-bold">NO ENTRIES FOUND</p>
            <p className="text-gray-600 text-xs">
              ARCHIVES CURRENTLY EMPTY
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="block industrial-box hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-lg font-bold uppercase tracking-wide chrome-text">
                  {post.title}
                </h2>
                <span className="data-display text-xs whitespace-nowrap ml-4 font-bold">
                  {format(new Date(post.created_at), 'yyyy.MM.dd')}
                </span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                {post.excerpt || post.content.substring(0, 200) + '...'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
