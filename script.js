const modal = document.querySelector(".modal__overlay");
const closeModal = document.querySelector(".modal__close");
let currentCard = null;
let display = document.querySelector(".modal__input");

// Abrir Modal
function enableModal() {
  modal.style.display = "block";
}
// Fechar Modal
const disableModal = () => {
  display.value = "";
  modal.style.display = "none";
};

// Creates a task card
const createTask = (display) => {
  const cardTask = document.createElement("div");
  cardTask.classList.add("card__task");

  const cardInput = document.createElement("input");
  cardInput.classList.add("card__input");
  cardInput.setAttribute("type", "checkbox");

  const card__text = document.createElement("p");
  card__text.classList.add("card__text");
  card__text.textContent = display;

  const card__icons = document.createElement("div");
  card__icons.classList.add("card__icons");

  const pen = document.createElement("i");
  pen.classList.add("fa-solid", "fa-pen-to-square");

  const trash = document.createElement("i");
  trash.classList.add("fa-solid", "fa-trash");

  // Estruturando o card
  cardTask.append(cardInput, card__text, card__icons);
  card__icons.append(pen, trash);

  return cardTask;
};

addEventListener("click", (e) => {
  let value = e.target;

  if (value.classList.contains("card__button")) {
    currentCard = value;
    enableModal();
  }

  if (value.tagName === "path" || value.tagName === "svg") {
    disableModal();
  }

  if (value.classList.contains("modal__button")) {
    let input = display.value;
    console.log(input === "");

    if (input === "" || input === null || input === undefined) {
      let attention = document.createElement("p");
      attention.textContent = "Adicione um texto para criar a tarefa";
      attention.classList.add("show");
      display.after(attention);

      setTimeout(() => {
        attention.classList.remove("show");
        attention.classList.add("hidden");
      }, 3000);

    } else {
      // Armazena o botão do "new task" clicado para encontrar o card pai mais próximo
      const cardElement = currentCard.closest(".card");

      // Procuro o filho no card pai
      const closestChild = cardElement.querySelector(".card__list");

      let resultCard = createTask(input);

      closestChild.append(resultCard);

      disableModal();
    }
  }
});
