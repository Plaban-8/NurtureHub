import { User } from "../auth.model.js";

export const saveUser = async (data) => {
  const response = await User.create(data);
  return response;
};
