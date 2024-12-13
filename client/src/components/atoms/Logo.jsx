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
      className={`flex text-black items-center gap-1 text-4xl h-full ${dynaPuff.className}`}
    >
      Sarajevo Expats
    </Link>
  );
};

export default Logo;
