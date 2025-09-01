import { Router } from "express";
import { loginService } from "./login.service.js";

export const loginController = Router();

loginController.post('/', async (req, res) => {
  const d = {
    email: req.body.email,
    password: req.body.password
  };

  try {
    const result = await loginService(d);
    if (result.success) {
      return res.status(200).json({
        message: result.message,
        token: result.token,
        status: 200
      })
    }
    return res.status(403).json({
      message: result.message,
      status: 403
    })
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
});