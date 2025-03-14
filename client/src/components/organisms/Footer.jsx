import Link from "next/link";
import Logo from "@atoms/Logo";

const Footer = () => {
  const routes = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const routesElement = routes.map(({ title, href }) => (
    <li key={title}>
      <Link
        href={href}
        className="flex items-center gap-1 text-xl !text-white hover:text-main-green transition-all"
      >
        {title}
      </Link>
    </li>
  ));

  return (
    <footer className="bg-main py-8 xs:py-12 relative z-10 w-full flex items-center flex-col gap-y-3">
      <Logo />
      <ul className="flex gap-10">{routesElement}</ul>
      <p className="text-white">Copyright 2024</p>
    </footer>
  );
};

export default Footer;
