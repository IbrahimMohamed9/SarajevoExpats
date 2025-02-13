import AuthTemplate from "@/app/(auth)/components/AuthTemplate";

const LoginPage = () => {
  const textFields = [
    { name: "email", label: "Email Address" },
    { name: "password", label: "Password" },
  ];

  return <AuthTemplate login={true} fields={textFields} />;
};

export default LoginPage;
