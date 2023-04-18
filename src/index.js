import "./js/btn-importance.js";
// import "./js/tomato.js";
// import "./js/task.js";
// import "./js/ControllerTomato.js";
import "./js/state.js";

import "./scss/index.scss";
import { initControl } from "./js/ControllerTomato.js";
import { initRender } from "./js/RenderTomato.js";

const initTomato = () => {
  initRender();
  initControl();
};

initTomato();
