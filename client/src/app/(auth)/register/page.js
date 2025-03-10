import AuthTemplate from "@/app/(auth)/components/AuthTemplate";

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
