export const isInputValid = (input) => {
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