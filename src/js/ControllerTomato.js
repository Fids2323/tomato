import { setStorage } from "./serviceStorage";
import { state } from "./state";
import { TaskCreator } from "./task";
import { tomatoTimer } from "./tomato";

class ControllerTomato {
  constructor(el) {
    this.el = el;
    this.el.addEventListener("click", this);
    this.tomatoTimer = tomatoTimer;
  }
  handleEvent(event) {
    event.preventDefault();
    const target = event.target;
    const btnStart = document.querySelector(".button-primary");

    if (target.closest(".task-form__add-button")) {
      const buttonImportance = document.querySelector(".button-importance");
      const taskForm = document.querySelector(".task-form");

      const formData = new FormData(taskForm);
      const data = Object.fromEntries(formData);
      const name = data["task-name"];
      const importance = buttonImportance.classList[2];

      const creator = new TaskCreator();
      const task = creator.create(name, importance).execute();
      setStorage("tasks", task);
      this.tomatoTimer.addTask(task);

      taskForm.reset();
    }

    if (target.closest(".window__buttons")) {
      if (state.isActive) {
        clearTimeout(state.timerId);
        state.isActive = false;
        btnStart.textContent = "Старт";
      } else {
        state.isActive = true;
        btnStart.textContent = "Пауза";
        this.tomatoTimer.startTask();
      }
    }

    if (target.closest(".button-secondary")) {
      clearTimeout(state.timerId);
      state.isActive = false;
      btnStart.textContent = "Старт";
      state.timeleft = state[state.status] * 60;
      this.tomatoTimer.stopTask(state.timeleft);
    }

    if (target.closest(".pomodoro-tasks__task-text")) {
      this.tomatoTimer.activateTask(target.textContent);
      state.status = "work";
      clearTimeout(state.timerId);
      state.isActive = false;
      btnStart.textContent = "Старт";
      state.timeleft = state[state.status] * 60;
    }

    if (target.matches(".pomodoro-tasks__task-button")) {
      const popups = document.querySelectorAll(".burger-popup");
      const burgerPopup = target.nextElementSibling;

      for (const popup of popups) {
        if (
          popup.classList.contains("burger-popup_active") &&
          popup !== burgerPopup
        ) {
          popup.classList.remove("burger-popup_active");
        }
      }
      burgerPopup.classList.toggle("burger-popup_active");
    } else if (!target.closest(".burger-popup")) {
      const popups = document.querySelectorAll(".burger-popup");

      for (const popup of popups) {
        popup.classList.remove("burger-popup_active");
      }
    }

    if (target.closest(".burger-popup__edit-button")) {
      const taskText = target.parentElement.parentElement.querySelector(
        ".pomodoro-tasks__task-text"
      ).textContent;

      const newTitle = prompt("Название задачи", `${taskText}`);

      tomatoTimer.editTask(taskText, newTitle);
    }
  }

  destroy() {
    this.el.removeEventListener("click", this);
  }
}

export const initControl = () => {
  const body = document.querySelector("body");
  const controller = new ControllerTomato(body);
};
