import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';

// Explicitly hardcoded Firebase client credentials strictly for project 'kingofdeep'
// Completely bypassing any Google AI Studio environment variables, secondary drivers, or Cloud SQL bindings
export const firebaseConfig = {
  apiKey: "AIzaSyANi1hKBMLRQk2keakcLjLv9PsQAxJTQN8",
  authDomain: "kingofdeep.firebaseapp.com",
  projectId: "kingofdeep",
  storageBucket: "kingofdeep.firebasestorage.app",
  messagingSenderId: "865058774465",
  appId: "1:865058774465:web:083d2a7ee22f2d61b92340",
  measurementId: "G-41F5PSQ7LR",
  firestoreDatabaseId: "(default)",
  recaptchaSiteKey: ""
};

// Initialize Firebase App only once with explicit 'kingofdeep' config
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and Cloud Firestore instances strictly once
export const auth = getAuth(app);
export const db = getFirestore(app);

console.log("[FIREBASE] Initialized Firebase Auth and Cloud Firestore strictly with hardcoded 'kingofdeep' configuration.");

// Validate connection to Firestore on boot
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}
