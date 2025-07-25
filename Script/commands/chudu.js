module.exports.config = {
  name: "chudu",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "—͟͟͞͞𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "us chudu reply fanny text",
  commandCategory: "fun",
  usages: "chudu",
  cooldowns: 3,
};

module.exports.run = async ({ api, event }) => {
  return api.sendMessage(
    " তুই কি চাস আমি তোর girlfriend রে নিয়া পালাই যাই😏",
    event.threadID,
    event.messageID
  );
};
