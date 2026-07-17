const modalCreateTask = document.querySelector(".modal__overlay");
const closeModal = document.querySelector(".modal__close");
let display = document.querySelector(".modal__input");
let modalTitle = document.querySelector(".modal__title");
const btnAdd = document.querySelector(".add");
// let cancel = document.querySelector(".cancel");
// let confirm = document.querySelector(".confirm");
const changeDiv = document.querySelector(".buttons__div");
let paragraphCard = null;

let currentCard = null;
let currentIcon = null;
let currentPhrase = null;

// Abrir Modal
function enableModal() {
  modalCreateTask.style.display = "block";
}
// Fechar Modal
const disableModal = () => {
  display.value = "";

  if (btnAdd.style.display === "none") {
    btnAdd.style.display = "block";
    changeDiv.style.display = "none";
  }

  modalTitle.textContent = "Adicionar tarefa";
  modalCreateTask.style.display = "none";
};

function enableModalEdit(text) {
  btnAdd.style.display = "none";

  changeDiv.style.display = "flex";

  modalTitle.textContent = "Editar tarefa";
  display.value = text;

  modalCreateTask.style.display = "block";
}

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

const findIcon = (value) => {
  currentIcon = value;

  //lixo
  if (currentIcon.closest("svg").classList.contains("fa-trash")) {
    // Delete
    const removeCard = currentIcon.closest(".card__task");
    removeCard.remove();
  } else if (currentIcon.closest("svg").classList.contains("modal__close")) {
    // Close
    disableModal();
  } else {
    //EDIT
    let paragraph = currentIcon.closest(".card__task");
    let phrase = paragraph.querySelector(".card__text");
    
    paragraphCard = phrase;
    enableModalEdit(phrase.textContent, phrase);
  }
};

addEventListener("click", (e) => {
  let value = e.target;

  if (value.classList.contains("card__button")) {
    currentCard = value;
    enableModal();
  }

  if (value.tagName === "path" || value.tagName === "svg") {
    findIcon(value);
  }

  if (value.classList.contains("add")) {
    let input = display.value;

    if (input === "" || input === null || input === undefined) {
      let attention = document.createElement("p");
      attention.textContent = "Adicione um texto para criar a tarefa";
      attention.classList.add("show");

      const warningElement = document.querySelector(".show");

      if (!warningElement) {
        display.after(attention);
      }

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

  if (value.classList.contains("cancel")) {
    btnAdd.style.display = "block";
    changeDiv.style.display = "none";
    disableModal();
  }

  if (value.classList.contains("confirm")) {
    let input = display.value;
    paragraphCard.textContent = input;
    
      btnAdd.style.display = "block";
      changeDiv.style.display = "none";
      disableModal();
  }
});

