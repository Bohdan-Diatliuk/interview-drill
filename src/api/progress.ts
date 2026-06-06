import { apiFetch } from './client';

export type ProgressEntry = {
  questionId: number;
  status: 'known' | 'learning' | null;
};

export const fetchProgress = (): Promise<ProgressEntry[]> =>
  apiFetch<ProgressEntry[]>('/progress');

export const upsertProgress = (questionId: number, status: 'known' | 'learning' | null): Promise<ProgressEntry> =>
  apiFetch<ProgressEntry>(`/progress/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });

export const resetProgress = (): Promise<void> =>
  apiFetch<void>('/progress', { method: 'DELETE' });
