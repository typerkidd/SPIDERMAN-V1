const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Only group admins or the bot owner can use this command.");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '❤‍🩹', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '🎧', '🪀', '⚡', '🚩', '🍁', '🗣️', '👻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "Attention Everyone"; // Default message

        let teks = 
        `▢ Group : *${groupName}*\n▢ Members : *${totalMembers}*\n▢ Message: *${message}*\n\n┌───⊷ *MENTIONS*\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += "└《 *❀༒𝕋𝔼ℂℍ-𝔻𝔼𝕍𝕊-𝕍1༒❀* 》─";

        let fakeContact = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                contactMessage: {
                    displayName: '❀༒𝕋𝔼ℂℍ-𝔻𝔼𝕍𝕊-𝕍1༒❀',
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:ᴊꜰx ᴍᴅ-xᴠ3\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254 700 000000\nEND:VCARD`,
                    jpegThumbnail: null
                }
            }
        }

        await conn.sendMessage(from, {
            text: teks,
            mentions: participants.map(a => a.id),
            contextInfo: {
                externalAdReply: {
                    title: "GROUP PINGER",
                    body: "Powered by❀༒𝕋𝔼ℂℍ-𝔻𝔼𝕍𝕊-𝕍1༒❀",
                    thumbnailUrl: "https://files.catbox.moe/7w1yde.jpg",
                    sourceUrl: "https://github.com/ALPHA-KING-TECH-OFC",
                    mediaType: 1,
                    renderLargerThumbnail: false,
                    showAdAttribution: true
                },
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "0029VajbiIfAjPXO45zG2i2c@newsletter",
                    newsletterName: "❀༒𝕋𝔼ℂℍ-𝔻𝔼𝕍𝕊-𝕍1༒❀",
                    serverMessageId: "",
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});
                      
