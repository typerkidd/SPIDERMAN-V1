const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: 'owner',
    react: '🦋',
    desc: 'Get owner number',
    category: 'main',
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;
        
        // Create vCard
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

        // Fake verified contact
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "AlphaKing",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\nEND:VCARD`
                }
            }
        };

        // Send contact
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: verifiedContact });

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/m4vltm.jpg' },
            caption: `╭━━〔 *SPIDERMAN-V1* 〕━━┈⊷
┃❍╭─────────────·๏
┃❍┃• *Here is the owner details*
┃❍┃• *ɴᴀᴍᴇ* - 🅰︎🅻︎🅿︎🅷︎🅰︎-🅺︎🅸︎🅽︎🅶︎
┃❍┃• *ɴᴜᴍʙᴇʀ* +263718728504
┃❍┃• *𝖵ᴇʀsɪᴏɴ*: 1.0.0
┃❍└───────────┈⊷
╰──────────────┈⊷
> © SPIDEY`,
            contextInfo: {
                mentionedJid: [ownerNumber.replace('+', '') + '@s.whatsapp.net'],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: 'https://files.catbox.moe/m4vltm.jpg',
                    newsletterName: 'spider',
                    serverMessageId: 143
                }
            }
        }, { quoted: verifiedContact });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/8as3yt.mp3' },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { 
            text: `❌ An error occurred: ${error.message}` 
        }, { quoted: m });
    }
});
