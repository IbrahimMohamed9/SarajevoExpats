import Link from "next/link";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const HeaderButtons = ({ className = "" }) => {
  const buttons = [
    {
      label: "Login",
      href: "/login",
      icon: <LoginIcon />,
      variant: "outlined",
      className: "text-white border-white hover:bg-white/10",
    },
    {
      label: "Register",
      href: "/register",
      icon: <PersonAddIcon />,
      variant: "contained",
      className: "bg-green-500 hover:bg-green-600",
    },
  ];

  const buttonElements = buttons.map((btn) => (
    <Button
      key={btn.label}
      component={Link}
      href={btn.href}
      variant={btn.variant}
      startIcon={btn.icon}
      className={btn.className}
    >
      {btn.label}
    </Button>
  ));

  return <div className={className}>{buttonElements}</div>;
};

export default HeaderButtons;
