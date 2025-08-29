import { Plant } from "./plantprofile.model.js";

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