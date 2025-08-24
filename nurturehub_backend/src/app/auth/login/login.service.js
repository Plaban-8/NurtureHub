import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getUser } from "./login.repo.js";

export const loginService = async (data) => {


  const user = await getUser({ email: data.email });

  if (!user) {
    return {
      message: "Email/Password is invalid.",
      success: false,
    };
  }
  const isPassMatched = await bcrypt.compare(data.password, user.password);
  if (!isPassMatched) {
    return {
      message: "Email/password mismatched.",
      success: false,
    };
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );

  return {
    message: "Logged In.",
    success: true,
    token,
  };
};