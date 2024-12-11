import HeaderButtons from "../molecules/HeaderButtons";
import Logo from "../atoms/Logo";
import NavDesktop from "../atoms/NavDesktop";
import { NavMobile } from "../molecules/NavMobile";

const Header = () => (
  <header className="bg-blue-950 sticky top-0 z-50 w-full h-20">
    <div className="container flex justify-around h-20">
      <Logo />
      <NavDesktop />
      <HeaderButtons
        className="max-lg:hidden h-full flex items-center"
        buttonClassName="mr-2 translate-center-y"
      />
      <NavMobile />
    </div>
  </header>
);

export default Header;
