import admin from "firebase-admin";

export function isFirebaseConfigured() {
  return Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
}

export async function verifyFirebaseIdToken(idToken) {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase Admin is not configured");
  }
  if (!admin.apps.length) {
    const cred = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
    admin.initializeApp({ credential: admin.credential.cert(cred) });
  }
  return admin.auth().verifyIdToken(idToken);
}
