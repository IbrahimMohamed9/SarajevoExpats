import { cookies } from "next/headers";
const jwt = require("jsonwebtoken");

export const verifyAdmin = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return false;

  try {
    const user = jwt.decode(token).user;
    if (user.type !== "admin") return false;

    return true;
  } catch (error) {
    return false;
  }
};
