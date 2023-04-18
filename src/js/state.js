import { tomatoTimer } from "./tomato";

const WORK_TIME = tomatoTimer.taskTime;
const BREAK_TIME = tomatoTimer.breakTime;
const RELAX_TIME = tomatoTimer.longBreakTime;

export const state = {
  work: WORK_TIME,
  break: BREAK_TIME,
  relax: RELAX_TIME,
  status: "work",
  count: 4,
  timeleft: WORK_TIME * 60,
  isActive: false,
  timerId: 0,
};
