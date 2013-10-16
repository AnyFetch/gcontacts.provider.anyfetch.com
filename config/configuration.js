/**
 * @file Defines the provider settings.
 *
 * Will set the path to Mongo, and applications id
 * Most of the configuration can be done using system environment variables.
 */

// node_env can either be "development" or "production"
var node_env = process.env.NODE_ENV || "development";

// Port to run the app on. 8000 for development
// (Vagrant syncs this port)
// 80 for production
var default_port = 8000;
if(node_env === "production") {
  default_port = 80;
}

// Exports configuration for use by app.js
module.exports = {
  env: node_env,
  port: process.env.PORT || default_port,

  google_id: process.env.GOOGLE_CONTACTS_ID,
  google_secret: process.env.GOOGLE_CONTACTS_SECRET,
  google_callback: process.env.GOOGLE_CONTACTS_CALLBACK_URL,

  connect_url: process.env.GOOGLE_CONTACTS_CONNECT_URL,
  cluestr_id: process.env.GOOGLE_CONTACTS_CLUESTR_ID,
  cluestr_secret: process.env.GOOGLE_CONTACTS_CLUESTR_SECRET,

  test_refresh_token: process.env.GOOGLE_CONTACTS_TEST_REFRESH_TOKEN
};
