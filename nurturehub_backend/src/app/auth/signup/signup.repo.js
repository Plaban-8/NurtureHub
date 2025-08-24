import { User } from "../auth.model.js";

export const saveUser = async (data) => {
  return await User.insertOne(data);
};
