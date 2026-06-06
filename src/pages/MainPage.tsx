import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { useProgress } from '../hooks/useProgress';
import { useQuestions } from '../hooks/useQuestions';
import { CATEGORIES, CATEGORY_LABELS } from '../data/questions';

export default function MainPage() {
  const { questions } = useQuestions();
  const { getStats } = useProgress();

  const overall = getStats(questions);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto px-4 pb-12">
        <div className="text-center py-10">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
            Interview Drill
          </h1>
          <p className="text-white/35 text-sm">Підготовка до технічного інтерв'ю</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#1a1a1a] p-6 mb-6">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-white/50 text-sm">Загальний прогрес</span>
            <span className="text-white font-semibold">
              {overall.known} / {overall.total}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${overall.percent}%` }}
            />
          </div>
          <div className="text-right mt-1.5 text-emerald-400 text-xs">{overall.percent}%</div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {CATEGORIES.map(cat => {
            const catQuestions = questions.filter(q => q.category === cat);
            const stats = getStats(catQuestions);
            return (
              <Link
                key={cat}
                to={`/questions?category=${cat}`}
                className="rounded-xl border border-white/10 bg-[#1a1a1a] p-4 hover:border-white/20 hover:bg-white/4 transition-colors"
              >
                <div className="text-white font-medium text-sm mb-1">
                  {CATEGORY_LABELS[cat]}
                </div>
                <div className="text-xs text-white/35 mb-2.5">
                  {stats.known}/{stats.total} знаю
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 rounded-full"
                    style={{ width: `${stats.percent}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Link to="/questions" className="rounded-xl border border-white/10 bg-[#1a1a1a] p-5 text-center hover:border-amber-400/30 hover:bg-amber-400/4 transition-colors group">
            <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors mb-0.5">Запитання</div>
            <div className="text-white/30 text-xs">Drill mode</div>
          </Link>
          <Link to="/theory" className="rounded-xl border border-white/10 bg-[#1a1a1a] p-5 text-center hover:border-amber-400/30 hover:bg-amber-400/4 transition-colors group">
            <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors mb-0.5">Теорія</div>
            <div className="text-white/30 text-xs">Study mode</div>
          </Link>
          <Link to="/links" className="rounded-xl border border-white/10 bg-[#1a1a1a] p-5 text-center hover:border-amber-400/30 hover:bg-amber-400/4 transition-colors group">
            <div className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors mb-0.5">Посилання</div>
            <div className="text-white/30 text-xs">Resources</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
