'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createWriteup, verifyToken } from '@/lib/api';
import EnhancedEditor from '@/components/EnhancedEditor'; // CHANGED FROM Editor
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewWriteupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      await verifyToken();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      await createWriteup({
        ...formData,
        tags: tagsArray
      });

      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create writeup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </Link>

        <h1 className="text-4xl font-bold text-white mb-8">New Writeup</h1>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-2">Title</label>
            <input
              type="text"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter writeup title"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-300 mb-2">
              Excerpt <span className="text-gray-500">(optional)</span>
            </label>
            <textarea
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              rows="3"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Short description for preview cards"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-2">
              Tags <span className="text-gray-500">(comma-separated)</span>
            </label>
            <input
              type="text"
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Web Security, OWASP, XSS"
            />
          </div>

          {/* Content Editor - NOW WITH ENHANCED EDITOR */}
          <div>
            <label className="block text-gray-300 mb-2">Content</label>
            <div className="bg-gray-900 rounded-lg p-4 mb-2">
              <p className="text-sm text-gray-400 mb-2">
                💡 <strong>Tips:</strong> You can paste markdown directly, upload images, or use the rich text editor!
              </p>
            </div>
            <EnhancedEditor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-gray-300 mb-2">Status</label>
            <select
              className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={loading || !formData.title || !formData.content}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Save size={20} />
              {loading ? 'Creating...' : 'Create Writeup'}
            </button>
            <Link
              href="/admin"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}