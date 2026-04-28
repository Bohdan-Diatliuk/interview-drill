import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex flex-row gap-10 justify-center p-4 uppercase border-b border-white/30 mb-6">
      <Link
        to={"/questions"}
        className="text-white text-2xl hover:text-white/80 transition-colors"
      >
        Запитання
      </Link>
      <Link
        to={"/theory"}
        className="text-white text-2xl hover:text-white/80 transition-colors"
      >
        Теорія
      </Link>
      <Link
        to={"/links"}
        className="text-white text-2xl hover:text-white/80 transition-colors"
      >
        Посилання
      </Link>
    </header>
  );
};
