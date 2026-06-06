import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { CategoryTabs } from '../components/CategoryTabs';
import { DifficultyFilter, type Difficulty } from '../components/DifficultyFilter';
import { FlashCard } from '../components/FlashCard';
import { QuestionItem } from '../components/QuestionItem';
import { useProgress } from '../hooks/useProgress';
import { useQuestions } from '../hooks/useQuestions';
type Mode = 'flashcard' | 'list';

export default function QuestionsPage() {
  const [searchParams] = useSearchParams();

  const [category, setCategory] = useState<string>(() => searchParams.get('category') ?? 'all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');
  const [mode, setMode] = useState<Mode>('flashcard');
  const [index, setIndex] = useState(0);

  const { questions, categories, loading, error } = useQuestions();
  const { getStatus, markKnown, markLearning, resetAll, getStats } = useProgress();

  const filtered = useMemo(() => {
    return questions
      .filter(q => category === 'all' || q.category === category)
      .filter(q => difficulty === 'all' || q.difficult === difficulty);
  }, [questions, category, difficulty]);

  const currentIndex = filtered.length > 0 ? Math.min(index, filtered.length - 1) : 0;
  const current = filtered[currentIndex];
  const stats = getStats(filtered);

  const handleCategoryChange = (cat: string) => { setCategory(cat); setIndex(0); };
  const handleDifficultyChange = (d: Difficulty) => { setDifficulty(d); setIndex(0); };

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="flex flex-col gap-4 mb-6">
          <CategoryTabs categories={categories} active={category} onChange={handleCategoryChange} />
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <DifficultyFilter active={difficulty} onChange={handleDifficultyChange} />
            <div className="flex items-center gap-3">
              <div className="flex rounded-lg overflow-hidden border border-white/10">
                {(['flashcard', 'list'] as Mode[]).map(m => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-colors ${
                      mode === m ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    {m === 'flashcard' ? 'Картки' : 'Список'}
                  </button>
                ))}
              </div>
              <button
                onClick={resetAll}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                скинути
              </button>
            </div>
          </div>
        </div>

        {filtered.length > 0 && (
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/35 mb-1.5">
              <span>Знаю: {stats.known} / {stats.total}</span>
              <span>{stats.percent}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center text-white/30 py-24 text-sm">Завантаження...</div>
        ) : error ? (
          <div className="text-center text-red-400/70 py-24 text-sm">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-white/30 py-24 text-sm">Питань не знайдено</div>
        ) : mode === 'flashcard' ? (
          <div className="flex justify-center">
            <FlashCard
              question={current}
              status={getStatus(current.id)}
              onKnown={() => markKnown(current.id)}
              onLearning={() => markLearning(current.id)}
              onNext={() => setIndex(i => Math.min(i + 1, filtered.length - 1))}
              onPrev={() => setIndex(i => Math.max(i - 1, 0))}
              current={currentIndex}
              total={filtered.length}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {filtered.map(q => (
              <QuestionItem
                key={q.id}
                question={q}
                status={getStatus(q.id)}
                onKnown={() => markKnown(q.id)}
                onLearning={() => markLearning(q.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
