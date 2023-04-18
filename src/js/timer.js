import { render } from "./RenderTomato";
import { state } from "./state";

export const addZero = (n) => {
  return n < 10 ? "0" + n : n;
};

export const startTimer = () => {
  console.log(state.activeTask);
  state.timeleft -= 1;
  render.renderTime(state.timeleft);

  if (state.timeleft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeleft <= 0) {
    console.log(state.activeTask);

    if (state.status === "work") {
      state.activeTask.tomato += 1;
      render.renderActiveTask();

      if (state.activeTask.tomato % state.count) {
        state.status = "break";
      } else {
        state.status = "relax";
      }
    } else {
      state.status = "work";
    }
    state.timeleft = state[state.status] * 60;
    console.log(state.activeTask);
    startTimer();
  }
};
