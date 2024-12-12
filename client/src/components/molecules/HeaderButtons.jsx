import Link from "next/link";
import Button from "@mui/material/Button";

const HeaderButtons = ({ className, buttonClassName }) => {
  const buttons = [
    {
      navTo: "/Login",
      variant: "contained",
      color: "primary",
      content: "Login",
    },
    {
      navTo: "/SignUp",
      variant: "outlined",
      color: "inherit",
      content: "Sign Up",
    },
  ];

  return (
    <div className={`${className} flex gap-4`}>
      {buttons.map((button, index) => (
        <Link href={button.navTo} key={index}>
          <Button
            variant={button.variant}
            color={button.color}
            sx={{
              minWidth: "100px",
              fontWeight: "medium",
              ...(button.color === "inherit" && {
                color: "#e0e0e0",
                borderColor: "#e0e0e0",
                "&:hover": {
                  borderColor: "#e0e0e0",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }),
            }}
          >
            {button.content}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default HeaderButtons;
