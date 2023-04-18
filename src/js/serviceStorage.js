const getStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const editStorage = (key, updatedObj) => {
  const data = getStorage(key);
  const updatedData = data.map((obj) => {
    if (obj.id === updatedObj.id) {
      return { ...obj, ...updatedObj };
    }
    return obj;
  });
  localStorage.setItem(key, JSON.stringify(updatedData));
};

const removeStorage = (key, id) => {
  let data = getStorage(key);
  data = data.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(data));
};

export { getStorage, setStorage, removeStorage, editStorage };
