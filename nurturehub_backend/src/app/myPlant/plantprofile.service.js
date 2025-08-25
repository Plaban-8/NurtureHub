import { savePlant } from "./plantprofile.repo.js";
import { getPlant } from "./plantprofile.repo.js";

export const plantCreationService = async (data) => {
    try{
        await savePlant(data);
        return {
            message: "Plant profile created successfully.",
            success: true,
        }
    }
    catch(err) {
        return {
        message: "Failed to create plant profile.",
        success: false,
        }
    }
}

export const getPlantService = async (userId) => {
    const result = await getPlant(userId);
    if (result.status){
        return {
            message: "All plants fetched successfully.",
            success: true,
            data: result.data
        }
    }
    return {
        success: false,
    }

}   