import { apiFetch } from './client';
import { getUserId } from '../utils/userId';

export type ProgressEntry = {
  questionId: number;
  status: 'known' | 'learning' | null;
};

const userHeader = () => ({ 'X-User-Id': getUserId() });

export const fetchProgress = (): Promise<ProgressEntry[]> =>
  apiFetch<ProgressEntry[]>('/progress', { headers: userHeader() });

export const upsertProgress = (questionId: number, status: 'known' | 'learning' | null): Promise<ProgressEntry> =>
  apiFetch<ProgressEntry>(`/progress/${questionId}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
    headers: userHeader(),
  });

export const resetProgress = (): Promise<void> =>
  apiFetch<void>('/progress', { method: 'DELETE', headers: userHeader() });
