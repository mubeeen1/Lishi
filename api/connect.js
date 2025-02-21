// api/connect.js
import { connectWhatsApp } from "../src/auth.js";

export default async function handler(req, res) {
    if (req.method !== "GET") return res.status(405).send("Method Not Allowed");

    try {
        connectWhatsApp((qrCode) => {
            res.status(200).json({ qrCode }); // Send QR code as response
        });
    } catch (error) {
        console.error("Error connecting WhatsApp:", error);
        res.status(500).json({ error: "Failed to generate QR code" });
    }
}
