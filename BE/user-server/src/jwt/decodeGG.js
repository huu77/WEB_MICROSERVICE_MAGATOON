const admin = require('firebase-admin');
const path = require("path");

const serviceAccount = require('./key/firebaseKey.json');
const ResponseFactory = require('../response_design');

// Initialize the Firebase Admin app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Create an async function to decode tokens
async function decodeFirebaseToken(token) {
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        return ResponseFactory.createResponse(401,error)
    }
}

module.exports = decodeFirebaseToken;
