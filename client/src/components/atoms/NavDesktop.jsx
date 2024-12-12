import Link from "next/link";
import Button from "@mui/material/Button";
import HeaderDropMenu from "@atoms/HeaderDropMenu";

const NavDesktop = ({ routes }) => {
  const wordsElements = routes.map((route) => (
    <div key={route.title}>
      {route.dropdown ? (
        <HeaderDropMenu route={route} dropdownItems={route.dropdown} />
      ) : (
        <Button component={Link} href={route.href} className="text-white">
          {route.title}
        </Button>
      )}
    </div>
  ));

  return <div className="hidden md:flex gap-1">{wordsElements}</div>;
};

export default NavDesktop;
