import { User } from "../auth/auth.model.js";

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data);
};

export const changePassword = async (id, data) => {
  return await User.findByIdAndUpdate(id, data);
};
