import Link from "next/link";
import routes from "../../app/routes";

const NavDesktop = () => {
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
    <ul className="hidden lg:flex lg:items-center gap-5 text-sm">
      {routesElement}
    </ul>
  );
};

export default NavDesktop;
