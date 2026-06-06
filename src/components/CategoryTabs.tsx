import { CATEGORIES, CATEGORY_LABELS, type Category } from '../data/questions';

interface Props {
  active: Category;
  onChange: (cat: Category) => void;
  includeAll?: boolean;
}

export const CategoryTabs = ({ active, onChange, includeAll = true }: Props) => {
  const tabs: Category[] = includeAll ? ['all', ...CATEGORIES] : [...CATEGORIES];

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tabs.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat
              ? 'bg-amber-400 text-black'
              : 'bg-white/10 text-white/60 hover:bg-white/15 hover:text-white'
          }`}
        >
          {CATEGORY_LABELS[cat]}
        </button>
      ))}
    </div>
  );
};
