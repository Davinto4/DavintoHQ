// sidebar.js
export function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="bg-blue-900 text-white h-full p-4 space-y-4">
      <h2 class="text-lg font-bold mb-6">DavintoHQ</h2>
      <ul class="space-y-2">
        <li><a href="chat.html" class="block hover:text-yellow-300">💬 Chat</a></li>
        <li id="annLink" style="display: none;"><a href="announcements.html" class="block hover:text-yellow-300">📣 Announcements</a></li>
        <li id="fileLink" style="display: none;"><a href="files.html" class="block hover:text-yellow-300">📁 Files</a></li>
        <li><a href="profile.html" class="block hover:text-yellow-300">👤 Profile</a></li>
        <li id="manageAdmins" style="display: none;"><a href="manage-admins.html" class="block hover:text-yellow-300">⚙️ Manage Admins</a></li>
      </ul>
    </div>
  `;

  import("https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js").then(({ getAuth, onAuthStateChanged }) => {
    const auth = getAuth();
    const ownerEmail = "macdinodavinto@gmail.com";
    const ownerPhone = "+2348169045105";

    onAuthStateChanged(auth, (user) => {
      if (!user) return;
      const emailOrPhone = user.email || user.phoneNumber;

      // Show admin-only links
      if (emailOrPhone === ownerEmail || emailOrPhone === ownerPhone) {
        document.getElementById("annLink").style.display = "block";
        document.getElementById("fileLink").style.display = "block";
        document.getElementById("manageAdmins").style.display = "block";
      } else {
        import("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js").then(({ getFirestore, doc, getDoc }) => {
          const db = getFirestore();
          getDoc(doc(db, "admins", user.uid)).then((docSnap) => {
            if (docSnap.exists()) {
              document.getElementById("annLink").style.display = "block";
              document.getElementById("fileLink").style.display = "block";
            }
          });
        });
      }
    });
  });
}
