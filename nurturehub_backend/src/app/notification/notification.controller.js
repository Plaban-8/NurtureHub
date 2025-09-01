import { Router } from "express";
import { sendMailSerivce } from "./notification.service.js";

export const notificationController = Router();

notificationController.post("/sendemail", async (req, res) => {
    const { to, subject, message } = req.body;

    try {
        await sendMailSerivce(to, subject, message, `<p>${message}</p>`);
        res.json({ success: true, msg: "Email sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to send email" });
    }
});

notificationController.post("/notify", async (req, res) => {
    const { plantId } = req.body;

    try {
        // Logic to send notification
        res.json({ success: true, msg: "Notification sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to send notification" });
    }
});
