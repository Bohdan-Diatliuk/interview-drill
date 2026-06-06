import { apiFetch } from './client';
import type { Questions } from '../data/types';

export const fetchQuestions = (category?: string, difficult?: string): Promise<Questions[]> => {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.set('category', category);
  if (difficult && difficult !== 'all') params.set('difficult', difficult);
  const qs = params.toString();
  return apiFetch<Questions[]>(`/questions${qs ? `?${qs}` : ''}`);
};
