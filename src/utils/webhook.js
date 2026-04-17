const axios = require("axios");

const sendWebhook = async (data) => {
  const url = process.env.WEBHOOK_URL;

  let retries = 3;
  let delay = 1000;

  while (retries > 0) {
    try {
      await axios.post(url, data);
      console.log("✅ Webhook sent");
      return;
    } catch (err) {
      console.log("❌ Retry...");
      retries--;
      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

module.exports = { sendWebhook };