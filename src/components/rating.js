const ratingInputs = document.querySelectorAll('.evaluation input[name="nota"]');
const coffes = document.querySelectorAll('.coffe');

ratingInputs.forEach(input => {

  input.addEventListener('change', () => {
    const selectedValue = document.querySelector('input[name="nota"]:checked').value;
    paint();

    // console.log(`Avaliação selecionada: ${selectedValue}`);
  });
});

function paint() {
  const selectedValue = document.querySelector('input[name="nota"]:checked').value;
  coffes.forEach(coffe => {
    coffe.classList.remove('filled');
  })
  for(let i = 1; i <= selectedValue; i++){
    coffes[i-1].classList.add('filled');
  }
}