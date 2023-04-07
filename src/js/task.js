export class Task {
  #id;
  #name;
  #count;
  constructor(name, count = 0) {
    this.#name = name;
    this.#count = count;
    this.#id = Math.floor(Math.random() * 100);
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
