import { getUser } from "../auth/login/login.repo.js";
import { updateUser } from "./profile.repo.js";

export const getUserService = async (id) => {
  const user = await getUser({ _id: id });
  if (!user) {
    return {
      status: false,
    };
  }
  return {
    status: true,
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  };
};

export const editUser = async (id, data) => {
  try {
    await updateUser(id, data);
    return {
      message: "User updated successfully.",
      success: true,
    };
  } catch (err) {
    return {
      message: "User update failed",
      success: false,
    };
  }
};
