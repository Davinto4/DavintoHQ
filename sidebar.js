// sidebar.js import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"; import { listenForNotifications } from "./notification-utils.js";

export function loadSidebar() { const sidebar = document.getElementById("sidebar"); const auth = getAuth();

sidebar.innerHTML = <div class="w-64 bg-white shadow-md h-full flex flex-col"> <div class="p-4 text-xl font-bold text-blue-600 border-b">DavintoHQ</div> <nav class="flex-1 p-4 space-y-2"> <a href="dashboard.html" class="block p-2 rounded hover:bg-blue-100">🏠 Dashboard</a> <a href="profile.html" class="block p-2 rounded hover:bg-blue-100">👤 Profile</a> <a href="files.html" class="block p-2 rounded hover:bg-blue-100">📁 Files</a> <a href="announcements.html" class="block p-2 rounded hover:bg-blue-100">📢 Announcements</a> <a href="blog.html" class="block p-2 rounded hover:bg-blue-100">📰 Blog</a> <a href="private-chat.html" class="block p-2 rounded hover:bg-blue-100">💬 Messages</a> <a href="search.html" class="block p-2 rounded hover:bg-blue-100">🔍 Search</a> <a href="manage-admins.html" class="block p-2 rounded hover:bg-blue-100">🛡️ Manage Admins</a> <a href="admin.html" class="block p-2 rounded hover:bg-blue-100">⚙️ Admin</a> </nav> <div class="p-4 border-t flex items-center justify-between"> <button id="logoutBtn" class="text-sm text-red-500">Logout</button> <div class="relative"> <button id="notifBtn" class="relative"> 🔔<span id="notifBadge" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 hidden"></span> </button> <div id="notifDropdown" class="absolute right-0 mt-2 w-64 bg-white border shadow-lg hidden z-50"></div> </div> </div> </div>;

onAuthStateChanged(auth, user => { if (!user) return location.href = "index.html"; });

document.getElementById("logoutBtn").addEventListener("click", () => signOut(auth));

const notifBtn = document.getElementById("notifBtn"); const notifBadge = document.getElementById("notifBadge"); const notifDropdown = document.getElementById("notifDropdown");

notifBtn.addEventListener("click", () => { notifDropdown.classList.toggle("hidden"); });

listenForNotifications(data => { const user = auth.currentUser; const unread = data.filter(n => !n.readBy?.includes(user.uid)); notifBadge.textContent = unread.length; notifBadge.classList.toggle("hidden", unread.length === 0);

notifDropdown.innerHTML = data.map(n => `
  <div class="p-2 border-b hover:bg-gray-100">
    <div class="text-sm font-semibold">${n.title}</div>
    <div class="text-xs text-gray-500">${new Date(n.timestamp?.seconds * 1000 || Date.now()).toLocaleString()}</div>
    <div class="text-sm text-gray-700">${n.message}</div>
  </div>
`).join("");

}); }

