import { Link, useLocation } from 'react-router-dom';

const NAV = [
  { to: '/', label: 'Головна' },
  { to: '/questions', label: 'Запитання' },
  { to: '/theory', label: 'Теорія' },
  { to: '/links', label: 'Посилання' },
];

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className="flex flex-row gap-6 justify-center p-4 uppercase border-b border-white/10 mb-8 text-xs tracking-widest">
      {NAV.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className={`font-medium transition-colors ${
            pathname === to ? 'text-amber-400' : 'text-white/50 hover:text-white'
          }`}
        >
          {label}
        </Link>
      ))}
    </header>
  );
};
