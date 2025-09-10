// remover dados do localStorage
export const localRemove = (key) => {
  localStorage.removeItem(key);
}

// salvar dados no local storage
export const localSave = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
}

// pegar dados do local storage
export const localGet = (key) => {
  const get = localStorage.getItem(key);
  if(get){
    const result = JSON.parse(get);
    return result;
  } else {
    return null;
  }
}