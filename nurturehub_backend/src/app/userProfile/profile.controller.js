import { Router } from "express";
import { authenticate } from "../auth/auth.middleware.js";
import { editUser, getUserService } from "./profile.service.js";
export const profileController = Router();

profileController.get("/", authenticate, async (req, res) => {
  const id = req.id;
  try {
    const response = await getUserService(id);
    if (response.status) {
      return res.status(200).json({
        message: "User profile fetched successfully",
        data: response.data,
        status: 200,
      });
    }
    return res.status(403).json({
      message: "Failed to fetch user profile",
      status: 403,
    });
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});

profileController.put("/update", authenticate, async (req, res) => {
  const id = req.id;
  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  try {
    const result = await editUser(id, data);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
      });
    }
    return res.status(403).json({
      message: result.message,
    });
  } catch (err) {
    return res.status(500).json({
      message: err,
    });
  }
});
