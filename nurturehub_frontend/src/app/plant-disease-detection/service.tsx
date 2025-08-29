"use server";

import { DiagnosePlantOutput } from "./model";

const API_URL = "https://plant.id/api/v3/identification";
const API_KEY = "yscUERwoW0AzYMu9snnpt8z8Z03QrqIn2kmGtq0jTdWJgSvK7l"; // ✅ expose env for client-side

export const getDiagnosisFromAPI = async (
  photoDataUri: string
): Promise<DiagnosePlantOutput> => {
  const base64Data = photoDataUri.split(",")[1];

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Api-Key": API_KEY || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      images: [base64Data],
      similar_images: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to get diagnosis");
  }

  const data = await response.json();

  const suggestion = data?.result?.classification?.suggestions?.[0];
  const isPlant = !!suggestion;

  return {
    identification: {
      isPlant,
      commonName: suggestion?.name ?? "Unknown",
      latinName: suggestion?.scientific_name ?? "Unknown",
    },
    diagnosis: {
      isHealthy: true, // Placeholder (Plant.id disease detection is a separate endpoint)
      diagnosis: suggestion
        ? `This looks like ${suggestion.name} (${
            suggestion.scientific_name
          }). Confidence: ${Math.round(suggestion.probability * 100)}%.`
        : "No plant detected in the uploaded photo.",
    },
  };
};
