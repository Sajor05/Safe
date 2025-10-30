const open = document.querySelectorAll(".user-card-openform");
const modal = document.querySelector(".modal");
const span = document.querySelector(".form-close");
open.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.style.display = "block";
  });
});
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
