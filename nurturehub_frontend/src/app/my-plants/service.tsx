"use server";

import { getToken } from "../tokenManagement/service";
import { plantDTO } from "./model";

export const savePlant = async (data: plantDTO) => {
  const token = await getToken();
  const response = await fetch("http://localhost:4000/myplant", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to save plant");
  }
  return await response.json();
};

export const getPlantsByUserId = async () => {
  const token = await getToken();
  console.log(token);

  const response = await fetch(`http://localhost:4000/myplant`, {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch plants");
  }
  const plants = await response.json();
  console.log("gay: ", plants);
  return plants.data as plantDTO[];
};
