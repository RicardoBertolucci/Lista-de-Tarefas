const modal = document.querySelector(".modal__overlay");
const closeModal = document.querySelector(".modal__close");

const enableModal = () => {
  modal.style.display = "block";
};

const disableModal = () => {
  modal.style.display = "none";
};

addEventListener("click", (e) => {
  let value = e.target;
  console.log(value);

  if(value.classList.contains("card__button")) {
    enableModal();
  }

  if(value.tagName === "path" || value.tagName === "svg"){
    disableModal();
  }
});
