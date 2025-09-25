const { cmd } = require('../command');

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in a group!");

        // Check if user is either creator or admin
        if (!isCreator && !isAdmins && !fromMe) {
            return reply("❌ Only bot owner and group admins can use this command!");
        }

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        
        // Request presence updates for all participants
        const presencePromises = groupData.participants.map(participant => 
            conn.presenceSubscribe(participant.id)
                .then(() => conn.sendPresenceUpdate('composing', participant.id))
                .catch(() => {}) // Silently handle errors for individual participants
        );

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            try {
                for (const id in json.presences) {
                    const presence = json.presences[id]?.lastKnownPresence;
                    if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                        onlineMembers.add(id);
                    }
                }
            } catch (e) {
                console.error("Error in presence handler:", e);
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Setup cleanup and response
        const checks = 3;
        const checkInterval = 5000;
        let checksDone = 0;

        const checkOnline = async () => {
            try {
                checksDone++;
                
                if (checksDone >= checks) {
                    clearInterval(interval);
                    conn.ev.off('presence.update', presenceHandler);
                    
                    if (onlineMembers.size === 0) {
                        return reply("⚠️ Couldn't detect any online members. They might be hiding their presence.");
                    }
                    
                    const onlineArray = Array.from(onlineMembers);
                    const onlineList = onlineArray.map((member, index) => 
                        `${index + 1}. @${member.split('@')[0]}`
                    ).join('\n');
                    
                    // Prepare message
                    const messageData = {
                        image: { url: 'https://files.catbox.moe/pvhmgv.jpg' },
                        caption: ` *ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀꜱ* (${onlineArray.length}/${groupData.participants.length}):\n\n${onlineList}\n\n _ꜰᴀꜱᴛ ᴀꜱꜰ!_ `,
                        mentions: onlineArray,
                        contextInfo: {
                            mentionedJid: onlineArray,
                            forwardingScore: 999,
                            isForwarded: true,
                            forwardedNewsletterMessageInfo: {
                                newsletterJid: '0029VajbiIfAjPXO45zG2i2c@newsletter',
                                newsletterName: '🆃︎🅴︎🅲︎🅷︎-🅳︎🅴︎🆅︎🆂︎-🆅︎1',
                                serverMessageId: 143
                            }
                        }
                    };

                    // Send message and audio
                    await Promise.all([
                        conn.sendMessage(from, messageData, { quoted: mek }),
                        conn.sendMessage(from, { 
                            audio: { url: 'https://files.catbox.moe/8as3yt.mp3' },
                            mimetype: 'audio/mp4',
                            ptt: false
                        }, { quoted: mek })
                    ]);
                }
            } catch (e) {
                console.error("Error in checkOnline:", e);
                reply(`ᴄᴀʟᴍꜱ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ᴄʜᴇᴄᴋɪɴɢ`);
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

        // Set timeout to clean up if something goes wrong
        setTimeout(() => {
            clearInterval(interval);
            conn.ev.off('presence.update', presenceHandler);
        }, checkInterval * checks + 10000); // Extra 10 seconds buffer

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
