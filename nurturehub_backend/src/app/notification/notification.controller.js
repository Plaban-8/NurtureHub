import { Router } from "express";
import { sendMailSerivce } from "./notification.service.js";

export const notificationController = Router();

notificationController.post("/sendemail", async (req, res) => {
    console.log("working sendmail");
    const { to, subject, message } = req.body;

    try {
        await sendMailSerivce(to, subject, message, `<p>${message}</p>`);
        res.json({ success: true, msg: "Email sent!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Failed to send email" });
    }
});
