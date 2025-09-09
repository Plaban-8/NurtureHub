import { Router } from "express";
import { signupService } from "./signup.service.js";

export const signupController = Router();

signupController.post("/", async (req, res) => {
  const d = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    dateOfBirth: req.body.dateOfBirth,
    password: req.body.password,
  };

  try {
    await signupService(d);
    return res.status(201).json({
      message: "Signed up Succesfully",
      result: true,
      status: 201,
  });
    }
 catch (error) {
    console.error("Error during signup:", error);
  }
  return res.status(403).json({
    message: "Signed up failed",
    result: false,
    status: 403,
  });
});

