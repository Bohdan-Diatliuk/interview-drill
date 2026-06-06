import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { fetchLinks } from '../api/links';
import type { Links } from '../data/types';

export const LinksPage = () => {
  const [links, setLinks] = useState<Links[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks()
      .then(data => { setLinks(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto px-4 pb-12">
        <h1 className="text-2xl font-bold text-white text-center mb-8 tracking-tight">
          Корисні ресурси
        </h1>
        {loading ? (
          <div className="text-center text-white/30 text-sm py-12">Завантаження...</div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {links.map(link => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl border border-white/10 bg-[#1a1a1a] p-4 hover:border-white/20 hover:bg-white/4 transition-colors group"
              >
                <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">
                  {link.title}
                </div>
                <div className="text-white/30 text-xs mt-0.5 truncate">{link.url}</div>
              </a>
            ))}
            {links.length === 0 && (
              <p className="text-center text-white/30 text-sm py-12">Посилань поки немає</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
