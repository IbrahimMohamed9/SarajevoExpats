import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-1 text-2xl text-white h-full">
        Sarajevo Expats
      </div>
    </Link>
  );
};

export default Logo;
