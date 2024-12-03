import cron from "node-cron";

// Cron Job running every hour
cron.schedule("0 * * * *", async () => {
  // await cron1();
});
