import Link from "next/link";
import Button from "@mui/material/Button";
import HeaderDeskDropMenu from "@atoms/HeaderDeskDropMenu";

const NavDesktop = ({ routes }) => {
  const wordsElements = routes.map((route) => (
    <div key={route.title}>
      {route.dropdown ? (
        <HeaderDeskDropMenu route={route} dropdownItems={route.dropdown} />
      ) : (
        <Button component={Link} href={route.href} sx={{ color: "white" }}>
          {route.title}
        </Button>
      )}
    </div>
  ));

  return <div className="hidden md:flex gap-1">{wordsElements}</div>;
};

export default NavDesktop;
