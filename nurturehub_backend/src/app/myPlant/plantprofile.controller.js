import { Router } from "express";
import { plantCreationService } from "./plantprofile.service.js";
import { authenticate } from "../auth/auth.middleware.js";

export const plantProfileController = Router();

plantProfileController.post('/',authenticate, async (req , res) => {
    console.log(req.email);

    const data = {
        name: req.body.name,
        species: req.body.species,
        photo: req.body.photo,
        userId: req.id,
    }

    try{
        const response = await plantCreationService(data);
        if (response.success){
            return res.status(200).json({
                message: response.message,
                status: 200
            })
        }
        return res.status(400).json({
            message: response.message,
            status: 400
        })
    }catch(err){
        console.log(err);
        return res.json({
            message: err.message,
        });
    }
});

plantProfileController.get('/',authenticate, async (req , res) => {
    const userId = req.id;
    try{
        const response = await getPlantService(userId);
        if (response.success){
            return res.status(200).json({
                message: response.message,
                data: response.data,
                status: 200
            })
        }
        return res.status(403).json({
            message: response.message,
            status: 403
        })
    }catch(err){
        return res.json({
            message: err.message,
        });
    }
});