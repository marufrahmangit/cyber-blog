import Link from 'next/link';

export default function WriteupCard({ writeup }) {
  return (
    <Link href={`/writeups/${writeup.slug}`}>
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500 transition-all cursor-pointer h-full">
        <h3 className="text-2xl font-bold text-white mb-3">{writeup.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-3">{writeup.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {writeup.tags && writeup.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-gray-500 text-sm">
          {new Date(writeup.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </div>
    </Link>
  );
}