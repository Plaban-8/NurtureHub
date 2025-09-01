"use server";

import { revalidatePath } from "next/cache";
import { getToken } from "../tokenManagement/service";
import { plantDTO } from "./model";
import { userDTO } from "../dashboard/model";

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
  revalidatePath("/my-plants");
  if (!response.ok) {
    throw new Error("Failed to save plant");
  }
  return await response.json();
};

export const getPlantsByUserId = async () => {
  const token = await getToken();

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
  return plants.data as plantDTO[];
};

export const deletePlantById = async (id: string) => {
  const response = await fetch(`http://localhost:4000/myplant/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  revalidatePath("/my-plants");
  if (!response.ok) {
    throw new Error("Failed to delete plant");
  }
};

export const logWater = async (id: string, name: string) => {
  const response = await fetch(`http://localhost:4000/myplant/${id}/water`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  revalidatePath("/my-plants");
  if (!response.ok) {
    throw new Error("Failed to log watering");
  }
  const result = await response.json();
  return result.data.updatedAt;
};

export const getUserByPlantId = async (plantId: string) => {
  const response = await fetch(
    `http://localhost:4000/myplant/user/${plantId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  const result = await response.json();
  return result.data;
};

export const notifyService = async (plantId: string, name: string) => {
  const user = await getUserByPlantId(plantId);
  const data = {
    to: user.email,
    subject: "Watering Reminder",
    text: `It's time to water your plant: ${name}`,
  };
  const response = await fetch(`http://localhost:4000/notification/sendemail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidatePath("/my-plants");
  if (!response.ok) {
    throw new Error("Failed to notify user");
  }
  return await response.json();
};
