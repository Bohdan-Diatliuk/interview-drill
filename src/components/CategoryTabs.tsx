import { CATEGORY_LABELS } from '../data/questions';

interface Props {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
  includeAll?: boolean;
}

export const CategoryTabs = ({ categories, active, onChange, includeAll = true }: Props) => {
  const tabs = includeAll ? ['all', ...categories] : categories;

  const label = (cat: string) =>
    CATEGORY_LABELS[cat] ?? cat.charAt(0).toUpperCase() + cat.slice(1);

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
          {label(cat)}
        </button>
      ))}
    </div>
  );
};
