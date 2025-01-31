import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

export const verifyAdmin = () => {
  const token = cookies().get("access_token")?.value;
  if (!token) return false;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded?.user?.type === "admin";
  } catch (error) {
    return false;
  }
};
