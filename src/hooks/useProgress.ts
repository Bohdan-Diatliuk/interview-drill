import { useState, useEffect, useCallback } from 'react';
import { fetchProgress, upsertProgress, resetProgress } from '../api/progress';
import type { Questions } from '../data/types';

export type QuestionStatus = 'known' | 'learning' | 'unseen';
type ProgressMap = Record<number, 'known' | 'learning'>;

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressMap>({});

  useEffect(() => {
    fetchProgress()
      .then(entries => {
        const map: ProgressMap = {};
        entries.forEach(e => { if (e.status) map[e.questionId] = e.status; });
        setProgress(map);
      })
      .catch(() => {});
  }, []);

  const getStatus = useCallback(
    (questionId: number): QuestionStatus => progress[questionId] ?? 'unseen',
    [progress],
  );

  const markKnown = useCallback((questionId: number) => {
    setProgress(p => ({ ...p, [questionId]: 'known' }));
    upsertProgress(questionId, 'known').catch(() => {});
  }, []);

  const markLearning = useCallback((questionId: number) => {
    setProgress(p => ({ ...p, [questionId]: 'learning' }));
    upsertProgress(questionId, 'learning').catch(() => {});
  }, []);

  const resetAll = useCallback(() => {
    setProgress({});
    resetProgress().catch(() => {});
  }, []);

  const getStats = useCallback(
    (questions: Questions[]) => {
      const total = questions.length;
      const known = questions.filter(q => progress[q.id] === 'known').length;
      return { total, known, percent: total ? Math.round((known / total) * 100) : 0 };
    },
    [progress],
  );

  return { progress, getStatus, markKnown, markLearning, resetAll, getStats };
};
