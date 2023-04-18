import { render } from "./RenderTomato";
import { editStorage, getStorage } from "./serviceStorage";
import { state } from "./state";
import { startTimer } from "./timer";

class Tomato {
  constructor({ taskTime = 20, breakTime = 5, longBreakTime = 15 }) {
    if (Tomato.instance) {
      return Tomato.instance;
    }

    this.taskTime = taskTime;
    this.breakTime = breakTime;
    this.longBreakTime = longBreakTime;
    this.tasks = getStorage("tasks");
    this.activeTask = "null";
    this.render = render;

    Tomato.instance = this;
  }

  addTask(task) {
    this.tasks.push(task);
    console.log(this.tasks);
    this.render.renderTaskList(this.tasks);
  }

  activateTask(text) {
    const task = this.tasks.find((task) => task.name === text);
    if (task) {
      this.activeTask = task;
      state.activeTask = task;
      console.log(`Task ${this.activeTask.name} activated.`);
    } else {
      console.log(`Task ${text} not found.`);
    }
    render.renderActiveTask();
  }

  startTask() {
    startTimer();
  }
  stopTask(seconds) {
    render.renderTime(seconds);
    render.renderStopActiveTask();
  }

  editTask(oldTitle, newTitle) {
    const taskItem = this.tasks.find((task) => task.name === oldTitle);
    taskItem.name = newTitle;
    editStorage("tasks", taskItem);
    if (state.activeTask && taskItem.name === state.activeTask.name) {
      state.activeTask.name = taskItem.name;
      render.renderActiveTask;
    }

    render.renderTaskList(this.tasks);
  }
}

export const tomatoTimer = new Tomato({});

export default Tomato;
