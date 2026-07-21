const modalCreateTask = document.querySelector(".modal__overlay");
const closeModal = document.querySelector(".modal__close");
const changeDiv = document.querySelector(".buttons__div");
const btnAdd = document.querySelector(".add");

let display = document.querySelector(".modal__input");
let modalTitle = document.querySelector(".modal__title");
let paragraphCard = null;
let currentCard = null;
let currentIcon = null;

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

const loadFromLocalStorage = () => {
  const dados = localStorage.getItem("tarefas");
  // Teoricamente, aqui tenho um array como string

  const parseObject = JSON.parse(dados);
  // Aqui eu converto para array novamente

  if (parseObject !== null) {
    const sections = document.querySelectorAll(".card");

    parseObject.forEach((obj) => {
      sections.forEach((section) => {
        const card = section.querySelector(".card__title");
        const cardList = section.querySelector(".card__list");
        if (card.textContent === obj.dia) {
          obj.tarefas.forEach((tarefa) => {
            let result = createTask(tarefa);
            cardList.append(result);
          });
        }
      });
    });
  }
};

// Chamando para carregar os dados
loadFromLocalStorage();

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

const findIcon = (value) => {
  currentIcon = value;

  //lixo
  if (currentIcon.closest("svg").classList.contains("fa-trash")) {
    // Delete
    const removeCard = currentIcon.closest(".card__task");
    removeCard.remove();
    saveToLocalStorage();
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

      saveToLocalStorage();

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

    saveToLocalStorage();

    disableModal();
  }
});

const saveToLocalStorage = () => {
  const cards = document.querySelectorAll(".card");
  const dados = [];

  cards.forEach((card) => {
    const titleCard = card.querySelector(".card__title");
    let taskCard = card.querySelectorAll(".card__text");

    const obj = { dia: titleCard.textContent, tarefas: [] };
    dados.push(obj);

    taskCard.forEach((tarefa) => {
      let textCard = tarefa.textContent;
      obj.tarefas.push(textCard);
    });
  });

  localStorage.setItem("tarefas", JSON.stringify(dados));
};
