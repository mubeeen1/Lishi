// src/sendSession.js
export const sendSessionID = async (sock, phoneNumber) => {
    try {
        const sessionID = sock.user.id;
        const formattedNumber = phoneNumber + "@s.whatsapp.net";

        await sock.sendMessage(formattedNumber, { text: `Your Session ID: ${sessionID}` });
        console.log(`Session ID sent to ${phoneNumber}`);
    } catch (error) {
        console.error("Error sending session ID:", error);
    }
};
