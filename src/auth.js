// src/auth.js
import { makeWASocket, useMultiFileAuthState } from "@whiskeysockets/baileys";
import qrcode from "qrcode";
import fs from "fs-extra";

const AUTH_FOLDER = "./auth";

// Ensure auth folder exists
fs.ensureDirSync(AUTH_FOLDER);

export const connectWhatsApp = async (onQRGenerated) => {
    const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false, // We'll generate QR separately
    });

    sock.ev.on("connection.update", async (update) => {
        const { connection, qr } = update;
        
        if (qr) {
            const qrCodeDataURL = await qrcode.toDataURL(qr);
            onQRGenerated(qrCodeDataURL); // Send QR code
        }

        if (connection === "open") {
            console.log("WhatsApp connected!");
            await saveCreds();
        }
    });

    return sock;
};
