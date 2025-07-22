import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getUserRole(uid) {
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().role : null;
}

export async function isAdmin(uid) {
  const role = await getUserRole(uid);
  return role === "admin" || role === "owner";
}

export async function isOwner(uid) {
  const role = await getUserRole(uid);
  return role === "owner";
}