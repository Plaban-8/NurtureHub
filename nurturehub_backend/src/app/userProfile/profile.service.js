import { getUser } from "../auth/login/login.repo.js";
import { changePassword, updateUser } from "./profile.repo.js";
import bcrypt from "bcryptjs";

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
      dateOfBirth: user.dateOfBirth,
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

export const editPassword = async (id, data) => {
  const user = await getUser({ _id: id });
  const result = await bcrypt.compare(data.currentPassword, user.password);
  if (result) {
    try {
      const pass = await bcrypt.hash(data.newPassword, 10);
      data.newPassword = pass;
      await changePassword(id, { password: data.newPassword });
      return {
        message: "Password changed successfully.",
        success: true,
      };
    } catch (err) {
      return {
        message: "Password change failed",
        success: false,
      };
    }
  } else {
    return {
      message: "Current password is incorrect.",
      success: false,
    };
  }
};
