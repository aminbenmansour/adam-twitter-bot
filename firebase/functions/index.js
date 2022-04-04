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

// OpenAI API init
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_SECRET,
});

const openai = new OpenAIApi(configuration);

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

// STEP 2 - Verify callback code, store access_token 
exports.callback = functions.https.onRequest(async (request, response) => {
    const { state, code } = request.query;

    const dbSnapshot = await dbRef.get();
    const { codeVerifier, state: storedState } = dbSnapshot.data();

    if (state != storedState) {
        return response.status(400).send('Stored tokens do not match!');
    } else {
        const { client: loggedClient, accessToken, refreshToken } = await twitterClient.loginWithOAuth2({
            code, codeVerifier, redirectUri: callbackURL
            });
        
        await dbRef.set({ accessToken, refreshToken });
        
        const { data } = await loggedClient.v2.me(); // start using the client if you want
        
        response.send(data);
    }
});

// step 3
exports.tweet = functions.https.onRequest((request, response) => {});
