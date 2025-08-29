import { Router } from "express";
import { signupService } from "./signup.service.js";

export const signupController = Router();

signupController.post("/", async (req, res) => {
  const d = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
  };

  if (await signupService(d)) {
    return res.status(201).json({
      message: "Signed up Succesfully",
      result: true,
      status: 201,
    });
  }
  return res.status(403).json({
    message: "Signed up failed",
    result: false,
    status: 403,
  });
});

