export const openModal = (innerHTML, confirm = false) => {
  // Cria o modal dinamicamente
  const modal = document.createElement('wc-modal');
  // Adiciona o conteúdo do modal
  modal.innerHTML = innerHTML;
  
  // Abre o modal dependendo se é pra confirmar ou não
  if(confirm){
    modal.setAttribute('confirm', '');
    document.body.appendChild(modal);
    return modal.open();
  } else {
    document.body.appendChild(modal);
    modal.open()
    return null;
  }
}