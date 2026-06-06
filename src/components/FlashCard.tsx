import { useState, useEffect, useCallback } from 'react';
import type { Questions } from '../data/types';
import type { QuestionStatus } from '../hooks/useProgress';

const DIFFICULTY_STYLES = {
  easy: 'text-green-400 border-green-400/30 bg-green-400/10',
  medium: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  hard: 'text-red-400 border-red-400/30 bg-red-400/10',
};

const DIFFICULTY_LABELS = { easy: 'Легко', medium: 'Середньо', hard: 'Складно' };

interface Props {
  question: Questions;
  status: QuestionStatus;
  onKnown: () => void;
  onLearning: () => void;
  onNext: () => void;
  onPrev: () => void;
  current: number;
  total: number;
}

export const FlashCard = ({
  question,
  status,
  onKnown,
  onLearning,
  onNext,
  onPrev,
  current,
  total,
}: Props) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    setFlipped(false);
  }, [question.id, question.category]);

  const handleKnown = useCallback(() => {
    onKnown();
    onNext();
  }, [onKnown, onNext]);

  const handleLearning = useCallback(() => {
    onLearning();
    onNext();
  }, [onLearning, onNext]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === ' ') { e.preventDefault(); setFlipped(f => !f); }
      else if (e.key === '1') handleKnown();
      else if (e.key === '2') handleLearning();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onPrev, onNext, handleKnown, handleLearning]);

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl">
      <div className="text-white/30 text-sm">
        {current + 1} / {total}
      </div>

      <div
        className="flip-card w-full cursor-pointer select-none"
        style={{ height: '320px' }}
        onClick={() => setFlipped(f => !f)}
      >
        <div className={`flip-card-inner ${flipped ? 'flipped' : ''}`}>
          <div className="flip-card-front rounded-2xl bg-[#1a1a1a] border border-white/10 p-7 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className={`text-xs px-2.5 py-0.5 rounded-full border ${DIFFICULTY_STYLES[question.difficult]}`}>
                {DIFFICULTY_LABELS[question.difficult]}
              </span>
              {status !== 'unseen' && (
                <span className={`text-xs px-2.5 py-0.5 rounded-full ${
                  status === 'known'
                    ? 'bg-emerald-400/15 text-emerald-400'
                    : 'bg-orange-400/15 text-orange-400'
                }`}>
                  {status === 'known' ? 'Знаю' : 'Вчу'}
                </span>
              )}
            </div>
            <p className="text-white text-xl font-medium text-center leading-relaxed px-2">
              {question.question}
            </p>
            <p className="text-white/25 text-xs text-center">
              пробіл або клік — відповідь &nbsp;·&nbsp; ← → — навігація
            </p>
          </div>

          <div className="flip-card-back rounded-2xl bg-[#1a1a1a] border border-amber-400/20 p-7 flex flex-col justify-center overflow-y-auto">
            {question.answer ? (
              <p className="text-white/85 text-base leading-relaxed">{question.answer}</p>
            ) : (
              <p className="text-white/30 text-center italic text-sm">
                Відповідь поки не додана
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={e => { e.stopPropagation(); handleLearning(); }}
          className="flex-1 py-3 rounded-xl bg-orange-400/15 text-orange-400 border border-orange-400/20 hover:bg-orange-400/25 transition-colors font-medium text-sm"
        >
          [2] Ще вчу
        </button>
        <button
          onClick={e => { e.stopPropagation(); handleKnown(); }}
          className="flex-1 py-3 rounded-xl bg-emerald-400/15 text-emerald-400 border border-emerald-400/20 hover:bg-emerald-400/25 transition-colors font-medium text-sm"
        >
          [1] Знаю
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onPrev}
          disabled={current === 0}
          className="px-5 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-sm"
        >
          ← Назад
        </button>
        <button
          onClick={onNext}
          disabled={current === total - 1}
          className="px-5 py-2 rounded-lg bg-white/5 text-white/50 hover:bg-white/10 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Далі →
        </button>
      </div>
    </div>
  );
};
