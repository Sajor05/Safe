import { loadUsers, users } from "./users.js";

document.addEventListener("DOMContentLoaded", async () => {
  /* C A R G A  T O D O S  L O S  U S U A R I O S  D E L  J S O N */
  await loadUsers();

  /* A G R E G A  L A S  C A R D S */
  const container = document.querySelector(".main-container");
  container.innerHTML = users.map((u) => u.userView()).join("");

  const modal = document.querySelector(".modal");
  const modalClose = document.querySelector(".form-close");

  /* C O N S T R O L  D E L  M O D A L */
  document.addEventListener("click", (e) => {
    if (e.target.matches(".user-card-openform")) {
      modal.style.display = "block";
    } else if (e.target === modal || e.target === modalClose) {
      modal.style.display = "none";
    }
  });
});
