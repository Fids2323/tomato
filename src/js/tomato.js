import { Task } from "./task";

export class Tomato {
  constructor({
    taskTime = 25,
    breakTime = 5,
    longBreakTime = 15,
    tasks = [],
  }) {
    this.taskTime = taskTime;
    this.breakTime = breakTime;
    this.longBreakTime = longBreakTime;
    this.tasks = tasks;
    this.activeTask = null;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  activateTask(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      this.activeTask = task;
      console.log(`Task ${this.activeTask.id} activated.`);
    } else {
      console.log(`Task ${taskId} not found.`);
    }
  }

  startTask() {
    if (this.activeTask) {
      console.log(`Task ${this.activeTask.id} started.`);
      setTimeout(() => {
        console.log(`Task ${this.activeTask.id} finished.`);

        if (this.counter % 3 === 0) {
          console.log(`Starting long break for ${this.longBreakTime} minutes.`);
          setTimeout(() => {
            console.log(`Long break finished.`);
          }, this.longBreakTime * 60000);
        } else {
          console.log(`Starting short break for ${this.breakTime} minutes.`);
          setTimeout(() => {
            console.log(`Short break finished.`);
          }, this.breakTime * 60000);
        }
        this.increaseTaskCounter(this.activeTask.id);
      }, this.taskTime * 60000);
    } else {
      console.log(`No active task.`);
    }
  }

  increaseTaskCounter(taskId) {
    const task = this.tasks.find((task) => task.id === taskId);
    if (task) {
      task.incrementCount();
    } else {
      console.log(`Task ${taskId} not found.`);
    }
  }
}

const taskTest = new Task("Test", 2);
const tomatoTimer = new Tomato({});

tomatoTimer.addTask(taskTest);
tomatoTimer.activateTask(taskTest.id);
tomatoTimer.startTask();
