import { openModal } from "./openModal";

const form = document.querySelector('form');

const submit = form.querySelector('div.form-btns input[type=submit]');

submit.addEventListener('click', (e) => {
  e.preventDefault();
  let isFormValid = true;
  const inputs = form.querySelectorAll('input');

  inputs.forEach(input => {
    // console.log(input);
    // console.log(`${input.type} \n ${input}`);
    if(input.required){
      const isValid = isInputValid(input);
      // console.log(`Validando ${input.id}: ${isValid}`);
      if(!isValid) {
        isFormValid = false;
        input.classList.add('invalid');
      }
    }
  })

  switch(form.id){
    case "register": 
      const minimum = 1;
      const productsInterestCards = document.querySelector('.register_products_list');
      const listOfInterests = productsInterestCards.querySelectorAll('input[type=checkbox');
      // console.log(productsInterest);
      let amount = 0;
      listOfInterests.forEach(interest => {
        if(interest.checked){
          amount++;
        }
      })
      if(amount < minimum){
        isFormValid = false;
        const paragraph = document.querySelector('.register_products p');
        paragraph.classList.add('invalid');
      }
      break;
      case "feedback":
        const rating = document.querySelectorAll('input[type=radio]');
        const paragraph_feedback = document.querySelector('form div fieldset p');
        paragraph_feedback.classList.add('invalid');

        let isRated = false;
        rating.forEach(rate => {
          if(rate.checked){
            isRated = true;
          }
        })
        if(!isRated){
          isFormValid = false;
        }
        break;
      case 'pedido':
        const items = document.querySelector('#produtosCarrinho');
        const paragraph_items = document.querySelector('#itemsOnChart p');
        paragraph_items.classList.add('invalid');
        if(!items){
          isFormValid = false;
        }
        break;
      case 'contato':
        const msg = document.querySelector('textarea');
        if(!textValidate(msg)){
          isFormValid = false;
          msg.classList.add('invalid');
        }
        break;
  }



  if(isFormValid){
    // console.log(`Form validado!`);

    // Colocar lógica para enviar para API
    
  } else {
    openModal(`<p>Preencha todos os campos!<p>`);
  }
})

const isInputValid = (input) => {
  const type = input.type;
  let validation = false;
  switch(type){
    case 'checkbox':
      validation = checkboxValidate(input);
      break;
    case 'text':
      validation = textValidate(input);
      break;
    case 'email':
      validation = emailValidate(input);
      break;
    case 'number': 
      validation = numberValidate(input);
      break;
    case 'date':
      validation = dateValidate(input);
      break;
    case 'tel': 
      validation = telValidate(input);
      break;
    default: 
      console.log(`There is no validation to ${type}`);
  }
  return validation;
}

const textValidate = (text) => {
  if(text.value.trim() === ''){
    return false;
  }
  return true;
}
const emailValidate = (email) => {
  const mail = email.value;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(mail);
}
const dateValidate = (date) => {
  if(date.value.trim() === ''){
    return false;
  } else {
    const dataDigitada = new Date(date.value);
    if (isNaN(dataDigitada.getTime())) {
      return false;
    }
  }
  return true;
}

const numberValidate = (number, minValue) => {
  const min = number >= minValue ? true : false;
  const max = number <= maxValue ? true : false;
  if(min && max){
    return true;
  } else {
    return false;
  }
}

const telValidate = (tel) => {
  if(tel.value.trim() === '') {
    return false;
  } else {
    if (tel.value.length === 10 || tel.value.length === 11) {
      return true;
    }
    return false;
  }
}
const checkboxValidate = (checkbox) => {
  if(!checkbox.checked){
    return false;
  }
  return true;
}