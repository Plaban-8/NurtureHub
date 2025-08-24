import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMailSerivce = async (to, subject, text, html) => {
    try {
        let info = await transporter.sendMail({
            from: `"My App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (err) {
        console.error("Error sending email", err);
        throw err;
    }
}