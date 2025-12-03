'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchWriteupBySlug } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WriteupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [writeup, setWriteup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWriteup();
  }, [params.slug]);

  const loadWriteup = async () => {
    try {
      setLoading(true);
      const data = await fetchWriteupBySlug(params.slug);
      setWriteup(data);
    } catch (error) {
      console.error('Failed to load writeup:', error);
      router.push('/writeups');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!writeup) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/writeups"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Writeups
        </Link>

        <article className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            {writeup.title}
          </h1>

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex flex-wrap gap-2">
              {writeup.tags && writeup.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-gray-500">
              {new Date(writeup.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>

          <div 
            className="prose prose-invert max-w-none prose-headings:text-white prose-a:text-cyan-400 prose-code:text-cyan-300 prose-pre:bg-gray-800"
            dangerouslySetInnerHTML={{ __html: writeup.content }}
          />
        </article>
      </div>
    </div>
  );
}