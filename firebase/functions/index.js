const functions = require("firebase-functions");

require('dotenv').config();

const admin = require("firebase-admin");
admin.initializeApp();

const dbRef = admin.firestore().doc("tokens/adam");

const TwitterApi = require("twitter-api-v2").default;
const twitterClient = new TwitterApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

const callbackURL = "http://127.0.0.1:5000/openai-bots-a7270/us-central1/callback";

// STEP 1 - Auth URL
exports.auth = functions.https.onRequest(async (request, response) => {
    const { url, codeVerifier, state } = twitterClient.generateOAuth2AuthLink(
      callbackURL,
      { scope: ['tweet.read', 'tweet.write', 'users.read', 'offline.access'] }
    );
  
    // store verifier
    await dbRef.set({ codeVerifier, state });
  
    response.redirect(url);
  });

// step 2
exports.callback = functions.https.onRequest((request, response) => {});

// step 3
exports.tweet = functions.https.onRequest((request, response) => {});
