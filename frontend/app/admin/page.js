'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchAllWriteups, deleteWriteup, verifyToken } from '@/lib/api';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthAndLoadWriteups();
  }, []);

  const checkAuthAndLoadWriteups = async () => {
    try {
      await verifyToken();
      await loadWriteups();
    } catch (error) {
      router.push('/admin/login');
    }
  };

  const loadWriteups = async () => {
    try {
      setLoading(true);
      const data = await fetchAllWriteups();
      setWriteups(data);
    } catch (error) {
      console.error('Failed to load writeups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this writeup?')) return;

    try {
      await deleteWriteup(id);
      setWriteups(writeups.filter(w => w.id !== id));
    } catch (error) {
      alert('Failed to delete writeup');
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Admin Dashboard</h1>
          <Link
            href="/admin/writeups/new"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            New Writeup
          </Link>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left text-gray-300 px-6 py-4">Title</th>
                    <th className="text-left text-gray-300 px-6 py-4">Status</th>
                    <th className="text-left text-gray-300 px-6 py-4">Date</th>
                    <th className="text-right text-gray-300 px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {writeups.map((writeup) => (
                    <tr
                      key={writeup.id}
                      className="border-t border-gray-800 hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-white">{writeup.title}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            writeup.status === 'published'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-yellow-900 text-yellow-300'
                          }`}
                        >
                          {writeup.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(writeup.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/writeups/${writeup.slug}`}
                            className="text-blue-400 hover:text-blue-300 p-2"
                          >
                            <Eye size={18} />
                          </Link>
                          <Link
                            href={`/admin/writeups/edit/${writeup.id}`}
                            className="text-cyan-400 hover:text-cyan-300 p-2"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(writeup.id)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}