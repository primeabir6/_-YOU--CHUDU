/install Chudi.js module.exports.config = {
  name: "chudi",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "us chudi reply fanny text",
  commandCategory: "fun",
  usages: "/chudi",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  return api.sendMessage(
    "খানকির পোলা তোকে চুদি 🥵""খানকির পোলা তোরে চুদি🫦",
    event.threadID,
    event.messageID
  );
};
