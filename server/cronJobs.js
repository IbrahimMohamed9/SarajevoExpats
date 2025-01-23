const cron = require("node-cron");
const { getEventsFromInstagram } = require("./controllers/eventController");

const scheduleInstagramEventsFetch = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const res = {
          status: (code) => ({
            json: (data) => {},
          }),
        };

        await getEventsFromInstagram({}, res);
      } catch (error) {
        console.error("Error in scheduled Instagram events fetch:", error);
      }
    },
    {
      scheduled: true,
      timezone: "Europe/Sarajevo",
    }
  );

  console.log("Instagram events fetch scheduled to run daily at midnight");
};

module.exports = {
  scheduleInstagramEventsFetch,
};
