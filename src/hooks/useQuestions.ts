import { useState, useEffect, useMemo } from 'react';
import { fetchQuestions } from '../api/questions';
import type { Questions } from '../data/types';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchQuestions()
      .then(data => { setQuestions(data); setLoading(false); })
      .catch(() => { setError('Не вдалося завантажити питання'); setLoading(false); });
  }, []);

  const categories = useMemo(
    () => [...new Set(questions.map(q => q.category))].sort(),
    [questions],
  );

  return { questions, categories, loading, error };
};
