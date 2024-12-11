import Link from "next/link";
import routes from "../../app/routes";
import Logo from "../atoms/Logo";

const Footer = () => {
  const routesElement = routes.map(({ title, href }) => (
    <li key={title}>
      <Link
        href={href}
        className="flex items-center gap-1 text-xl text-white hover:text-main-green transition-all"
      >
        {title}
      </Link>
    </li>
  ));

  return (
    <footer className="bg-blue-950 py-8 xs:py-12">
      <div className="container flex flex-col-reverse items-center max-xs:gap-y-4 xs:justify-between xs:flex-row-reverse">
        <div className="flex items-center flex-col gap-3">
          <Logo />
          <ul className="flex gap-10">{routesElement}</ul>
          <p className="text-white">Copyright © 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
