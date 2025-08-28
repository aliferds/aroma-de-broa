const ratingInputs = document.querySelectorAll('.evaluation input[name="nota"]');
const coffes = document.querySelectorAll('.coffe');

ratingInputs.forEach(input => {
  input.addEventListener('change', () => {
    paint();
  });
});

function removeClass(elem, c){
  elem.classList.remove(c);
}

function paint() {
  const selectedValue = document.querySelector('input[name="nota"]:checked').value;
  coffes.forEach(coffe => {
    coffe.classList.remove('filled');
    
  })
  const lines = document.querySelectorAll('line');
  lines.forEach(line => {
    line.classList.remove('smoke');
  })
  for(let i = 0; i < selectedValue; i++){
    coffes[i].classList.add('filled');
  }
  for(let i = 0; i <= (selectedValue * 3); i++){
    lines[i].classList.add('smoke');
  }
}