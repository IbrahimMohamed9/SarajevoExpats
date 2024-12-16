import Link from "next/link";
import localFont from "next/font/local";

const dynaPuff = localFont({
  src: "../../font/DynaPuff/DynaPuff-VariableFont_wdth,wght.ttf",
  display: "swap",
});

const Logo = () => {
  return (
    <Link
      href="/"
      className={`flex text-white items-center gap-1 text-2xl h-full min-[430px]:text-4xl text-nowrap ${dynaPuff.className}`}
    >
      Sarajevo Expats
    </Link>
  );
};

export default Logo;
