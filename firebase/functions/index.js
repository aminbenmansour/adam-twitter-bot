const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// step 1
exports.auth = functions.https.onRequest((request, response) => {});

// step 2
exports.callback = functions.https.onRequest((request, response) => {});

// step 3
exports.tweet = functions.https.onRequest((request, response) => {});
