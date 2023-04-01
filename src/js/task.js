class Task {
  #id;
  #name;
  #count;
  constructor(name, count = 0) {
    this.#id = Math.random().toString(36).substring(2, 9); //generate id
    this.#name = name;
    this.#count = count;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get count() {
    return this.#count;
  }

  incrementCount() {
    this.#count++;
  }

  changeName(newName) {
    this.#name = newName;
  }
}

export const task = new Task("Купить", 2);
