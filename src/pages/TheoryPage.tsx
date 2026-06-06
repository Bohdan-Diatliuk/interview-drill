import { useState, useMemo, useEffect } from 'react';
import { Header } from '../components/Header';
import { CategoryTabs } from '../components/CategoryTabs';
import { Markdown } from '../components/Markdown';
import { useQuestions } from '../hooks/useQuestions';

const DIFFICULTY_STYLES = {
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  hard: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const DIFFICULTY_LABELS = { easy: 'Легко', medium: 'Середньо', hard: 'Складно' };

export const TheoryPage = () => {
  const { questions, categories, loading } = useQuestions();
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (!category && categories.length) setCategory(categories[0]);
  }, [categories, category]);

  const filtered = useMemo(
    () => questions.filter(q => q.category === category),
    [questions, category],
  );

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="mb-6">
          <CategoryTabs
            categories={categories}
            active={category}
            onChange={cat => setCategory(cat)}
            includeAll={false}
          />
        </div>

        {loading ? (
          <div className="text-center text-white/30 py-24 text-sm">Завантаження...</div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map(q => (
              <div key={q.id} className="rounded-xl border border-white/10 bg-[#1a1a1a] p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full border shrink-0 mt-0.5 ${DIFFICULTY_STYLES[q.difficult]}`}>
                    {DIFFICULTY_LABELS[q.difficult]}
                  </span>
                  <p className="text-white font-medium leading-snug">{q.question}</p>
                </div>
                <div className="border-t border-white/6 pt-3">
                  {q.answer ? (
                    <Markdown className="text-white/70 text-sm">{q.answer}</Markdown>
                  ) : (
                    <p className="text-white/25 text-sm italic">Відповідь поки не додана</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
