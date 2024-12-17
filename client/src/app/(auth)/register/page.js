import AuthTemplate from "@/app/(auth)/components/AuthTemplate";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL),
  title: "Register | Sarajevo Expats",
  description:
    "Join our community of expats in Sarajevo. Create an account to access exclusive features and connect with fellow expats.",
  openGraph: {
    title: "Register | Sarajevo Expats",
    description:
      "Join our community of expats in Sarajevo. Create an account to access exclusive features and connect with fellow expats.",
    type: "website",
  },
};

const RegisterPage = () => {
  const textFields = [
    { name: "username", label: "Username" },
    { name: "email", label: "Email Address" },
    { name: "password", label: "Password" },
    { name: "confirmPassword", label: "Confirm Password" },
  ];

  return <AuthTemplate login={false} fields={textFields} />;
};

export default RegisterPage;
