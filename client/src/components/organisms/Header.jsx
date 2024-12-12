import Logo from "@atoms/Logo";
import NavDesktop from "@atoms/NavDesktop";
import { NavMobile } from "@molecules/NavMobile";
import HeaderButtons from "@molecules/HeaderButtons";
import HeaderMenuIcon from "@molecules/HeaderMenuIcon";
import routess from "@/app/routes";

const Header = async () => {
  const routes = await routess();

  return (
    <header className="bg-blue-950 sticky top-0 z-50 w-full h-20">
      <div className="container h-full flex items-center justify-between">
        <Logo />
        <div className="hidden xl:block">
          <NavDesktop routes={routes} />
        </div>
        <HeaderButtons
          className="hidden xl:flex h-full items-center gap-2"
          buttonClassName="ml-4"
        />
        <HeaderMenuIcon />
        <NavMobile routes={routes} />
      </div>
    </header>
  );
};

export default Header;
