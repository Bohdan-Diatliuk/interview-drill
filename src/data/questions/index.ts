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
