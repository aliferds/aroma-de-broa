// remover dados do localStorage
export const localRemove = (key) => {
  localStorage.removeItem(key);
}

// salvar dados no local storage
export const localSave = (key, item) => {
  localStorage.setItem(key, item);
}

// pegar dados do local storage
export const localGet = (key) => {
  localStorage.getItem(key);
}