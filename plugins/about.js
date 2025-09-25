const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: ["jephter","whois"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭━〔 SPIDERMAN-V1 〕━┈⊷*
*👋 HELLO _${pushname}_*
*╰────────────┈⊷*

> *╭───〔 𝗔𝗯𝗼𝘂𝘁 𝗠𝗲 〕───╮*
> *┃✨ Creator  : *
> *┃📝 Real Name: 🅰︎🅻︎🅿︎🅷︎🅰︎-🅺︎🅸︎🅽︎🅶︎*
> *┃🌐 Alias    : 🆃︎🅴︎🅲︎🅷︎-🅳︎🅴︎🆅︎🆂︎-🆅︎1*
> *┃🎂 Age      : Secret 😎*
> *┃🏙️ Location : United States*
> *┃💻 Tech     : Node.js + Baileys*
> *┃⚡ Status   : Online & Ready*
> *╰────────────────╯*

*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ 🆃︎🅴︎🅲︎🅷︎-🅳︎🅴︎🆅︎🆂︎-🆅︎1*
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/m4vltm.jpg`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: 'https://files.catbox.moe/m4vltm.jpg',
      newsletterName: 'SPIDERMAN-V1',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
