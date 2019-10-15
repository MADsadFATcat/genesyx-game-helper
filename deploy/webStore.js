const store = require('chrome-webstore-upload');
require('dotenv').config();

module.exports = store({
  extensionId: 'iclnmbgdedngcclmfjpkfjljakllneij',
  clientId: process.env.clientId ,
  clientSecret: process.env.clientSecret,
  refreshToken: process.env.refreshToken
});