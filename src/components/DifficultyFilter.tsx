export type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

const labels: Record<Difficulty, string> = {
  all: 'Усі',
  easy: 'Легкі',
  medium: 'Середні',
  hard: 'Складні',
};

const inactiveColors: Record<Difficulty, string> = {
  all: 'text-white/60 hover:text-white bg-white/10 hover:bg-white/15',
  easy: 'text-green-400/70 hover:text-green-400 bg-green-400/10 hover:bg-green-400/15',
  medium: 'text-yellow-400/70 hover:text-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/15',
  hard: 'text-red-400/70 hover:text-red-400 bg-red-400/10 hover:bg-red-400/15',
};

const activeColors: Record<Difficulty, string> = {
  all: 'bg-white text-black',
  easy: 'bg-green-400 text-black',
  medium: 'bg-yellow-400 text-black',
  hard: 'bg-red-400 text-black',
};

interface Props {
  active: Difficulty;
  onChange: (d: Difficulty) => void;
}

export const DifficultyFilter = ({ active, onChange }: Props) => (
  <div className="flex gap-2">
    {(['all', 'easy', 'medium', 'hard'] as Difficulty[]).map(d => (
      <button
        key={d}
        onClick={() => onChange(d)}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
          active === d ? activeColors[d] : inactiveColors[d]
        }`}
      >
        {labels[d]}
      </button>
    ))}
  </div>
);
