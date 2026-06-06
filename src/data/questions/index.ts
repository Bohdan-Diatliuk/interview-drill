import { javascriptInterview } from './javascript';
import { typescriptInterview } from './typescript';
import { reactInterview } from './react';
import { htmlInterview } from './html';
import { cssInterview } from './css';
import type { Questions } from '../types';

export const allQuestions: Questions[] = [
  ...javascriptInterview,
  ...typescriptInterview,
  ...reactInterview,
  ...htmlInterview,
  ...cssInterview,
];

export const CATEGORIES = ['javascript', 'typescript', 'react', 'html', 'css'] as const;
export type Category = (typeof CATEGORIES)[number] | 'all';

export const CATEGORY_LABELS: Record<string, string> = {
  all: 'Усі',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  html: 'HTML',
  css: 'CSS',
};

export const filterQuestions = (
  questions: Questions[],
  category: Category,
  difficulty: 'all' | 'easy' | 'medium' | 'hard'
): Questions[] =>
  questions
    .filter(q => category === 'all' || q.category === category)
    .filter(q => difficulty === 'all' || q.difficult === difficulty);
