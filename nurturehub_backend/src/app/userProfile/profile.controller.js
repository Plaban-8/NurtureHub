import { Router } from "express";
import { authenticate } from "../auth/auth.middleware";

export const profileController = Router();

profileController.get('/', authenticate,async (req , res) => {
    const id = req.id;
    try{
        const response = await getUserService(id);
        if (response.status){
            return res.status(200).json({
                message: "User profile fetched successfully",
                data: response.data,
                status: 200
            });
        }
        return res.status(403).json({
            message: "Failed to fetch user profile",
            status: 403
        });
    }catch(err){
        return res.json({
            message: err.message,
        });
    }

});