import { useState } from 'react';
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
}

export const QuestionItem = ({ question, status, onKnown, onLearning }: Props) => {
  const [open, setOpen] = useState(false);

  const borderClass =
    status === 'known'
      ? 'border-emerald-400/20 bg-emerald-400/5'
      : status === 'learning'
      ? 'border-orange-400/20 bg-orange-400/5'
      : 'border-white/10 bg-[#1a1a1a]';

  return (
    <div className={`rounded-xl border transition-colors ${borderClass}`}>
      <button
        className="w-full text-left p-4 flex items-start gap-3"
        onClick={() => setOpen(o => !o)}
      >
        <span className="text-white/30 mt-0.5 text-xs shrink-0">{open ? '▼' : '▶'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-white font-medium leading-snug">{question.question}</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className={`text-xs px-2 py-0.5 rounded-full border ${DIFFICULTY_STYLES[question.difficult]}`}>
              {DIFFICULTY_LABELS[question.difficult]}
            </span>
            {status !== 'unseen' && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                status === 'known'
                  ? 'bg-emerald-400/15 text-emerald-400'
                  : 'bg-orange-400/15 text-orange-400'
              }`}>
                {status === 'known' ? '✓ Знаю' : '~ Вчу'}
              </span>
            )}
          </div>
        </div>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-white/10">
          <div className="pt-3 mb-4">
            {question.answer ? (
              <p className="text-white/75 text-sm leading-relaxed">{question.answer}</p>
            ) : (
              <p className="text-white/30 text-sm italic">Відповідь поки не додана</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={e => { e.stopPropagation(); onLearning(); }}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                status === 'learning'
                  ? 'bg-orange-400 text-black font-medium'
                  : 'bg-orange-400/15 text-orange-400 hover:bg-orange-400/25'
              }`}
            >
              Ще вчу
            </button>
            <button
              onClick={e => { e.stopPropagation(); onKnown(); }}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                status === 'known'
                  ? 'bg-emerald-400 text-black font-medium'
                  : 'bg-emerald-400/15 text-emerald-400 hover:bg-emerald-400/25'
              }`}
            >
              Знаю ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
