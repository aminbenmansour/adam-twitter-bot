const functions = require("firebase-functions");

require('dotenv').config();

const admin = require("firebase-admin");
admin.initializeApp();

const dbRef = admin.firestore().doc("tokens/demo");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

// step 1
exports.auth = functions.https.onRequest((request, response) => {});

// step 2
exports.callback = functions.https.onRequest((request, response) => {});

// step 3
exports.tweet = functions.https.onRequest((request, response) => {});
