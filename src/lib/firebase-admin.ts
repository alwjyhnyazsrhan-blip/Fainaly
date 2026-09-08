import { initializeApp, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Explicitly hardcoded Firebase Admin configuration strictly for project 'kingofdeep'
export const firebaseAdminConfig = {
  projectId: 'kingofdeep',
};

if (!getApps().length) {
  initializeApp(firebaseAdminConfig);
}

export const adminAuth = getAuth();
export const adminDb = getFirestore();

