import { savePlant } from "./plantprofile.repo.js";
import { getPlant } from "./plantprofile.repo.js";
import { deletePlant } from "./plantprofile.repo.js";

export const plantCreationService = async (data) => {
    try{
        await savePlant(data);
        return {
            message: "Plant profile created successfully.",
            success: true,
        }
    }
    catch(err) {
        console.log(err);
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

export const deletePlantService = async (id) => {
    try{
        await deletePlant(id);
        return {
            message: "Plant profile deleted successfully.",
            success: true,
        }
    }
    catch(err) {
        console.log(err);
        return {
        message: "Failed to delete plant profile.",
        success: false,
        }
    }
}