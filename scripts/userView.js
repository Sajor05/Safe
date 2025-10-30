import { loadUsers } from "/scripts/user.js";
import { users } from "/scripts/user.js";

document.addEventListener("DOMContentLoaded", async () => {
  await loadUsers();
  const container = document.querySelector(".main-container");
  container.innerHTML = users.map((u) => u.userView()).join("");
});
