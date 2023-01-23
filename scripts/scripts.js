import "../styles/style.css";

import { setDate } from "./date-util.js";
import { transformInputValues } from "./transform-string.js";
import { copyBtn } from "./event-listeners.js";
import { retrieveUser } from "./store.js";
import { setFieldsOnLoad } from "./init-on-load.js";

try {
  setDate();
  retrieveUser();
  setFieldsOnLoad();
} catch (error) {
  console.warn("There was an error starting this application", error);
}
