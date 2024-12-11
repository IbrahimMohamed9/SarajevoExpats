import Button from "../atoms/Button";
import Link from "next/link";

const HeaderButtons = ({ className, buttonClassName }) => {
  const buttons = [
    {
      navTo: "/Login",
      className: "bg-blue-400 text-white " + buttonClassName,
      content: "Login",
    },
    {
      navTo: "/SignUp",
      className: "bg-white text-black " + buttonClassName,
      content: "Sign Up",
    },
  ];

  return (
    <div className={className}>
      {buttons.map((button, index) => (
        <Link href={button.navTo} key={index}>
          <Button className={button.className}>{button.content}</Button>
        </Link>
      ))}
    </div>
  );
};

export default HeaderButtons;
