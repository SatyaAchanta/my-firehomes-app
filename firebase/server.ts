// READ this file to understand the code below.
// This file is responsible for the server-side code of the Firebase firestore database.

import { getApps, ServiceAccount } from "firebase-admin/app";
import admin from "firebase-admin";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";

const serviceAccount = {
    "type": "service_account",
    "project_id": "my-firehomes-app",
    "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
    "private_key": process.env.FIREBASE_PRIVATE_KEY,
    "client_email": process.env.FIREBASE_CLIENT_EMAIL,
    "client_id": process.env.FIREBASE_CLIENT_ID,
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-teg0i%40my-firehomes-app.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

let firestore: Firestore;
let auth: Auth;
const currentApp = getApps().length > 0 ? getApps()[0] : admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

auth = getAuth(currentApp);
firestore = getFirestore(currentApp);

export { firestore, auth };