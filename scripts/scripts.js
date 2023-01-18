import { setDate } from "./date-util.js";
import { transformInputValues } from "./transform-string.js";
import { copyBtn } from "./event-listeners.js";
import { retrieveUser } from "./store.js";
import { setFieldsOnLoad } from "./init-on-load.js";

setDate();
retrieveUser();
setFieldsOnLoad();
