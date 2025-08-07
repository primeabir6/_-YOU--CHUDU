const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = "YOUR_PAGE_ACCESS_TOKEN";

// userBalances: ইউজার আইডি অনুযায়ী টাকা রাখার জায়গা
const userBalances = {};

app.get("/", (req, res) => {
  res.send("Messenger Bot is live!");
});

app.post("/webhook", (req, res) => {
  let body = req.body;

  if (body.object === "page") {
    body.entry.forEach(function(entry) {
      let event = entry.messaging[0];
      let senderId = event.sender.id;
      if (event.message && event.message.text) {
        let userMessage = event.message.text.toLowerCase();

        if (userMessage === "play") {
          let amount = [0, 10, 20, 50, 100, 0][Math.floor(Math.random() * 6)];
          if (!userBalances[senderId]) userBalances[senderId] = 0;

          if (amount === 0) {
            sendMessage(senderId, "😢 আজকে কিছু জেতোনি! আবার লিখো: play");
          } else {
            userBalances[senderId] += amount;
            sendMessage(senderId, `🎉 অভিনন্দন! আপনি জিতেছেন ${amount} টাকা! আপনার মোট ব্যালেন্স: ${userBalances[senderId]} টাকা। 💸`);
          }

        } else if (userMessage === "balance" || userMessage === "bal") {
          let balance = userBalances[senderId] || 0;
          sendMessage(senderId, `💰 আপনার বর্তমান ব্যালেন্স: ${balance} টাকা।`);

        } else if (userMessage === "top") {
          let sortedUsers = Object.entries(userBalances)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

          if (sortedUsers.length === 0) {
            sendMessage(senderId, "কেউ এখনও টাকা জিতেনি!");
          } else {
            let message = "🏆 টপ ৫ সদস্যদের তালিকা:\n";
            sortedUsers.forEach(([userId, balance], i) => {
              message += `${i + 1}. User ID: ${userId} - ${balance} টাকা\n`;
            });
            sendMessage(senderId, message);
          }

        } else {
          sendMessage(senderId, "👋 টাইপ করো: play — টাকা জেতার জন্য, bal — ব্যালেন্স দেখতে, top — সেরা খেলোয়াড় দেখতে!");
        }
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

function sendMessage(senderId, message) {
  request({
    url: "https://graph.facebook.com/v12.0/me/messages",
    qs: { access_token: PAGE_ACCESS_TOKEN },
    method: "POST",
    json: {
      recipient: { id: senderId },
      message: { text: message }
    }
  });
}

// VERIFY webhook
app.get("/webhook", (req, res) => {
  let VERIFY_TOKEN = "win_tk_verify_token";
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.listen(3000, () => console.log("Bot server running"));
