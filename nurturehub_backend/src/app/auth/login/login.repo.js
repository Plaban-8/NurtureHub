import { User } from "../auth.model.js";

export const getUser = async (filter) => {
  return await User.findOne(filter);
};
