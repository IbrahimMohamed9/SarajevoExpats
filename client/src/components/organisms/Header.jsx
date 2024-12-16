import Logo from "@atoms/Logo";
import NavDesktop from "@molecules/NavDesktop";
import HeaderButtons from "@molecules/HeaderButtons";
import HeaderMenuIcon from "@molecules/HeaderMenuIcon";
import { NavMobile } from "@molecules/NavMobile";
import routess from "@/app/routes";

const Header = async () => {
  const routes = await routess();

  return (
    <nav className="bg-main sticky top-0 z-50 w-full h-9 flex items-center justify-between px-4 mb-7">
      <div className="relative -left-4 p-2 pr-10 bg-main -bottom-3 rounded-br-[70px]">
        <Logo />
      </div>
      <div className="hidden min-[820px]:block w-full">
        <NavDesktop routes={routes} />
      </div>
      <HeaderButtons
        className="hidden min-[820px]:flex h-full items-center gap-2"
        buttonClassName="ml-4"
      />
      <HeaderMenuIcon />
      <NavMobile routes={routes} />
    </nav>
  );
};

export default Header;
