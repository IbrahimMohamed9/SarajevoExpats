import Logo from "@atoms/Logo";
import NavDesktop from "@molecules/NavDesktop";
import HeaderMenuIcon from "@molecules/HeaderMenuIcon";
import { NavMobile } from "@molecules/NavMobile";
import routess from "@/app/routes";
import Link from "next/link";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const dynamic = "force-dynamic";

const Header = async () => {
  const routes = await routess();

  return (
    <nav className="bg-main sticky top-0 z-50 w-full h-9 flex items-center justify-between px-4 mb-7">
      <div className="flex items-center">
        <div className="relative -left-4 p-2 pr-10 bg-main -bottom-3 rounded-br-[70px]">
          <Logo />
        </div>
        <div className="hidden lg:block ml-2">
          <NavDesktop routes={routes} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link href="/add-place" className="no-underline hidden">
          <Button
            variant="contained"
            size="small"
            disableElevation
            disableRipple
            className="bg-gradient-to-r from-main to-secondary text-white hover:from-secondary hover:to-main active:from-tertiary active:to-main active:scale-95 hidden lg:flex items-center px-4 py-1 h-7 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-main/20 font-semibold tracking-wide text-xs focus:ring-1 focus:ring-orange-300 focus:outline-none border border-white/30"
            startIcon={
              <AddIcon
                className="text-white mr-0.5"
                fontSize="small"
                sx={{ fontSize: "16px" }}
              />
            }
          >
            ADD PLACE
          </Button>
        </Link>
        <div className="block lg:hidden">
          <HeaderMenuIcon />
        </div>
        <NavMobile routes={routes} />
      </div>
    </nav>
  );
};

export default Header;
