"use client";

import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import axiosInstance from "@/config/axios";
import { useCookies } from "react-cookie";
import Link from "next/link";

const AuthForm = ({ login, fields }) => {
  const router = useRouter();
  const [_, setCookies] = useCookies(["access_token"]);
  const [formData, setFormData] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      (!formData.username && !login) ||
      !formData.email ||
      !formData.password ||
      (!formData.confirmPassword && !login)
    ) {
      return false;
    }

    if (formData.password !== formData.confirmPassword && !login) {
      return false;
    }
    if (formData.password.length < 6) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (login) {
        const response = await axiosInstance.post("/users/login", {
          email: formData.email,
          password: formData.password,
        });

        setCookies("access_token", response.data.token);

        router.push("/");
      } else {
        await axiosInstance.post("/users", {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fieldElements = fields.map((field) => {
    const isPassword =
      field.name === "password" || field.name === "confirmPassword";
    const type = isPassword ? "password" : "text";
    return (
      <TextField
        key={field.name}
        margin="normal"
        required
        fullWidth
        name={field.name}
        label={field.label}
        type={type}
        id={field.name}
        autoComplete={field.name}
        value={formData[field.name] || ""}
        onChange={handleChange}
      />
    );
  });

  return (
    <form onSubmit={handleSubmit} className="mt-1">
      {fieldElements}
      <Button
        type="submit"
        fullWidth
        className="mt-3 mb-2 bg-main hover:bg-main/80 text-white"
        disabled={success}
      >
        {login ? "Login" : "Register"}
      </Button>
      <div className="text-center">
        {login ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={login ? "/register" : "/login"}
          className="text-main decoration-main hover:text-main/80 transition-colors duration-200"
        >
          {login ? "Register" : "Login"}
        </Link>
      </div>
    </form>
  );
};

export default AuthForm;
