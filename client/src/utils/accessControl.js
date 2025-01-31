import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");

export const verifyAdmin = () => {
  const token = cookies().get("access_token")?.value;

  if (!token) return false;

  try {
    const decoded = jwt.decode(token);
    const user = decoded.user;

    return user.type === "admin";
  } catch (error) {
    console.log(error);
    return false;
  }
};
