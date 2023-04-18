class Task {
  #id;
  #name;
  #tomato;

  constructor(name, tomato = 0) {
    this.#name = name;
    this.#tomato = tomato;
    this.#id = Math.floor(Math.random() * 100);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get tomato() {
    return this.#tomato;
  }

  incrementCount() {
    this.#tomato++;
  }

  changeName(newName) {
    this.#name = newName;
  }

  execute() {
    throw new Error("Importance not set!");
  }
}

class ImportantTask extends Task {
  #importance;

  constructor(name, importance, tomato = 0) {
    super(name, tomato);
    this.#importance = importance;
  }

  get importance() {
    return this.#importance;
  }

  set importance(newImportance) {
    this.#importance = newImportance;
  }

  execute() {
    return {
      name: this.name,
      id: this.id,
      importance: this.importance,
      tomato: this.tomato,
    };
  }
}

class StandardTask extends Task {
  #importance;

  constructor(name, importance, tomato = 0) {
    super(name, tomato);
    this.#importance = importance;
  }

  get importance() {
    return this.#importance;
  }

  set importance(newImportance) {
    this.#importance = newImportance;
  }

  execute() {
    return {
      name: this.name,
      id: this.id,
      importance: this.importance,
      tomato: this.tomato,
    };
  }
}

class UnimportantTask extends Task {
  #importance;

  constructor(name, importance, tomato = 0) {
    super(name, tomato);
    this.#importance = importance;
  }

  get importance() {
    return this.#importance;
  }

  set importance(newImportance) {
    this.#importance = newImportance;
  }

  execute() {
    return {
      name: this.name,
      id: this.id,
      importance: this.importance,
      tomato: this.tomato,
    };
  }
}

export class TaskCreator {
  constructor() {}

  create(name, importance) {
    let Task;

    if (importance === "important") Task = ImportantTask;
    if (importance === "default") Task = StandardTask;
    if (importance === "so-so") Task = UnimportantTask;

    const task = new Task(name, importance);
    return task;
  }
}
