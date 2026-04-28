import { Header } from "../components/Header";
import { links } from "../data/links";

export const LinksPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl mb-4 uppercase">Links</h1>
        {links.map((link) => (
          <div className="flex justify-center ">
            <a
              href={link.url}
              className="text-2xl hover:text-white/30 transition-colors"
            >
              {link.title}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};
