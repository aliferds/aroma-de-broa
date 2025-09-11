import { openModal } from "./openModal.js";
import { isInputValid } from "./validarInputs.js";

const form = document.querySelector("form");

// Objeto para mapear IDs de formulários para suas funções de validação
const validationFunctions = {
  register: validateRegisterForm,
  feedback: validateFeedbackForm,
  contato: validateContatoForm,
};

// Adiciona um listener para o evento 'submit' no formulário
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isFormValid = true;

  // 1. Validação genérica para todos os inputs
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    // Para inputs que têm a validação `required`
    if (input.required) {
      if (!isInputValid(input)) {
        isFormValid = false;
        input.classList.add("invalid");
      }
    }
  });

  // Validação específica para cada tipo de formulário
  const specificValidationFunction = validationFunctions[form.id];
  if (specificValidationFunction) {
    if (!specificValidationFunction()) {
      isFormValid = false;
    }
  }

  // Resultado final da validação
  if (isFormValid) {
    console.log("Formulário validado! Enviando dados para a API.");
    // Lógica para enviar para a API aqui
  } else {
    openModal("<p>Por favor, preencha todos os campos corretamente.</p>");
  }
});

function validateRegisterForm() {
  const minimum = 1;
  const listOfInterests = form.querySelectorAll(
    '.register_products_list input[type="checkbox"]'
  );
  let amount = 0;
  listOfInterests.forEach((interest) => {
    if (interest.checked) {
      amount++;
    }
  });

  if (amount < minimum) {
    const paragraph = document.querySelector(".register_products p");
    paragraph.classList.add("invalid");
    return false; // Retorna false se a validação falhar
  }
  return true;
}

function validateFeedbackForm() {
  const rating = form.querySelectorAll('input[type="radio"]');
  let isRated = Array.from(rating).some((rate) => rate.checked);

  if (!isRated) {
    const paragraph = form.querySelector("form div fieldset p");
    paragraph.classList.add("invalid");
    return false;
  }
  return true;
}

function validateContatoForm() {
  const msg = form.querySelector("textarea");
  if (!textValidate(msg)) {
    msg.classList.add("invalid");
    return false;
  }
  return true;
}