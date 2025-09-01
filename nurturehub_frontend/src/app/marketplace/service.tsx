"use server";

import { revalidatePath } from "next/cache";
import { getToken } from "../tokenManagement/service";
import { marketDTO, newMarket } from "./model";

export const postMarket = async (data: newMarket) => {
    const token = await getToken();
  const response = await fetch('http://localhost:4000/market', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to create listing');
  }
  return response.json();
};

export const getMarketPosts = async () => {
    const response = await fetch('http://localhost:4000/market', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });
    
    if (!response.ok) {
        throw new Error('Failed to fetch listings');
    }
    
    const result = await response.json();
    return result.data as marketDTO[];
}