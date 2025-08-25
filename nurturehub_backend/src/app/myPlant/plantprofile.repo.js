import { Plant } from "./plantprofile.model.js";

export const savePlant = async (data) => {
    return await Plant.create(data);
}

export const getPlant = async (id) => {
    const plants = await Plant.find({ _id: id }).toArray();
    if (plants) {
        return {
            status: true,
            data: plants
        }
    }
    return {
        status: false, 
        data: null
    }
}