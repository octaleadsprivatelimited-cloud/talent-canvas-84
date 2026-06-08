import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBueUkcslJoo8w4aYrhg4O8pH-vhy8FpUs",
  authDomain: "virelixconsulting.firebaseapp.com",
  projectId: "virelixconsulting",
  storageBucket: "virelixconsulting.firebasestorage.app",
  messagingSenderId: "12728492405",
  appId: "1:12728492405:web:03af0dcb570e6c6b0bf33c",
  measurementId: "G-C4JD1G7S13",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const run = async () => {
  console.log("Authenticating with Firebase Auth...");
  try {
    // Try signing in with the new domain admin first
    await signInWithEmailAndPassword(auth, "admin@virelixconsulting.com", "admin123456");
    console.log("Authenticated as admin@virelixconsulting.com");
  } catch (err) {
    console.log("New domain admin login failed, trying old domain admin...");
    try {
      await signInWithEmailAndPassword(auth, "admin@virelix.com", "admin123456");
      console.log("Authenticated as admin@virelix.com");
    } catch (err2) {
      console.error("Authentication failed:", err2.message);
      return;
    }
  }

  console.log("Updating Firestore site_settings emails...");
  try {
    const globalDocRef = doc(db, "site_settings", "global");
    await updateDoc(globalDocRef, {
      contact_email: "info@virelixconsulting.com",
    });
    console.log("Updated site_settings global contact_email.");
  } catch (err) {
    console.warn("Could not update site_settings global:", err.message);
  }

  console.log("Updating Firestore team_members emails...");
  try {
    const teamSnapshot = await getDocs(collection(db, "team_members"));
    for (const docSnapshot of teamSnapshot.docs) {
      const data = docSnapshot.data();
      if (data.email && data.email.endsWith("@virelix.com")) {
        const newEmail = data.email.replace("@virelix.com", "@virelixconsulting.com");
        await updateDoc(docSnapshot.ref, { email: newEmail });
        console.log(`Updated team member ${docSnapshot.id} email to: ${newEmail}`);
      }
    }
  } catch (err) {
    console.warn("Could not update team_members:", err.message);
  }

  console.log("Email update script execution complete.");
};

run().catch(console.error);
