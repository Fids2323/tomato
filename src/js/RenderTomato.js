import { getStorage } from "./serviceStorage";
import { state } from "./state";
import { addZero } from "./timer";

export class RenderTomato {
  constructor() {}

  renderTaskList(tasks) {
    const taskListContainer = document.querySelector(
      ".pomodoro-tasks__quest-tasks"
    );
    taskListContainer.textContent = "";

    tasks.forEach((task, index) => {
      const taskElement = document.createElement("li");
      taskElement.classList.add(
        "pomodoro-tasks__list-task",
        `${task.importance}`
      );
      taskElement.innerHTML = `
			<span class="count-number">${++index}</span>
			<button class="pomodoro-tasks__task-text">${task.name}</button>
			<button class="pomodoro-tasks__task-button"></button>
			<!-- popup menu -->
			<div class="burger-popup">
				<button class="popup-button burger-popup__edit-button">Редактировать</button>
				<button class="popup-button burger-popup__delete-button">Удалить</button>
			</div>
			`;

      taskListContainer.append(taskElement);
    });
  }

  renderTime(seconds) {
    const timeContainer = document.querySelector(".window__timer-text");
    const second = addZero(seconds % 60);
    const minute = addZero(Math.floor(seconds / 60));
    timeContainer.textContent = `${minute}:${second}`;
  }

  renderActiveTask() {
    const windowTitle = document.querySelector(".window__panel-title");
    const windowTaskCount = document.querySelector(".window__panel-task-text");
    const windowTimer = document.querySelector(".window__timer-text");
    const taskList = document.querySelectorAll(".pomodoro-tasks__task-text");

    if (state.activeTask) {
      windowTitle.textContent = state.activeTask.name;
      windowTaskCount.textContent = `Томат ${state.activeTask.tomato}`;
      windowTimer.textContent = `${state.work}:00`;

      let activeTaskElem;

      for (const task of taskList) {
        if (task.textContent === state.activeTask.name) {
          activeTaskElem = task;
        }
        if (task.classList.contains("pomodoro-tasks__task-text_active")) {
          task.classList.remove("pomodoro-tasks__task-text_active");
        }
      }
      activeTaskElem.classList.add("pomodoro-tasks__task-text_active");
    } else {
      windowTitle.textContent = "";
      windowTaskCount.textContent = "";
      windowTimer.textContent = "00:00";
    }
  }

  renderStopActiveTask() {
    const windowTaskCount = document.querySelector(".window__panel-task-text");
    windowTaskCount.textContent = `Томат ${state.activeTask.tomato}`;
  }
}

export const render = new RenderTomato();

export const initRender = () => {
  const taskList = getStorage("tasks");
  render.renderTaskList(taskList);

  render.renderActiveTask();
};
