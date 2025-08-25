import { authController } from "./auth/auth.contorller.js"
import { notificationController } from "./notification/notification.controller.js"
import { plantProfileController } from "./myPlant/plantprofile.controller.js"

export const controller = (app)=>{
  app.use("/auth", authController)
  app.use("/notification", notificationController)
  app.use("/myplant", plantProfileController)
}