import AuthTemplate from "@/app/(auth)/components/AuthTemplate";

export const metadata = {
  metadataBase: new URL("https://sarajevoexpats.com"),
  title: "Login | Sarajevo Expats",
  description:
    "Access your Sarajevo Expats account. Connect with the expat community, discover events, and explore services in Sarajevo.",
  openGraph: {
    title: "Login | Sarajevo Expats",
    description:
      "Access your Sarajevo Expats account. Connect with the expat community, discover events, and explore services in Sarajevo.",
    type: "website",
  },
};

const LoginPage = () => {
  const textFields = [
    { name: "email", label: "Email Address" },
    { name: "password", label: "Password" },
  ];

  return <AuthTemplate login={true} fields={textFields} />;
};

export default LoginPage;
