const withPlugins = require("next-compose-plugins");
require("dotenv").config();

module.exports = withPlugins([], {
  env: {
    SENTRY_DSN: process.env.SENTRY_DSN,
    GOOGLE_ANALYTICS_TRACKER_ID: process.env.GOOGLE_ANALYTICS_TRACKER_ID,
    HOTJAR_HJID: process.env.HOTJAR_HJID,
    HOTJAR_HJSV: process.env.HOTJAR_HJSV
  }
});
