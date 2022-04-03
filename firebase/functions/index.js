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

const callbackURL = "http://127.0.0.1:5000/openai-bots-a7270/us-central1/callback";

// step 1
exports.auth = functions.https.onRequest((request, response) => {});

// step 2
exports.callback = functions.https.onRequest((request, response) => {});

// step 3
exports.tweet = functions.https.onRequest((request, response) => {});
