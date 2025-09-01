import { Plant } from "./plantprofile.model.js";
import {getUser} from "../auth/login/login.repo.js"

export const savePlant = async (data) => {
  return await Plant.insertOne(data);
};

export const getPlant = async (id) => {
  const plants = await Plant.find({ userId: id });
  if (plants) {
    return {
      status: true,
      data: plants,
    };
  }
  return {
    status: false,
    data: null,
  };
};

export const deletePlant = async (id) => {
  return await Plant.findByIdAndDelete({ _id: id });
};

export const logWater = async (id) => {
  // Push current timestamp to waterLogged array
  await Plant.findByIdAndUpdate(
    id,
    { $push: { waterLogged: new Date() } },
    { new: true }
  );
  // Return updated waterLogged array
  const check = await Plant.findById(id).select("waterLogged");
  return check;
};

export const getUserByPlantIdRepo = async (id) => {
  const plant = await Plant.findById(id).populate("userId");
  if (plant) {
    const userid = plant.userId;
    return await getUser(userid);
  }
  throw new Error("Plant not found");
};