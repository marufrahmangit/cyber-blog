'use client';

import Hero3D from '@/components/Hero3D';
import WriteupCard from '@/components/WriteupCard';
import { useEffect, useState } from 'react';
import { fetchWriteups } from '@/lib/api';

export default function Home() {
  const [writeups, setWriteups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWriteups = async () => {
      try {
        const data = await fetchWriteups();
        setWriteups(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to load writeups:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWriteups();
  }, []);

  return (
    <>
      <Hero3D />
      
      <section className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Latest Writeups
          </h2>
          
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {writeups.map((writeup) => (
                <WriteupCard key={writeup.id} writeup={writeup} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}