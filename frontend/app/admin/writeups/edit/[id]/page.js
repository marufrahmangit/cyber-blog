'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchWriteupById, updateWriteup, verifyToken } from '@/lib/api';
import Editor from '@/components/Editor';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditWriteupPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
    status: 'draft'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    checkAuthAndLoadWriteup();
  }, [params.id]);

  const checkAuthAndLoadWriteup = async () => {
    try {
      await verifyToken();
      await loadWriteup();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadWriteup = async () => {
    try {
      setLoading(true);
      const writeup = await fetchWriteupById(params.id);
      
      setFormData({
        title: writeup.title,
        content: writeup.content,
        excerpt: writeup.excerpt || '',
        tags: Array.isArray(writeup.tags) ? writeup.tags.join(', ') : '',
        status: writeup.status
      });
    } catch (error) {
      console.error('Failed to load writeup:', error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag);

      await updateWriteup(params.id, {
        ...formData,
        tags: tagsArray
      });

      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update writeup');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

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

        <h1 className="text-4xl font-bold text-white mb-8">Edit Writeup</h1>

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
            />
          </div>

          {/* Content Editor */}
          <div>
            <label className="block text-gray-300 mb-2">Content</label>
            <Editor
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
              disabled={saving || !formData.title || !formData.content}
              className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition"
            >
              <Save size={20} />
              {saving ? 'Saving...' : 'Update Writeup'}
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