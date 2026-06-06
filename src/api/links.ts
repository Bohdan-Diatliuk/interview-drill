import { apiFetch } from './client';
import type { Links } from '../data/types';

export const fetchLinks = (): Promise<Links[]> => apiFetch<Links[]>('/links');
