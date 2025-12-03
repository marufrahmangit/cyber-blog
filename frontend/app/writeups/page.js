'use client';

import { useState, useEffect } from 'react';
import { fetchWriteups, searchWriteups } from '@/lib/api';
import WriteupCard from '@/components/WriteupCard';
import { Search } from 'lucide-react';

export default function WriteupsPage() {
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    loadWriteups();
  }, []);

  const loadWriteups = async () => {
    try {
      setLoading(true);
      const data = await fetchWriteups();
      setWriteups(data);
    } catch (error) {
      console.error('Failed to load writeups:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      loadWriteups();
      return;
    }

    try {
      setSearching(true);
      const data = await searchWriteups(searchTerm);
      setWriteups(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-8">All Writeups</h1>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search writeups by title, content, or tags..."
              className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>

        {/* Writeups Grid */}
        {loading || searching ? (
          <div className="text-center text-gray-400 py-12">Loading...</div>
        ) : writeups.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No writeups found.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {writeups.map((writeup) => (
              <WriteupCard key={writeup.id} writeup={writeup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}