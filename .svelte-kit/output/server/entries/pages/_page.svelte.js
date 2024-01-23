import { V as tick, A as setContext, W as getContext, X as rest_props, z as push, H as value_or_fallback, R as store_get, F as create_anchor, Q as slot, L as spread_attributes, T as unsubscribe_stores, D as bind_props, E as pop, Z as sanitize_props, J as escape_text, K as spread_props, B as copy_payload, C as assign_payload, S as ensure_array_like, _ as escape, O as attr } from "../../chunks/main-client.js";
import { k as builder, o as addMeltEventListener, i as isBrowser, c as isHTMLElement, l as styleToString, R as chunk, g as toWritableStores, B as omit, h as generateIds, z as overridable, n as executeCallbacks, m as effect, y as kbd, T as isValidIndex, d as createElHelpers, q as safeOnMount, j as derivedVisible, v as usePopper, x as getPortalDestination, U as isElement, E as removeScroll, D as handleFocus, G as noop, H as createBitAttrs, I as removeUndefined, J as getOptionUpdater, L as createDispatcher, K as getPositioningUpdater, P as Icon, N as cn, V as buttonVariants, O as flyAndScale, Q as Button } from "../../chunks/Icon.js";
import "clsx";
import { CalendarDateTime, CalendarDate, ZonedDateTime, parseZonedDateTime, parseDateTime, parseDate, getLocalTimeZone, getDayOfWeek, DateFormatter, startOfMonth, endOfMonth, isSameMonth, isSameDay, isToday, today } from "@internationalized/date";
import "dequal";
import { g as get_store_value, w as writable, d as derived } from "../../chunks/index.js";
function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((value, index) => value === arr2[index]);
}
function createLabel() {
  const root = builder("label", {
    action: (node) => {
      const mouseDown = addMeltEventListener(node, "mousedown", (e) => {
        if (!e.defaultPrevented && e.detail > 1) {
          e.preventDefault();
        }
      });
      return {
        destroy: mouseDown
      };
    }
  });
  return {
    elements: {
      root
    }
  };
}
const defaultDateDefaults = {
  defaultValue: void 0,
  defaultPlaceholder: void 0,
  granularity: "day"
};
function getDefaultDate(props) {
  const withDefaults = { ...defaultDateDefaults, ...props };
  const { defaultValue, defaultPlaceholder, granularity } = withDefaults;
  if (Array.isArray(defaultValue) && defaultValue.length) {
    return defaultValue[defaultValue.length - 1];
  }
  if (defaultValue && !Array.isArray(defaultValue)) {
    return defaultValue;
  } else if (defaultPlaceholder) {
    return defaultPlaceholder;
  } else {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const calendarDateTimeGranularities = ["hour", "minute", "second"];
    if (calendarDateTimeGranularities.includes(granularity ?? "day")) {
      return new CalendarDateTime(year, month, day, 0, 0, 0);
    }
    return new CalendarDate(year, month, day);
  }
}
function parseStringToDateValue(dateStr, referenceVal) {
  if (referenceVal instanceof ZonedDateTime) {
    return parseZonedDateTime(dateStr);
  } else if (referenceVal instanceof CalendarDateTime) {
    return parseDateTime(dateStr);
  } else {
    return parseDate(dateStr);
  }
}
function toDate(dateValue, tz = getLocalTimeZone()) {
  if (dateValue instanceof ZonedDateTime) {
    return dateValue.toDate();
  } else {
    return dateValue.toDate(tz);
  }
}
function isCalendarDateTime(dateValue) {
  return dateValue instanceof CalendarDateTime;
}
function isZonedDateTime(dateValue) {
  return dateValue instanceof ZonedDateTime;
}
function hasTime(dateValue) {
  return isCalendarDateTime(dateValue) || isZonedDateTime(dateValue);
}
function getDaysInMonth(date) {
  if (date instanceof Date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    return new Date(year, month, 0).getDate();
  } else {
    return date.set({ day: 100 }).day;
  }
}
function isBefore(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) < 0;
}
function isAfter(dateToCompare, referenceDate) {
  return dateToCompare.compare(referenceDate) > 0;
}
function getLastFirstDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  if (firstDayOfWeek > day) {
    return date.subtract({ days: day + 7 - firstDayOfWeek });
  }
  if (firstDayOfWeek === day) {
    return date;
  }
  return date.subtract({ days: day - firstDayOfWeek });
}
function getNextLastDayOfWeek(date, firstDayOfWeek, locale) {
  const day = getDayOfWeek(date, locale);
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  if (day === lastDayOfWeek) {
    return date;
  }
  if (day > lastDayOfWeek) {
    return date.add({ days: 7 - day + lastDayOfWeek });
  }
  return date.add({ days: lastDayOfWeek - day });
}
function createFormatter(initialLocale) {
  let locale = initialLocale;
  function setLocale(newLocale) {
    locale = newLocale;
  }
  function getLocale() {
    return locale;
  }
  function custom(date, options) {
    return new DateFormatter(locale, options).format(date);
  }
  function selectedDate(date, includeTime = true) {
    if (hasTime(date) && includeTime) {
      return custom(toDate(date), {
        dateStyle: "long",
        timeStyle: "long"
      });
    } else {
      return custom(toDate(date), {
        dateStyle: "long"
      });
    }
  }
  function fullMonthAndYear(date) {
    return new DateFormatter(locale, { month: "long", year: "numeric" }).format(date);
  }
  function fullMonth(date) {
    return new DateFormatter(locale, { month: "long" }).format(date);
  }
  function fullYear(date) {
    return new DateFormatter(locale, { year: "numeric" }).format(date);
  }
  function toParts(date, options) {
    if (isZonedDateTime(date)) {
      return new DateFormatter(locale, {
        ...options,
        timeZone: date.timeZone
      }).formatToParts(toDate(date));
    } else {
      return new DateFormatter(locale, options).formatToParts(toDate(date));
    }
  }
  function dayOfWeek(date, length = "narrow") {
    return new DateFormatter(locale, { weekday: length }).format(date);
  }
  function dayPeriod(date) {
    const parts = new DateFormatter(locale, {
      hour: "numeric",
      minute: "numeric"
    }).formatToParts(date);
    const value = parts.find((p) => p.type === "dayPeriod")?.value;
    if (value === "PM") {
      return "PM";
    }
    return "AM";
  }
  const defaultPartOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  };
  function part(dateObj, type, options = {}) {
    const opts = { ...defaultPartOptions, ...options };
    const parts = toParts(dateObj, opts);
    const part2 = parts.find((p) => p.type === type);
    return part2 ? part2.value : "";
  }
  return {
    setLocale,
    getLocale,
    fullMonth,
    fullYear,
    fullMonthAndYear,
    toParts,
    custom,
    part,
    dayPeriod,
    selectedDate,
    dayOfWeek
  };
}
function dateStore(store, defaultValue) {
  const { set, update, subscribe } = store;
  function add(duration) {
    update((d) => {
      return d.add(duration);
    });
  }
  function nextPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).add({ months: amount });
    });
  }
  function prevPage(amount) {
    update((d) => {
      return d.set({ day: 1 }).subtract({ months: amount });
    });
  }
  function subtract(duration) {
    update((d) => {
      return d.subtract(duration);
    });
  }
  function setDate(fields, disambiguation) {
    if (disambiguation) {
      update((d) => {
        return d.set(fields, disambiguation);
      });
      return;
    }
    update((d) => {
      return d.set(fields);
    });
  }
  function reset() {
    update(() => {
      return defaultValue;
    });
  }
  function toWritable() {
    return {
      set,
      subscribe,
      update
    };
  }
  return {
    set,
    update,
    subscribe,
    add,
    subtract,
    setDate,
    reset,
    toWritable,
    nextPage,
    prevPage
  };
}
function initAnnouncer() {
  if (!isBrowser)
    return null;
  let el = document.querySelector("[data-melt-announcer]");
  if (!isHTMLElement(el)) {
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    div.setAttribute("data-melt-announcer", "");
    div.appendChild(createLog("assertive"));
    div.appendChild(createLog("polite"));
    el = div;
    document.body.insertBefore(el, document.body.firstChild);
  }
  function createLog(kind) {
    const log = document.createElement("div");
    log.role = "log";
    log.ariaLive = kind;
    log.setAttribute("aria-relevant", "additions");
    return log;
  }
  function getLog(kind) {
    if (!isHTMLElement(el))
      return null;
    const log = el.querySelector(`[aria-live="${kind}"]`);
    if (!isHTMLElement(log))
      return null;
    return log;
  }
  return {
    getLog
  };
}
function getAnnouncer() {
  const announcer = initAnnouncer();
  function announce(value, kind = "assertive", timeout = 7500) {
    if (!announcer || !isBrowser)
      return;
    const log = announcer.getLog(kind);
    const content = document.createElement("div");
    if (typeof value === "number") {
      value = value.toString();
    } else if (value === null) {
      value = "Empty";
    } else {
      value = value.trim();
    }
    content.innerText = value;
    if (kind === "assertive") {
      log?.replaceChildren(content);
    } else {
      log?.appendChild(content);
    }
    return setTimeout(() => {
      content.remove();
    }, timeout);
  }
  return {
    announce
  };
}
function isCalendarCell(node) {
  if (!isHTMLElement(node))
    return false;
  if (!node.hasAttribute("data-melt-calendar-cell"))
    return false;
  return true;
}
function getDaysBetween(start, end) {
  const days = [];
  let dCurrent = start.add({ days: 1 });
  const dEnd = end;
  while (dCurrent.compare(dEnd) < 0) {
    days.push(dCurrent);
    dCurrent = dCurrent.add({ days: 1 });
  }
  return days;
}
function createMonth(props) {
  const { dateObj, weekStartsOn, fixedWeeks, locale } = props;
  const daysInMonth = getDaysInMonth(dateObj);
  const datesArray = Array.from({ length: daysInMonth }, (_, i) => dateObj.set({ day: i + 1 }));
  const firstDayOfMonth = startOfMonth(dateObj);
  const lastDayOfMonth = endOfMonth(dateObj);
  const lastSunday = getLastFirstDayOfWeek(firstDayOfMonth, weekStartsOn, locale);
  const nextSaturday = getNextLastDayOfWeek(lastDayOfMonth, weekStartsOn, locale);
  const lastMonthDays = getDaysBetween(lastSunday.subtract({ days: 1 }), firstDayOfMonth);
  const nextMonthDays = getDaysBetween(lastDayOfMonth, nextSaturday.add({ days: 1 }));
  const totalDays = lastMonthDays.length + datesArray.length + nextMonthDays.length;
  if (fixedWeeks && totalDays < 42) {
    const extraDays = 42 - totalDays;
    let startFrom = nextMonthDays[nextMonthDays.length - 1];
    if (!startFrom) {
      startFrom = dateObj.add({ months: 1 }).set({ day: 1 });
    }
    const extraDaysArray = Array.from({ length: extraDays }, (_, i) => {
      const incr = i + 1;
      return startFrom.add({ days: incr });
    });
    nextMonthDays.push(...extraDaysArray);
  }
  const allDays = lastMonthDays.concat(datesArray, nextMonthDays);
  const weeks = chunk(allDays, 7);
  return {
    value: dateObj,
    dates: allDays,
    weeks
  };
}
function createMonths(props) {
  const { numberOfMonths, dateObj, ...monthProps } = props;
  const months = [];
  if (!numberOfMonths || numberOfMonths === 1) {
    months.push(createMonth({
      ...monthProps,
      dateObj
    }));
    return months;
  }
  months.push(createMonth({
    ...monthProps,
    dateObj
  }));
  for (let i = 1; i < numberOfMonths; i++) {
    const nextMonth = dateObj.add({ months: i });
    months.push(createMonth({
      ...monthProps,
      dateObj: nextMonth
    }));
  }
  return months;
}
function getSelectableCells(calendarId) {
  const node = document.getElementById(calendarId);
  if (!node)
    return [];
  const selectableSelector = `[data-melt-calendar-cell]:not([data-disabled]):not([data-outside-visible-months])`;
  return Array.from(node.querySelectorAll(selectableSelector)).filter((el) => isHTMLElement(el));
}
function setPlaceholderToNodeValue(node, placeholder) {
  const cellValue = node.getAttribute("data-value");
  if (!cellValue)
    return;
  placeholder.set(parseStringToDateValue(cellValue, get_store_value(placeholder)));
}
const defaults$1 = {
  isDateDisabled: void 0,
  isDateUnavailable: void 0,
  value: void 0,
  preventDeselect: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  weekStartsOn: 0,
  fixedWeeks: false,
  calendarLabel: "Event Date",
  locale: "en",
  minValue: void 0,
  maxValue: void 0,
  disabled: false,
  readonly: false,
  weekdayFormat: "narrow"
};
const { name: name$1 } = createElHelpers("calendar");
const calendarIdParts = ["calendar", "accessibleHeading"];
function createCalendar(props) {
  const withDefaults = { ...defaults$1, ...props };
  const options = toWritableStores({
    ...omit(withDefaults, "value", "placeholder", "multiple", "ids"),
    multiple: withDefaults.multiple ?? false
  });
  const { preventDeselect, numberOfMonths, pagedNavigation, weekStartsOn, fixedWeeks, calendarLabel, locale, minValue, maxValue, multiple, isDateUnavailable, disabled, readonly, weekdayFormat } = options;
  const ids = toWritableStores({ ...generateIds(calendarIdParts), ...withDefaults.ids });
  const defaultDate = getDefaultDate({
    defaultPlaceholder: withDefaults.defaultPlaceholder,
    defaultValue: withDefaults.defaultValue
  });
  const formatter = createFormatter(withDefaults.locale);
  const valueWritable = withDefaults.value ?? writable(withDefaults.defaultValue);
  const value = overridable(valueWritable, withDefaults.onValueChange);
  const placeholderWritable = withDefaults.placeholder ?? writable(withDefaults.defaultPlaceholder ?? defaultDate);
  const placeholder = dateStore(overridable(placeholderWritable, withDefaults.onPlaceholderChange), withDefaults.defaultPlaceholder ?? defaultDate);
  const months = writable(createMonths({
    dateObj: get_store_value(placeholder),
    weekStartsOn: withDefaults.weekStartsOn,
    locale: withDefaults.locale,
    fixedWeeks: withDefaults.fixedWeeks,
    numberOfMonths: withDefaults.numberOfMonths
  }));
  const visibleMonths = derived([months], ([$months]) => {
    return $months.map((month) => {
      return month.value;
    });
  });
  const isOutsideVisibleMonths = derived([visibleMonths], ([$visibleMonths]) => {
    return (date) => {
      return !$visibleMonths.some((month) => isSameMonth(date, month));
    };
  });
  const isNextButtonDisabled = derived([months, maxValue, disabled], ([$months, $maxValue, $disabled]) => {
    if (!$maxValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const lastMonthInView = $months[$months.length - 1].value;
    const firstMonthOfNextPage = lastMonthInView.add({ months: 1 }).set({ day: 1 });
    return isAfter(firstMonthOfNextPage, $maxValue);
  });
  const isPrevButtonDisabled = derived([months, minValue, disabled], ([$months, $minValue, $disabled]) => {
    if (!$minValue || !$months.length)
      return false;
    if ($disabled)
      return true;
    const firstMonthInView = $months[0].value;
    const lastMonthOfPrevPage = firstMonthInView.subtract({ months: 1 }).set({ day: 35 });
    return isBefore(lastMonthOfPrevPage, $minValue);
  });
  const isDateDisabled = derived([options.isDateDisabled, minValue, maxValue, disabled], ([$isDateDisabled, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if ($isDateDisabled?.(date) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isBefore($maxValue, date))
        return true;
      return false;
    };
  });
  const isDateSelected = derived([value], ([$value]) => {
    return (date) => {
      if (Array.isArray($value)) {
        return $value.some((d) => isSameDay(d, date));
      } else if (!$value) {
        return false;
      } else {
        return isSameDay($value, date);
      }
    };
  });
  const isInvalid = derived([value, isDateDisabled, options.isDateUnavailable], ([$value, $isDateDisabled, $isDateUnavailable]) => {
    if (Array.isArray($value)) {
      if (!$value.length)
        return false;
      for (const date of $value) {
        if ($isDateDisabled?.(date))
          return true;
        if ($isDateUnavailable?.(date))
          return true;
      }
    } else {
      if (!$value)
        return false;
      if ($isDateDisabled?.($value))
        return true;
      if ($isDateUnavailable?.($value))
        return true;
    }
    return false;
  });
  let announcer = getAnnouncer();
  const headingValue = derived([months, locale], ([$months, $locale]) => {
    if (!$months.length)
      return "";
    if ($locale !== formatter.getLocale()) {
      formatter.setLocale($locale);
    }
    if ($months.length === 1) {
      const month = $months[0].value;
      return `${formatter.fullMonthAndYear(toDate(month))}`;
    }
    const startMonth = toDate($months[0].value);
    const endMonth = toDate($months[$months.length - 1].value);
    const startMonthName = formatter.fullMonth(startMonth);
    const endMonthName = formatter.fullMonth(endMonth);
    const startMonthYear = formatter.fullYear(startMonth);
    const endMonthYear = formatter.fullYear(endMonth);
    const content = startMonthYear === endMonthYear ? `${startMonthName} - ${endMonthName} ${endMonthYear}` : `${startMonthName} ${startMonthYear} - ${endMonthName} ${endMonthYear}`;
    return content;
  });
  const fullCalendarLabel = derived([headingValue, calendarLabel], ([$headingValue, $calendarLabel]) => {
    return `${$calendarLabel}, ${$headingValue}`;
  });
  const calendar = builder(name$1(), {
    stores: [fullCalendarLabel, isInvalid, disabled, readonly, ids.calendar],
    returned: ([$fullCalendarLabel, $isInvalid, $disabled, $readonly, $calendarId]) => {
      return {
        id: $calendarId,
        role: "application",
        "aria-label": $fullCalendarLabel,
        "data-invalid": $isInvalid ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0,
        "data-readonly": $readonly ? "" : void 0
      };
    },
    action: (node) => {
      createAccessibleHeading(node, get_store_value(fullCalendarLabel));
      announcer = getAnnouncer();
      const unsubKb = addMeltEventListener(node, "keydown", handleCalendarKeydown);
      return {
        destroy() {
          unsubKb();
        }
      };
    }
  });
  const heading = builder(name$1("heading"), {
    stores: [disabled],
    returned: ([$disabled]) => {
      return {
        "aria-hidden": true,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const grid = builder(name$1("grid"), {
    stores: [readonly, disabled],
    returned: ([$readonly, $disabled]) => {
      return {
        tabindex: -1,
        role: "grid",
        "aria-readonly": $readonly ? "true" : void 0,
        "aria-disabled": $disabled ? "true" : void 0,
        "data-readonly": $readonly ? "" : void 0,
        "data-disabled": $disabled ? "" : void 0
      };
    }
  });
  const prevButton = builder(name$1("prevButton"), {
    stores: [isPrevButtonDisabled],
    returned: ([$isPrevButtonDisabled]) => {
      const disabled2 = $isPrevButtonDisabled;
      return {
        role: "button",
        "aria-label": "Previous",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        if (get_store_value(isPrevButtonDisabled))
          return;
        prevPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const nextButton = builder(name$1("nextButton"), {
    stores: [isNextButtonDisabled],
    returned: ([$isNextButtonDisabled]) => {
      const disabled2 = $isNextButtonDisabled;
      return {
        role: "button",
        "aria-label": "Next",
        "aria-disabled": disabled2 ? "true" : void 0,
        "data-disabled": disabled2 ? "" : void 0,
        disabled: disabled2 ? true : void 0
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        if (get_store_value(isNextButtonDisabled))
          return;
        nextPage();
      }));
      return {
        destroy: unsub
      };
    }
  });
  const cell = builder(name$1("cell"), {
    stores: [
      isDateSelected,
      isDateDisabled,
      isDateUnavailable,
      isOutsideVisibleMonths,
      placeholder
    ],
    returned: ([$isDateSelected, $isDateDisabled, $isDateUnavailable, $isOutsideVisibleMonths, $placeholder]) => {
      return (cellValue, monthValue) => {
        const cellDate = toDate(cellValue);
        const isDisabled = $isDateDisabled?.(cellValue);
        const isUnavailable = $isDateUnavailable?.(cellValue);
        const isDateToday = isToday(cellValue, getLocalTimeZone());
        const isOutsideMonth = !isSameMonth(cellValue, monthValue);
        const isOutsideVisibleMonths2 = $isOutsideVisibleMonths(cellValue);
        const isFocusedDate = isSameDay(cellValue, $placeholder);
        const isSelectedDate = $isDateSelected(cellValue);
        const labelText = formatter.custom(cellDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric"
        });
        return {
          role: "button",
          "aria-label": labelText,
          "aria-selected": isSelectedDate ? true : void 0,
          "aria-disabled": isOutsideMonth || isDisabled || isUnavailable ? true : void 0,
          "data-selected": isSelectedDate ? true : void 0,
          "data-value": cellValue.toString(),
          "data-disabled": isDisabled || isOutsideMonth ? "" : void 0,
          "data-unavailable": isUnavailable ? "" : void 0,
          "data-today": isDateToday ? "" : void 0,
          "data-outside-month": isOutsideMonth ? "" : void 0,
          "data-outside-visible-months": isOutsideVisibleMonths2 ? "" : void 0,
          "data-focused": isFocusedDate ? "" : void 0,
          tabindex: isFocusedDate ? 0 : isOutsideMonth || isDisabled ? void 0 : -1
        };
      };
    },
    action: (node) => {
      const getElArgs = () => {
        const value2 = node.getAttribute("data-value");
        const label = node.getAttribute("data-label");
        const disabled2 = node.hasAttribute("data-disabled");
        return {
          value: value2,
          label: label ?? node.textContent ?? null,
          disabled: disabled2 ? true : false
        };
      };
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        const args = getElArgs();
        if (args.disabled)
          return;
        if (!args.value)
          return;
        handleCellClick(parseStringToDateValue(args.value, get_store_value(placeholder)));
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([locale], ([$locale]) => {
    if (formatter.getLocale() === $locale)
      return;
    formatter.setLocale($locale);
  });
  effect([placeholder, weekStartsOn, locale, fixedWeeks, numberOfMonths], ([$placeholder, $weekStartsOn, $locale, $fixedWeeks, $numberOfMonths]) => {
    if (!isBrowser || !$placeholder)
      return;
    const $visibleMonths = get_store_value(visibleMonths);
    if ($visibleMonths.some((month) => isSameMonth(month, $placeholder))) {
      return;
    }
    const defaultMonthProps = {
      weekStartsOn: $weekStartsOn,
      locale: $locale,
      fixedWeeks: $fixedWeeks,
      numberOfMonths: $numberOfMonths
    };
    months.set(createMonths({
      ...defaultMonthProps,
      dateObj: $placeholder
    }));
  });
  effect([fullCalendarLabel], ([$fullCalendarLabel]) => {
    if (!isBrowser)
      return;
    const node = document.getElementById(get_store_value(ids.accessibleHeading));
    if (!isHTMLElement(node))
      return;
    node.textContent = $fullCalendarLabel;
  });
  effect([value], ([$value]) => {
    if (Array.isArray($value) && $value.length) {
      const lastValue = $value[$value.length - 1];
      if (lastValue && get_store_value(placeholder) !== lastValue) {
        placeholder.set(lastValue);
      }
    } else if (!Array.isArray($value) && $value && get_store_value(placeholder) !== $value) {
      placeholder.set($value);
    }
  });
  const weekdays = derived([months, weekdayFormat, locale], ([$months, $weekdayFormat, _]) => {
    if (!$months.length)
      return [];
    return $months[0].weeks[0].map((date) => {
      return formatter.dayOfWeek(toDate(date), $weekdayFormat);
    });
  });
  function createAccessibleHeading(node, label) {
    if (!isBrowser)
      return;
    const div = document.createElement("div");
    div.style.cssText = styleToString({
      border: "0px",
      clip: "rect(0px, 0px, 0px, 0px)",
      "clip-path": "inset(50%)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0px",
      position: "absolute",
      "white-space": "nowrap",
      width: "1px"
    });
    const h2 = document.createElement("div");
    h2.textContent = label;
    h2.id = get_store_value(ids.accessibleHeading);
    h2.role = "heading";
    h2.ariaLevel = "2";
    node.insertBefore(div, node.firstChild);
    div.appendChild(h2);
  }
  function nextPage() {
    const $months = get_store_value(months);
    const $numberOfMonths = get_store_value(numberOfMonths);
    if (get_store_value(pagedNavigation)) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.add({ months: 1 }),
        weekStartsOn: get_store_value(weekStartsOn),
        locale: get_store_value(locale),
        fixedWeeks: get_store_value(fixedWeeks),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function prevPage() {
    const $months = get_store_value(months);
    const $numberOfMonths = get_store_value(numberOfMonths);
    if (get_store_value(pagedNavigation)) {
      const firstMonth = $months[0].value;
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
    } else {
      const firstMonth = $months[0].value;
      const newMonths = createMonths({
        dateObj: firstMonth.subtract({ months: 1 }),
        weekStartsOn: get_store_value(weekStartsOn),
        locale: get_store_value(locale),
        fixedWeeks: get_store_value(fixedWeeks),
        numberOfMonths: $numberOfMonths
      });
      months.set(newMonths);
      placeholder.set(newMonths[0].value.set({ day: 1 }));
    }
  }
  function nextYear() {
    placeholder.add({ years: 1 });
  }
  function prevYear() {
    placeholder.subtract({ years: 1 });
  }
  const ARROW_KEYS = [kbd.ARROW_DOWN, kbd.ARROW_UP, kbd.ARROW_LEFT, kbd.ARROW_RIGHT];
  function setYear(year) {
    placeholder.setDate({ year });
  }
  function setMonth(month) {
    placeholder.setDate({ month });
  }
  function handleCellClick(date) {
    const $readonly = get_store_value(readonly);
    if ($readonly)
      return;
    const $isDateDisabled = get_store_value(isDateDisabled);
    const $isUnavailable = get_store_value(options.isDateUnavailable);
    if ($isDateDisabled?.(date) || $isUnavailable?.(date))
      return;
    value.update((prev) => {
      const $multiple = get_store_value(multiple);
      if ($multiple) {
        return handleMultipleUpdate(prev, date);
      } else {
        const next = handleSingleUpdate(prev, date);
        if (!next) {
          announcer.announce("Selected date is now empty.", "polite", 5e3);
        } else {
          announcer.announce(`Selected Date: ${formatter.selectedDate(next, false)}`, "polite");
        }
        return next;
      }
    });
  }
  function handleSingleUpdate(prev, date) {
    if (Array.isArray(prev))
      throw new Error("Invalid value for multiple prop.");
    if (!prev)
      return date;
    const $preventDeselect = get_store_value(preventDeselect);
    if (!$preventDeselect && isSameDay(prev, date)) {
      placeholder.set(date);
      return void 0;
    }
    return date;
  }
  function handleMultipleUpdate(prev, date) {
    if (!prev)
      return [date];
    if (!Array.isArray(prev))
      throw new Error("Invalid value for multiple prop.");
    const index = prev.findIndex((d) => isSameDay(d, date));
    const $preventDeselect = get_store_value(preventDeselect);
    if (index === -1) {
      return [...prev, date];
    } else if ($preventDeselect) {
      return prev;
    } else {
      const next = prev.filter((d) => !isSameDay(d, date));
      if (!next.length) {
        placeholder.set(date);
        return void 0;
      }
      return next;
    }
  }
  const SELECT_KEYS = [kbd.ENTER, kbd.SPACE];
  function handleCalendarKeydown(e) {
    const currentCell = e.target;
    if (!isCalendarCell(currentCell))
      return;
    if (!ARROW_KEYS.includes(e.key) && !SELECT_KEYS.includes(e.key))
      return;
    e.preventDefault();
    if (e.key === kbd.ARROW_DOWN) {
      shiftFocus(currentCell, 7);
    }
    if (e.key === kbd.ARROW_UP) {
      shiftFocus(currentCell, -7);
    }
    if (e.key === kbd.ARROW_LEFT) {
      shiftFocus(currentCell, -1);
    }
    if (e.key === kbd.ARROW_RIGHT) {
      shiftFocus(currentCell, 1);
    }
    if (e.key === kbd.SPACE || e.key === kbd.ENTER) {
      const cellValue = currentCell.getAttribute("data-value");
      if (!cellValue)
        return;
      handleCellClick(parseStringToDateValue(cellValue, get_store_value(placeholder)));
    }
  }
  function shiftFocus(node, add) {
    const candidateCells = getSelectableCells(get_store_value(ids.calendar));
    if (!candidateCells.length)
      return;
    const index = candidateCells.indexOf(node);
    const nextIndex = index + add;
    if (isValidIndex(nextIndex, candidateCells)) {
      const nextCell = candidateCells[nextIndex];
      setPlaceholderToNodeValue(nextCell, placeholder);
      return nextCell.focus();
    }
    if (nextIndex < 0) {
      if (get_store_value(isPrevButtonDisabled))
        return;
      const $months = get_store_value(months);
      const firstMonth = $months[0].value;
      const $numberOfMonths = get_store_value(numberOfMonths);
      placeholder.set(firstMonth.subtract({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells(get_store_value(ids.calendar));
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = newCandidateCells.length - Math.abs(nextIndex);
        if (isValidIndex(newIndex, newCandidateCells)) {
          const newCell = newCandidateCells[newIndex];
          setPlaceholderToNodeValue(newCell, placeholder);
          return newCell.focus();
        }
      });
    }
    if (nextIndex >= candidateCells.length) {
      if (get_store_value(isNextButtonDisabled))
        return;
      const $months = get_store_value(months);
      const firstMonth = $months[0].value;
      const $numberOfMonths = get_store_value(numberOfMonths);
      placeholder.set(firstMonth.add({ months: $numberOfMonths }));
      tick().then(() => {
        const newCandidateCells = getSelectableCells(get_store_value(ids.calendar));
        if (!newCandidateCells.length) {
          return;
        }
        const newIndex = nextIndex - candidateCells.length;
        if (isValidIndex(newIndex, newCandidateCells)) {
          const nextCell = newCandidateCells[newIndex];
          return nextCell.focus();
        }
      });
    }
  }
  const _isDateDisabled = derived([isDateDisabled, placeholder, minValue, maxValue, disabled], ([$isDateDisabled, $placeholder, $minValue, $maxValue, $disabled]) => {
    return (date) => {
      if ($isDateDisabled?.(date) || $disabled)
        return true;
      if ($minValue && isBefore(date, $minValue))
        return true;
      if ($maxValue && isAfter(date, $maxValue))
        return true;
      if (!isSameMonth(date, $placeholder))
        return true;
      return false;
    };
  });
  const _isDateUnavailable = derived(isDateUnavailable, ($isDateUnavailable) => {
    return (date) => $isDateUnavailable?.(date);
  });
  return {
    elements: {
      calendar,
      heading,
      grid,
      cell,
      nextButton,
      prevButton
    },
    states: {
      placeholder: placeholder.toWritable(),
      months,
      value,
      weekdays,
      headingValue
    },
    helpers: {
      nextPage,
      prevPage,
      nextYear,
      prevYear,
      setYear,
      setMonth,
      isDateDisabled: _isDateDisabled,
      isDateSelected,
      isDateUnavailable: _isDateUnavailable
    },
    options,
    ids
  };
}
const defaults = {
  positioning: {
    placement: "bottom"
  },
  arrowSize: 8,
  defaultOpen: false,
  disableFocusTrap: false,
  closeOnEscape: true,
  preventScroll: false,
  onOpenChange: void 0,
  closeOnOutsideClick: true,
  portal: void 0,
  forceVisible: false,
  openFocus: void 0,
  closeFocus: void 0,
  onOutsideClick: void 0
};
const { name } = createElHelpers("popover");
const popoverIdParts = ["trigger", "content"];
function createPopover(args) {
  const withDefaults = { ...defaults, ...args };
  const options = toWritableStores(omit(withDefaults, "open", "ids"));
  const { positioning, arrowSize, disableFocusTrap, preventScroll, closeOnEscape, closeOnOutsideClick, portal, forceVisible, openFocus, closeFocus, onOutsideClick } = options;
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const open = overridable(openWritable, withDefaults?.onOpenChange);
  const activeTrigger = writable(null);
  const ids = toWritableStores({ ...generateIds(popoverIdParts), ...withDefaults.ids });
  safeOnMount(() => {
    activeTrigger.set(document.getElementById(get_store_value(ids.trigger)));
  });
  function handleClose() {
    open.set(false);
    const triggerEl = document.getElementById(get_store_value(ids.trigger));
    handleFocus({ prop: get_store_value(closeFocus), defaultEl: triggerEl });
  }
  const isVisible = derivedVisible({ open, activeTrigger, forceVisible });
  const content = builder(name("content"), {
    stores: [isVisible, portal, ids.content],
    returned: ([$isVisible, $portal, $contentId]) => {
      return {
        hidden: $isVisible && isBrowser ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $contentId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": $portal ? "" : void 0
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([
        isVisible,
        activeTrigger,
        positioning,
        disableFocusTrap,
        closeOnEscape,
        closeOnOutsideClick,
        portal
      ], ([$isVisible, $activeTrigger, $positioning, $disableFocusTrap, $closeOnEscape, $closeOnOutsideClick, $portal]) => {
        unsubPopper();
        if (!$isVisible || !$activeTrigger)
          return;
        const popper = usePopper(node, {
          anchorElement: $activeTrigger,
          open,
          options: {
            floating: $positioning,
            focusTrap: $disableFocusTrap ? null : {
              returnFocusOnDeactivate: false,
              clickOutsideDeactivates: true,
              escapeDeactivates: true
            },
            clickOutside: $closeOnOutsideClick ? {
              handler: handleClickOutside
            } : null,
            escapeKeydown: $closeOnEscape ? {
              handler: () => {
                handleClose();
              }
            } : null,
            portal: getPortalDestination(node, $portal)
          }
        });
        if (popper && popper.destroy) {
          unsubPopper = popper.destroy;
        }
      });
      return {
        destroy() {
          unsubDerived();
          unsubPopper();
        }
      };
    }
  });
  function toggleOpen(triggerEl) {
    open.update((prev) => {
      return !prev;
    });
    if (triggerEl) {
      activeTrigger.set(triggerEl);
    }
  }
  function handleClickOutside(e) {
    get_store_value(onOutsideClick)?.(e);
    if (e.defaultPrevented)
      return;
    const target = e.target;
    const triggerEl = document.getElementById(get_store_value(ids.trigger));
    if (triggerEl && isElement(target)) {
      if (target === triggerEl || triggerEl.contains(target))
        return;
    }
    handleClose();
  }
  const trigger = builder(name("trigger"), {
    stores: [open, ids.content, ids.trigger],
    returned: ([$open, $contentId, $triggerId]) => {
      return {
        role: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": $open,
        "data-state": $open ? "open" : "closed",
        "aria-controls": $contentId,
        id: $triggerId
      };
    },
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", () => {
        toggleOpen(node);
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen(node);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const arrow = builder(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const close = builder(name("close"), {
    returned: () => ({
      type: "button"
    }),
    action: (node) => {
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        if (e.defaultPrevented)
          return;
        handleClose();
      }), addMeltEventListener(node, "keydown", (e) => {
        if (e.defaultPrevented)
          return;
        if (e.key !== kbd.ENTER && e.key !== kbd.SPACE)
          return;
        e.preventDefault();
        toggleOpen();
      }));
      return {
        destroy: unsub
      };
    }
  });
  effect([open, activeTrigger, preventScroll], ([$open, $activeTrigger, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if ($open) {
      if (!$activeTrigger) {
        tick().then(() => {
          const triggerEl2 = document.getElementById(get_store_value(ids.trigger));
          if (!isHTMLElement(triggerEl2))
            return;
          activeTrigger.set(triggerEl2);
        });
      }
      if ($preventScroll) {
        unsubs.push(removeScroll());
      }
      const triggerEl = $activeTrigger ?? document.getElementById(get_store_value(ids.trigger));
      handleFocus({ prop: get_store_value(openFocus), defaultEl: triggerEl });
    }
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  return {
    ids,
    elements: {
      trigger,
      content,
      arrow,
      close
    },
    states: {
      open
    },
    options
  };
}
function getCalendarData() {
  const NAME = "calendar";
  const PARTS = [
    "root",
    "prev-button",
    "next-button",
    "heading",
    "grid",
    "day",
    "header",
    "grid-head",
    "head-cell",
    "grid-body",
    "cell",
    "grid-row"
  ];
  return { NAME, PARTS };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getCalendarData();
  const getCalendarAttrs = createBitAttrs(NAME, PARTS);
  const calendar = { ...createCalendar(removeUndefined(props)), getCalendarAttrs };
  setContext(NAME, calendar);
  return {
    ...calendar,
    updateOption: getOptionUpdater(calendar.options)
  };
}
function getCtx$1() {
  const { NAME } = getCalendarData();
  const ctx = getContext(NAME);
  return ctx;
}
function Calendar$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "placeholder",
    "onPlaceholderChange",
    "value",
    "onValueChange",
    "preventDeselect",
    "minValue",
    "maxValue",
    "pagedNavigation",
    "weekStartsOn",
    "locale",
    "isDateUnavailable",
    "isDateDisabled",
    "disabled",
    "readonly",
    "fixedWeeks",
    "calendarLabel",
    "weekdayFormat",
    "multiple",
    "asChild",
    "id",
    "numberOfMonths",
    "initialFocus",
    "el",
    "$$props"
  ]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let placeholder = value_or_fallback($$props["placeholder"], void 0);
  let onPlaceholderChange = value_or_fallback($$props["onPlaceholderChange"], void 0);
  let value = value_or_fallback($$props["value"], void 0);
  let onValueChange = value_or_fallback($$props["onValueChange"], void 0);
  let preventDeselect = value_or_fallback($$props["preventDeselect"], void 0);
  let minValue = value_or_fallback($$props["minValue"], void 0);
  let maxValue = value_or_fallback($$props["maxValue"], void 0);
  let pagedNavigation = value_or_fallback($$props["pagedNavigation"], void 0);
  let weekStartsOn = value_or_fallback($$props["weekStartsOn"], void 0);
  let locale = value_or_fallback($$props["locale"], void 0);
  let isDateUnavailable = value_or_fallback($$props["isDateUnavailable"], void 0);
  let isDateDisabled = value_or_fallback($$props["isDateDisabled"], void 0);
  let disabled = value_or_fallback($$props["disabled"], void 0);
  let readonly = value_or_fallback($$props["readonly"], void 0);
  let fixedWeeks = value_or_fallback($$props["fixedWeeks"], void 0);
  let calendarLabel = value_or_fallback($$props["calendarLabel"], void 0);
  let weekdayFormat = value_or_fallback($$props["weekdayFormat"], void 0);
  let multiple = value_or_fallback($$props["multiple"], false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let id = value_or_fallback($$props["id"], void 0);
  let numberOfMonths = value_or_fallback($$props["numberOfMonths"], void 0);
  let initialFocus = value_or_fallback($$props["initialFocus"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    elements: { calendar },
    states: {
      value: localValue,
      placeholder: localPlaceholder,
      months: localMonths,
      weekdays
    },
    updateOption,
    ids,
    getCalendarAttrs
  } = setCtx$1({
    defaultPlaceholder: placeholder,
    defaultValue: value,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    numberOfMonths,
    onPlaceholderChange: ({ next }) => {
      if (placeholder !== next) {
        onPlaceholderChange?.(next);
        placeholder = next;
      }
      return next;
    },
    onValueChange: ({ next }) => {
      if (Array.isArray(next)) {
        if (!Array.isArray(value) || !arraysAreEqual(value, next)) {
          onValueChange?.(next);
          value = next;
          return next;
        }
        return next;
      }
      if (value !== next) {
        onValueChange?.(next);
        value = next;
      }
      return next;
    }
  });
  const attrs = getCalendarAttrs("root");
  createDispatcher();
  let months = store_get($$store_subs, "$localMonths", localMonths);
  if (id) {
    ids.calendar.set(id);
  }
  value !== void 0 && localValue.set(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Array.isArray(value) ? [...value] : value
  );
  placeholder !== void 0 && localPlaceholder.set(placeholder);
  updateOption("preventDeselect", preventDeselect);
  updateOption("minValue", minValue);
  updateOption("maxValue", maxValue);
  updateOption("pagedNavigation", pagedNavigation);
  updateOption("weekStartsOn", weekStartsOn);
  updateOption("locale", locale);
  updateOption("isDateUnavailable", isDateUnavailable);
  updateOption("isDateDisabled", isDateDisabled);
  updateOption("disabled", disabled);
  updateOption("readonly", readonly);
  updateOption("fixedWeeks", fixedWeeks);
  updateOption("calendarLabel", calendarLabel);
  updateOption("weekdayFormat", weekdayFormat);
  updateOption("numberOfMonths", numberOfMonths);
  builder2 = store_get($$store_subs, "$calendar", calendar);
  Object.assign(builder2, attrs);
  months = store_get($$store_subs, "$localMonths", localMonths);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get months() {
          return months;
        },
        get weekdays() {
          return store_get($$store_subs, "$weekdays", weekdays);
        },
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get months() {
          return months;
        },
        get weekdays() {
          return store_get($$store_subs, "$weekdays", weekdays);
        },
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</div>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, {
    placeholder,
    onPlaceholderChange,
    value,
    onValueChange,
    preventDeselect,
    minValue,
    maxValue,
    pagedNavigation,
    weekStartsOn,
    locale,
    isDateUnavailable,
    isDateDisabled,
    disabled,
    readonly,
    fixedWeeks,
    calendarLabel,
    weekdayFormat,
    multiple,
    asChild,
    id,
    numberOfMonths,
    initialFocus,
    el
  });
  pop();
}
function Calendar_day$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "date",
    "month",
    "asChild",
    "el",
    "$$props"
  ]);
  push(false);
  const $$store_subs = {};
  let builder2, disabled, unavailable, selected;
  let date = $$props["date"];
  let month = $$props["month"];
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    elements: { cell },
    helpers: {
      isDateDisabled,
      isDateUnavailable,
      isDateSelected
    },
    getCalendarAttrs
  } = getCtx$1();
  const attrs = getCalendarAttrs("day");
  createDispatcher();
  builder2 = store_get($$store_subs, "$cell", cell)(date, month);
  Object.assign(builder2, attrs);
  disabled = store_get($$store_subs, "$isDateDisabled", isDateDisabled)(date);
  unavailable = store_get($$store_subs, "$isDateUnavailable", isDateUnavailable)(date);
  selected = store_get($$store_subs, "$isDateSelected", isDateSelected)(date);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        },
        get disabled() {
          return disabled;
        },
        get unavailable() {
          return unavailable;
        },
        get selected() {
          return selected;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        },
        get disabled() {
          return disabled;
        },
        get unavailable() {
          return unavailable;
        },
        get selected() {
          return selected;
        }
      },
      () => {
        $$payload.out += `${escape_text(date.day)}`;
      }
    );
    $$payload.out += `${anchor_2}</div>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { date, month, asChild, el });
  pop();
}
function Calendar_grid$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { grid }, getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("grid");
  builder2 = store_get($$store_subs, "$grid", grid);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<table${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</table>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_grid_body$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("grid-body");
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<tbody${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_2}</tbody>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let attrs;
  let date = $$props["date"];
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    helpers: { isDateDisabled, isDateUnavailable },
    getCalendarAttrs
  } = getCtx$1();
  attrs = {
    ...getCalendarAttrs("cell"),
    "aria-disabled": store_get($$store_subs, "$isDateDisabled", isDateDisabled)(date) || store_get($$store_subs, "$isDateUnavailable", isDateUnavailable)(date),
    "data-disabled": store_get($$store_subs, "$isDateDisabled", isDateDisabled)(date) ? "" : void 0,
    role: "gridcell"
  };
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<td${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get attrs() {
          return attrs;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</td>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { date, asChild, el });
  pop();
}
function Calendar_grid_head$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { getCalendarAttrs } = getCtx$1();
  const attrs = {
    ...getCalendarAttrs("grid-head"),
    "aria-hidden": true
  };
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<thead${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_2}</thead>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_head_cell$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("head-cell");
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<th${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_2}</th>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_grid_row$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("grid-row");
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<tr${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_2}</tr>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_header$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("header");
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<header${spread_attributes([$$restProps, attrs], true, false, "")}>${anchor_2}`;
    slot($$payload, $$props.children, { attrs }, null);
    $$payload.out += `${anchor_2}</header>`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_heading$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    elements: { heading },
    states: { headingValue },
    getCalendarAttrs
  } = getCtx$1();
  const attrs = getCalendarAttrs("heading");
  builder2 = store_get($$store_subs, "$heading", heading);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        },
        get headingValue() {
          return store_get($$store_subs, "$headingValue", headingValue);
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        },
        get headingValue() {
          return store_get($$store_subs, "$headingValue", headingValue);
        }
      },
      () => {
        $$payload.out += `${escape_text(store_get($$store_subs, "$headingValue", headingValue))}`;
      }
    );
    $$payload.out += `${anchor_2}</div>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_next_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { nextButton }, getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("next-button");
  createDispatcher();
  builder2 = store_get($$store_subs, "$nextButton", nextButton);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<button${spread_attributes([builder2, { "type": "button" }, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</button>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Calendar_prev_button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { prevButton }, getCalendarAttrs } = getCtx$1();
  const attrs = getCalendarAttrs("prev-button");
  createDispatcher();
  builder2 = store_get($$store_subs, "$prevButton", prevButton);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<button${spread_attributes([builder2, { "type": "button" }, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</button>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function getPopoverData() {
  const NAME = "popover";
  const PARTS = ["arrow", "close", "content", "trigger"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getPopoverData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const popover = {
    ...createPopover({
      positioning: {
        placement: "bottom",
        gutter: 0
      },
      ...removeUndefined(props),
      forceVisible: true
    }),
    getAttrs
  };
  setContext(NAME, popover);
  return {
    ...popover,
    updateOption: getOptionUpdater(popover.options)
  };
}
function getCtx() {
  const { NAME } = getPopoverData();
  return getContext(NAME);
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function getLabelData() {
  const NAME = "label";
  const PARTS = ["root"];
  const getAttrs = createBitAttrs(NAME, PARTS);
  return {
    NAME,
    getAttrs
  };
}
function Label$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { root } } = createLabel();
  createDispatcher();
  const { getAttrs } = getLabelData();
  const attrs = getAttrs("root");
  builder2 = store_get($$store_subs, "$root", root);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<label${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</label>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Popover($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  let disableFocusTrap = value_or_fallback($$props["disableFocusTrap"], void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], void 0);
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], void 0);
  let preventScroll = value_or_fallback($$props["preventScroll"], void 0);
  let portal = value_or_fallback($$props["portal"], void 0);
  let open = value_or_fallback($$props["open"], void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], void 0);
  let openFocus = value_or_fallback($$props["openFocus"], void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], void 0);
  const {
    updateOption,
    states: { open: localOpen },
    ids
  } = setCtx({
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    },
    positioning: { gutter: 0, offset: { mainAxis: 1 } }
  });
  const idValues = derived([ids.content, ids.trigger], ([$contentId, $triggerId]) => ({ content: $contentId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("disableFocusTrap", disableFocusTrap);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("preventScroll", preventScroll);
  updateOption("portal", portal);
  updateOption("openFocus", openFocus);
  updateOption("closeFocus", closeFocus);
  updateOption("onOutsideClick", onOutsideClick);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot(
    $$payload,
    $$props.children,
    {
      get ids() {
        return store_get($$store_subs, "$idValues", idValues);
      }
    },
    null
  );
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, {
    disableFocusTrap,
    closeOnEscape,
    closeOnOutsideClick,
    preventScroll,
    portal,
    open,
    onOpenChange,
    openFocus,
    closeFocus,
    onOutsideClick
  });
  pop();
}
function Popover_content$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el",
    "$$props"
  ]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let transition = value_or_fallback($$props["transition"], void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], void 0);
  let inTransition = value_or_fallback($$props["inTransition"], void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], void 0);
  let outTransition = value_or_fallback($$props["outTransition"], void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], void 0);
  let asChild = value_or_fallback($$props["asChild"], false);
  let id = value_or_fallback($$props["id"], void 0);
  let side = value_or_fallback($$props["side"], "bottom");
  let align = value_or_fallback($$props["align"], "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], 0);
  let alignOffset = value_or_fallback($$props["alignOffset"], 0);
  let collisionPadding = value_or_fallback($$props["collisionPadding"], 8);
  let avoidCollisions = value_or_fallback($$props["avoidCollisions"], true);
  let collisionBoundary = value_or_fallback($$props["collisionBoundary"], void 0);
  let sameWidth = value_or_fallback($$props["sameWidth"], false);
  let fitViewport = value_or_fallback($$props["fitViewport"], false);
  let strategy = value_or_fallback($$props["strategy"], "absolute");
  let overlap = value_or_fallback($$props["overlap"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    elements: { content },
    states: { open },
    ids,
    getAttrs
  } = getCtx();
  const attrs = getAttrs("content");
  if (id) {
    ids.content.set(id);
  }
  builder2 = store_get($$store_subs, "$content", content);
  Object.assign(builder2, attrs);
  if (store_get($$store_subs, "$open", open)) {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild && store_get($$store_subs, "$open", open)) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    if (transition && store_get($$store_subs, "$open", open)) {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_3}`;
      slot(
        $$payload,
        $$props.children,
        {
          get builder() {
            return builder2;
          }
        },
        null
      );
      $$payload.out += `${anchor_3}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `${anchor_4}`;
      if (inTransition && outTransition && store_get($$store_subs, "$open", open)) {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_5 = create_anchor($$payload);
        $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_5}`;
        slot(
          $$payload,
          $$props.children,
          {
            get builder() {
              return builder2;
            }
          },
          null
        );
        $$payload.out += `${anchor_5}</div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
        const anchor_6 = create_anchor($$payload);
        $$payload.out += `${anchor_6}`;
        if (inTransition && store_get($$store_subs, "$open", open)) {
          $$payload.out += "<!--ssr:if:true-->";
          const anchor_7 = create_anchor($$payload);
          $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_7}`;
          slot(
            $$payload,
            $$props.children,
            {
              get builder() {
                return builder2;
              }
            },
            null
          );
          $$payload.out += `${anchor_7}</div>`;
        } else {
          $$payload.out += "<!--ssr:if:false-->";
          const anchor_8 = create_anchor($$payload);
          $$payload.out += `${anchor_8}`;
          if (outTransition && store_get($$store_subs, "$open", open)) {
            $$payload.out += "<!--ssr:if:true-->";
            const anchor_9 = create_anchor($$payload);
            $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_9}`;
            slot(
              $$payload,
              $$props.children,
              {
                get builder() {
                  return builder2;
                }
              },
              null
            );
            $$payload.out += `${anchor_9}</div>`;
          } else {
            $$payload.out += "<!--ssr:if:false-->";
            const anchor_10 = create_anchor($$payload);
            $$payload.out += `${anchor_10}`;
            if (store_get($$store_subs, "$open", open)) {
              $$payload.out += "<!--ssr:if:true-->";
              const anchor_11 = create_anchor($$payload);
              $$payload.out += `<div${spread_attributes([builder2, $$restProps], true, false, "")}>${anchor_11}`;
              slot(
                $$payload,
                $$props.children,
                {
                  get builder() {
                    return builder2;
                  }
                },
                null
              );
              $$payload.out += `${anchor_11}</div>`;
            } else {
              $$payload.out += "<!--ssr:if:false-->";
            }
            $$payload.out += `${anchor_10}`;
          }
          $$payload.out += `${anchor_8}`;
        }
        $$payload.out += `${anchor_6}`;
      }
      $$payload.out += `${anchor_4}`;
    }
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    id,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    sameWidth,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Popover_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push(false);
  const $$store_subs = {};
  let builder2;
  let asChild = value_or_fallback($$props["asChild"], false);
  let id = value_or_fallback($$props["id"], void 0);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { trigger }, ids, getAttrs } = getCtx();
  createDispatcher();
  const attrs = getAttrs("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  builder2 = store_get($$store_subs, "$trigger", trigger);
  Object.assign(builder2, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<button${spread_attributes([builder2, { "type": "button" }, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder2;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</button>`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, id, el });
  pop();
}
function Calendar($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "4",
        "rx": "2",
        "ry": "2"
      }
    ],
    [
      "line",
      {
        "x1": "16",
        "x2": "16",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      { "x1": "8", "x2": "8", "y1": "2", "y2": "6" }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "21",
        "y1": "10",
        "y2": "10"
      }
    ]
  ];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Icon($$payload, spread_props([
    { name: "calendar" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  pop();
}
function Chevron_left($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const iconNode = [["path", { "d": "m15 18-6-6 6-6" }]];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Icon($$payload, spread_props([
    { name: "chevron-left" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  pop();
}
function Chevron_right($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const iconNode = [["path", { "d": "m9 18 6-6-6-6" }]];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Icon($$payload, spread_props([
    { name: "chevron-right" },
    $$sanitized_props,
    {
      iconNode,
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  pop();
}
function Card($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes(
    [
      { "class": cn("p-6 pt-0", className) },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_footer($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("flex items-center p-6 pt-0", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { class: className });
  pop();
}
function Card_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("flex flex-col space-y-1.5 p-6", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { class: className });
  pop();
}
function Input($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "value", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let value = value_or_fallback($$props["value"], void 0);
  $$payload.out += `<input${spread_attributes(
    [
      {
        "class": cn("flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-inputBg-foreground ring-offset-background  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className)
      },
      { "value": value },
      $$restProps
    ],
    true,
    false,
    ""
  )}>`;
  bind_props($$props, { class: className, value });
  pop();
}
function Label($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Label$1($$payload, spread_props([
    {
      class: cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function InputFIeld($$payload, $$props) {
  push(true);
  let { label, name: name2, placeholder, value } = $$props;
  function checkIfValid(value2, isTouched2) {
    if (isTouched2 === false && value2 === "") {
      return null;
    }
    if (value2 === "") {
      return false;
    } else {
      return true;
    }
  }
  let isTouched = false;
  let isValid = checkIfValid(value, isTouched);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    const anchor_1 = create_anchor($$payload2);
    $$payload2.out += `<div class="grid w-full items-center gap-1.5">${anchor}`;
    Label($$payload2, {
      for: name2,
      children: ($$payload3, $$slotProps) => {
        $$payload3.out += `${escape_text(label)}`;
      }
    });
    $$payload2.out += `${anchor} ${anchor_1}`;
    Input($$payload2, {
      type: "text",
      id: name2,
      placeholder,
      class: cn(isValid === null ? "bg-validateNeutral" : isValid ? "bg-validateSuccess" : "bg-validateError"),
      required: true,
      get value() {
        return value;
      },
      set value($$value) {
        value = $$value;
        $$settled = false;
      }
    });
    $$payload2.out += `${anchor_1}</div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { label, name: name2, placeholder, value });
  pop();
}
function Calendar_1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "value",
    "placeholder",
    "weekdayFormat",
    "class",
    "$$props"
  ]);
  push(false);
  let value = value_or_fallback($$props["value"], void 0);
  let placeholder = value_or_fallback($$props["placeholder"], void 0);
  let weekdayFormat = value_or_fallback($$props["weekdayFormat"], "short");
  let className = value_or_fallback($$props["class"], void 0);
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    $$payload2.out += `${anchor}`;
    Calendar$1($$payload2, spread_props([
      {
        get value() {
          return value;
        },
        set value($$value) {
          value = $$value;
          $$settled = false;
        },
        get placeholder() {
          return placeholder;
        },
        set placeholder($$value) {
          placeholder = $$value;
          $$settled = false;
        },
        weekdayFormat,
        class: cn("p-3", className)
      },
      $$restProps,
      {
        children: ($$payload3, $$slotProps) => {
          const months = $$slotProps.months;
          const weekdays = $$slotProps.weekdays;
          const anchor_1 = create_anchor($$payload3);
          const anchor_5 = create_anchor($$payload3);
          $$payload3.out += `${anchor_1}`;
          Calendar_header($$payload3, {
            children: ($$payload4, $$slotProps2) => {
              const anchor_2 = create_anchor($$payload4);
              const anchor_3 = create_anchor($$payload4);
              const anchor_4 = create_anchor($$payload4);
              $$payload4.out += `${anchor_2}`;
              Calendar_prev_button($$payload4, {});
              $$payload4.out += `${anchor_2} ${anchor_3}`;
              Calendar_heading($$payload4, {});
              $$payload4.out += `${anchor_3} ${anchor_4}`;
              Calendar_next_button($$payload4, {});
              $$payload4.out += `${anchor_4}`;
            }
          });
          $$payload3.out += `${anchor_1} ${anchor_5}`;
          Calendar_months($$payload3, {
            children: ($$payload4, $$slotProps2) => {
              const anchor_6 = create_anchor($$payload4);
              const each_array = ensure_array_like(months);
              $$payload4.out += `${anchor_6}`;
              for (let $$index_3 = 0; $$index_3 < each_array.length; $$index_3++) {
                const month = each_array[$$index_3];
                const anchor_7 = create_anchor($$payload4);
                const anchor_8 = create_anchor($$payload4);
                $$payload4.out += `${anchor_7}${anchor_8}`;
                Calendar_grid($$payload4, {
                  children: ($$payload5, $$slotProps3) => {
                    const anchor_9 = create_anchor($$payload5);
                    const anchor_14 = create_anchor($$payload5);
                    $$payload5.out += `${anchor_9}`;
                    Calendar_grid_head($$payload5, {
                      children: ($$payload6, $$slotProps4) => {
                        const anchor_10 = create_anchor($$payload6);
                        $$payload6.out += `${anchor_10}`;
                        Calendar_grid_row($$payload6, {
                          class: "flex",
                          children: ($$payload7, $$slotProps5) => {
                            const anchor_11 = create_anchor($$payload7);
                            const each_array_1 = ensure_array_like(weekdays);
                            $$payload7.out += `${anchor_11}`;
                            for (let $$index = 0; $$index < each_array_1.length; $$index++) {
                              const weekday = each_array_1[$$index];
                              const anchor_12 = create_anchor($$payload7);
                              const anchor_13 = create_anchor($$payload7);
                              $$payload7.out += `${anchor_12}${anchor_13}`;
                              Calendar_head_cell($$payload7, {
                                children: ($$payload8, $$slotProps6) => {
                                  $$payload8.out += `${escape_text(weekday.slice(0, 2))}`;
                                }
                              });
                              $$payload7.out += `${anchor_13}${anchor_12}`;
                            }
                            $$payload7.out += `${anchor_11}`;
                          }
                        });
                        $$payload6.out += `${anchor_10}`;
                      }
                    });
                    $$payload5.out += `${anchor_9} ${anchor_14}`;
                    Calendar_grid_body($$payload5, {
                      children: ($$payload6, $$slotProps4) => {
                        const anchor_15 = create_anchor($$payload6);
                        const each_array_2 = ensure_array_like(month.weeks);
                        $$payload6.out += `${anchor_15}`;
                        for (let $$index_2 = 0; $$index_2 < each_array_2.length; $$index_2++) {
                          const weekDates = each_array_2[$$index_2];
                          const anchor_16 = create_anchor($$payload6);
                          const anchor_17 = create_anchor($$payload6);
                          $$payload6.out += `${anchor_16}${anchor_17}`;
                          Calendar_grid_row($$payload6, {
                            class: "mt-2 w-full",
                            children: ($$payload7, $$slotProps5) => {
                              const anchor_18 = create_anchor($$payload7);
                              const each_array_3 = ensure_array_like(weekDates);
                              $$payload7.out += `${anchor_18}`;
                              for (let $$index_1 = 0; $$index_1 < each_array_3.length; $$index_1++) {
                                const date = each_array_3[$$index_1];
                                const anchor_19 = create_anchor($$payload7);
                                const anchor_20 = create_anchor($$payload7);
                                $$payload7.out += `${anchor_19}${anchor_20}`;
                                Calendar_cell($$payload7, {
                                  date,
                                  children: ($$payload8, $$slotProps6) => {
                                    const anchor_21 = create_anchor($$payload8);
                                    $$payload8.out += `${anchor_21}`;
                                    Calendar_day($$payload8, { date, month: month.value });
                                    $$payload8.out += `${anchor_21}`;
                                  }
                                });
                                $$payload7.out += `${anchor_20}${anchor_19}`;
                              }
                              $$payload7.out += `${anchor_18}`;
                            }
                          });
                          $$payload6.out += `${anchor_17}${anchor_16}`;
                        }
                        $$payload6.out += `${anchor_15}`;
                      }
                    });
                    $$payload5.out += `${anchor_14}`;
                  }
                });
                $$payload4.out += `${anchor_8}${anchor_7}`;
              }
              $$payload4.out += `${anchor_6}`;
            }
          });
          $$payload3.out += `${anchor_5}`;
        }
      }
    ]));
    $$payload2.out += `${anchor}`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, {
    value,
    placeholder,
    weekdayFormat,
    class: className
  });
  pop();
}
function Calendar_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "class", "$$props"]);
  push(false);
  let date = $$props["date"];
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_cell$1($$payload, spread_props([
    {
      date,
      class: cn("relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-month])]:bg-accent/50", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { date, class: className });
  pop();
}
function Calendar_day($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["date", "month", "class", "$$props"]);
  push(false);
  let date = $$props["date"];
  let month = $$props["month"];
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_day$1($$payload, spread_props([
    {
      date,
      month,
      class: cn(
        buttonVariants({ variant: "ghost" }),
        "h-9 w-9 p-0 font-normal ",
        "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
        // Selected
        "data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground",
        // Disabled
        "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
        // Unavailable
        "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
        // Outside months
        "data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30",
        className
      )
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const selected = $$slotProps.selected;
        const disabled = $$slotProps.disabled;
        const unavailable = $$slotProps.unavailable;
        const builder2 = $$slotProps.builder;
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot(
          $$payload2,
          $$props.children,
          {
            get selected() {
              return selected;
            },
            get disabled() {
              return disabled;
            },
            get unavailable() {
              return unavailable;
            },
            get builder() {
              return builder2;
            }
          },
          () => {
            $$payload2.out += `${escape_text(date.day)}`;
          }
        );
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { date, month, class: className });
  pop();
}
function Calendar_grid($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_grid$1($$payload, spread_props([
    {
      class: cn("w-full border-collapse space-y-1", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_header($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_header$1($$payload, spread_props([
    {
      class: cn("relative flex w-full items-center justify-between pt-1", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_months($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes(
    [
      {
        "class": cn("mt-4 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_grid_row($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_grid_row$1($$payload, spread_props([
    { class: cn("flex", className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_heading($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_heading$1($$payload, spread_props([
    {
      class: cn("text-sm font-medium", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const headingValue = $$slotProps.headingValue;
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot(
          $$payload2,
          $$props.children,
          {
            get headingValue() {
              return headingValue;
            }
          },
          () => {
            $$payload2.out += `${escape_text(headingValue)}`;
          }
        );
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_grid_body($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_grid_body$1($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_grid_head($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_grid_head$1($$payload, spread_props([
    { class: cn(className) },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_head_cell($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_head_cell$1($$payload, spread_props([
    {
      class: cn("w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_next_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_next_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const builder2 = $$slotProps.builder;
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot(
          $$payload2,
          $$props.children,
          {
            get builder() {
              return builder2;
            }
          },
          () => {
            const anchor_2 = create_anchor($$payload2);
            $$payload2.out += `${anchor_2}`;
            Chevron_right($$payload2, { class: "h-4 w-4" });
            $$payload2.out += `${anchor_2}`;
          }
        );
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Calendar_prev_button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Calendar_prev_button$1($$payload, spread_props([
    {
      class: cn(buttonVariants({ variant: "outline" }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const builder2 = $$slotProps.builder;
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot(
          $$payload2,
          $$props.children,
          {
            get builder() {
              return builder2;
            }
          },
          () => {
            const anchor_2 = create_anchor($$payload2);
            $$payload2.out += `${anchor_2}`;
            Chevron_left($$payload2, { class: "h-4 w-4" });
            $$payload2.out += `${anchor_2}`;
          }
        );
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function Popover_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let transition = value_or_fallback($$props["transition"], flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Popover_content$1($$payload, spread_props([
    {
      transition,
      transitionConfig,
      class: cn("z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, {
    class: className,
    transition,
    transitionConfig
  });
  pop();
}
const Root = Popover;
const Trigger = Popover_trigger;
function DatePicker($$payload, $$props) {
  push(true);
  const df = new DateFormatter("en-US", { dateStyle: "long" });
  let { date } = $$props;
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    const anchor_1 = create_anchor($$payload2);
    $$payload2.out += `<div class="grid w-full items-center gap-1.5">${anchor}`;
    Label($$payload2, {
      for: "datePicker",
      children: ($$payload3, $$slotProps) => {
        $$payload3.out += `${escape_text("Date")}`;
      }
    });
    $$payload2.out += `${anchor} ${anchor_1}`;
    Root($$payload2, {
      children: ($$payload3, $$slotProps) => {
        const anchor_2 = create_anchor($$payload3);
        const anchor_5 = create_anchor($$payload3);
        $$payload3.out += `${anchor_2}`;
        Trigger($$payload3, {
          asChild: true,
          children: ($$payload4, $$slotProps2) => {
            const builder2 = $$slotProps2.builder;
            const anchor_3 = create_anchor($$payload4);
            $$payload4.out += `${anchor_3}`;
            Button($$payload4, {
              variant: "outline",
              class: `${cn("justify-start text-left font-normal", !date && "text-muted-foreground")} bg-validateSuccess`,
              builders: [builder2],
              children: ($$payload5, $$slotProps3) => {
                const anchor_4 = create_anchor($$payload5);
                $$payload5.out += `${anchor_4}`;
                Calendar($$payload5, { class: "mr-2 h-4 w-4" });
                $$payload5.out += `${anchor_4} ${escape(date ? df.format(date.toDate(getLocalTimeZone())) : "Pick a date")}`;
              }
            });
            $$payload4.out += `${anchor_3}`;
          }
        });
        $$payload3.out += `${anchor_2} ${anchor_5}`;
        Popover_content($$payload3, {
          class: "w-auto p-0",
          children: ($$payload4, $$slotProps2) => {
            const anchor_6 = create_anchor($$payload4);
            $$payload4.out += `${anchor_6}`;
            Calendar_1($$payload4, {
              get value() {
                return date;
              },
              set value($$value) {
                date = $$value;
                $$settled = false;
              },
              initialFocus: true
            });
            $$payload4.out += `${anchor_6}`;
          }
        });
        $$payload3.out += `${anchor_5}`;
      }
    });
    $$payload2.out += `${anchor_1}</div>`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  bind_props($$props, { date });
  pop();
}
function formatAssignmentFilename(values) {
  const { firstName, lastName, course, assignmentShortcode, date, fileType } = values;
  const dateOutput = date.toString();
  const courseOutput = course.toLowerCase().replace(/\s+/g, "-");
  const assignmentShortcodeOutput = assignmentShortcode.toLowerCase().replace(/\s+/g, "-");
  const firstNameOutput = firstName.toLowerCase().replace(/\s+/g, "-");
  const lastNameOutput = lastName.toLowerCase().replace(/\s+/g, "-");
  const fileTypeOutput = fileType.toLowerCase().replace(/\s+/g, "-");
  const output = `${dateOutput}_${courseOutput}_${assignmentShortcodeOutput}_${firstNameOutput}-${lastNameOutput}_${fileTypeOutput}`;
  return output;
}
function CopyIcon($$payload, $$props) {
  push(false);
  let style = value_or_fallback($$props["style"], "");
  $$payload.out += `<svg width="29" height="34" viewBox="0 0 29 34"${attr("class", style, false)}><path d="M3.33333 33.6667C2.41667 33.6667 1.63167 33.3406 0.978333 32.6884C0.326111 32.035 0 31.25 0 30.3334V7.00004H3.33333V30.3334H21.6667V33.6667H3.33333ZM10 27C9.08333 27 8.29889 26.6739 7.64667 26.0217C6.99333 25.3684 6.66667 24.5834 6.66667 23.6667V3.66671C6.66667 2.75004 6.99333 1.96504 7.64667 1.31171C8.29889 0.659485 9.08333 0.333374 10 0.333374H25C25.9167 0.333374 26.7017 0.659485 27.355 1.31171C28.0072 1.96504 28.3333 2.75004 28.3333 3.66671V23.6667C28.3333 24.5834 28.0072 25.3684 27.355 26.0217C26.7017 26.6739 25.9167 27 25 27H10ZM10 23.6667H25V3.66671H10V23.6667Z"></path></svg>`;
  bind_props($$props, { style });
  pop();
}
const affirmations = [
  "Keep up the great work! 🌟",
  "You're doing amazing! 🚀",
  "Keep on rocking! 🎸",
  "Stay awesome! 😎",
  "Keep shining bright! 💡",
  "You've got this! 💪",
  "Onwards and upwards! 🌈",
  "You are a star! 🌟",
  "Fantastic job! 👍",
  "Brilliant work! 🔥",
  "You're a wizard, Harry! 🧙‍♂️",
  "Keep making magic! 🧙‍♂️",
  "You're a champ! 🏆",
  "Stay brilliant! 💎",
  "Top-notch work! 🥇",
  "Absolutely fabulous! 💃",
  "I'd give you an A+! 🥇",
  "Slay Queen! 👑",
  "Stay fabulous! 💅",
  "You're unstoppable! 🌪️",
  "Keep conquering! 🏰",
  "Keep on shining! ✨",
  "Go for gold! 🥇"
];
function OutputField($$payload, $$props) {
  push(true);
  let { values } = $$props;
  let formattedFileName = formatAssignmentFilename(values);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  shuffleArray(affirmations);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<button class="group relative flex w-full items-center justify-center gap-2 rounded-md border border-opacity-0 bg-inputBg p-2 px-8 text-inputBg-foreground shadow-inner hover:border-opacity-100 hover:brightness-110"><div class="relative">${escape(formattedFileName)} <div class="absolute right-1/2">${anchor}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor}</div></div> <div class="absolute right-4 w-4 fill-foreground opacity-40 transition-opacity duration-300 group-hover:opacity-100">${anchor_1}`;
  CopyIcon($$payload, { style: "w-4" });
  $$payload.out += `${anchor_1}</div></button>`;
  bind_props($$props, { values });
  pop();
}
function AssignmentInputCard($$payload, $$props) {
  push(true);
  let values = {
    firstName: "",
    lastName: "Doe",
    course: "Design1",
    assignmentShortcode: "CA",
    date: today(getLocalTimeZone()),
    fileType: "Report"
  };
  let $$settled = true;
  let $$inner_payload;
  function $$render_inner($$payload2) {
    const anchor = create_anchor($$payload2);
    $$payload2.out += `${anchor}`;
    Card($$payload2, {
      class: "w-full max-w-[800px] border-opacity-50 shadow-md dark:border-noroff dark:border-opacity-35 sm:w-fit sm:min-w-[600px]",
      children: ($$payload3, $$slotProps) => {
        const anchor_1 = create_anchor($$payload3);
        const anchor_2 = create_anchor($$payload3);
        const anchor_9 = create_anchor($$payload3);
        $$payload3.out += `${anchor_1}`;
        Card_header($$payload3, {});
        $$payload3.out += `${anchor_1} ${anchor_2}`;
        Card_content($$payload3, {
          children: ($$payload4, $$slotProps2) => {
            const anchor_3 = create_anchor($$payload4);
            const anchor_4 = create_anchor($$payload4);
            const anchor_5 = create_anchor($$payload4);
            const anchor_6 = create_anchor($$payload4);
            const anchor_7 = create_anchor($$payload4);
            const anchor_8 = create_anchor($$payload4);
            $$payload4.out += `<form class="flex flex-col gap-2 sm:gap-4"><div class="flex flex-col gap-4 sm:flex-row">${anchor_3}`;
            InputFIeld($$payload4, {
              label: "First Name",
              name: "firstName",
              placeholder: "John",
              get value() {
                return values.firstName;
              },
              set value($$value) {
                values.firstName = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_3} ${anchor_4}`;
            InputFIeld($$payload4, {
              label: "Last Name",
              name: "lastName",
              placeholder: "Doe",
              get value() {
                return values.lastName;
              },
              set value($$value) {
                values.lastName = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_4}</div> <div class="flex flex-col gap-4 sm:flex-row">${anchor_5}`;
            InputFIeld($$payload4, {
              label: "Course",
              name: "course",
              placeholder: "Design1",
              get value() {
                return values.course;
              },
              set value($$value) {
                values.course = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_5} ${anchor_6}`;
            InputFIeld($$payload4, {
              label: "Assignment Shortcode",
              name: "assignmentShortcode",
              placeholder: "CA",
              get value() {
                return values.assignmentShortcode;
              },
              set value($$value) {
                values.assignmentShortcode = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_6}</div> <div class="flex flex-col gap-4 sm:flex-row">${anchor_7}`;
            DatePicker($$payload4, {
              get date() {
                return values.date;
              },
              set date($$value) {
                values.date = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_7} ${anchor_8}`;
            InputFIeld($$payload4, {
              label: "File Type",
              name: "fileType",
              placeholder: "Report",
              get value() {
                return values.fileType;
              },
              set value($$value) {
                values.fileType = $$value;
                $$settled = false;
              }
            });
            $$payload4.out += `${anchor_8}</div></form>`;
          }
        });
        $$payload3.out += `${anchor_2} ${anchor_9}`;
        Card_footer($$payload3, {
          children: ($$payload4, $$slotProps2) => {
            const anchor_10 = create_anchor($$payload4);
            $$payload4.out += `${anchor_10}`;
            OutputField($$payload4, { values });
            $$payload4.out += `${anchor_10}`;
          }
        });
        $$payload3.out += `${anchor_9}`;
      }
    });
    $$payload2.out += `${anchor}`;
  }
  do {
    $$settled = true;
    $$inner_payload = copy_payload($$payload);
    $$render_inner($$inner_payload);
  } while (!$$settled);
  assign_payload($$payload, $$inner_payload);
  pop();
}
function Logo($$payload, $$props) {
  push(false);
  $$payload.out += `<div class="flex w-full max-w-full items-center justify-center px-8"><svg width="565" height="117" viewBox="0 0 565 117" class="w-full fill-foreground dark:fill-stone-300"><path d="M9.40003 76.8C9.33336 77.9333 8.86669 78.9 8.00003 79.7C7.13336 80.5 6.16669 80.9 5.10003 80.9C3.96669 80.9 2.96669 80.5 2.10002 79.7C1.30002 78.8333 0.900024 77.8333 0.900024 76.7V6.7C0.900024 5.56666 1.30002 4.6 2.10002 3.8C2.96669 2.93333 3.96669 2.5 5.10003 2.5H34C37.4 2.5 40.5 3.13333 43.3 4.4C46.1667 5.66666 48.7 7.36666 50.9 9.5C52.9667 11.6333 54.6334 14.1333 55.9 17C57.1667 19.8 57.8 22.8667 57.8 26.2C57.8 29.6 57.1667 32.7333 55.9 35.6C54.6334 38.4667 52.9667 40.9333 50.9 43C48.9667 44.9333 46.7334 46.5 44.2 47.7C41.6667 48.9 39 49.6 36.2 49.8C36.0667 49.9333 35.8667 50 35.6 50C35.4 50 35.2334 50 35.1 50H28.1C32.9 53.9333 37.5667 57.8333 42.1 61.7C46.7 65.5667 51.4 69.4333 56.2 73.3C57.0667 74.0333 57.5667 75 57.7 76.2C57.9 77.4 57.6334 78.4667 56.9 79.4V79.3C56.1 80.3667 55.1334 80.9667 54 81.1C52.9334 81.2333 51.8667 80.9 50.8 80.1L13.3 49.3H13.4C12.2667 48.5 11.7 47.3333 11.7 45.8C11.7 44.5333 12.0667 43.5333 12.8 42.8C13.6 42 14.6334 41.6 15.9 41.6H34C36.1334 41.6 38.1334 41.2333 40 40.5C41.8667 39.7 43.4667 38.6 44.8 37.2C46.2 35.8 47.3 34.1667 48.1 32.3C48.9 30.4333 49.3 28.4333 49.3 26.3C49.3 24.1667 48.9 22.2 48.1 20.4C47.3 18.6 46.2 17 44.8 15.6C41.9334 12.6 38.3334 11.1 34 11.1H9.40003V76.8Z"></path><path d="M76.4742 72.8C76.4742 71.6667 76.8742 70.7 77.6742 69.9C78.4742 69.0333 79.5076 68.6 80.7742 68.6C81.9076 68.6 82.8742 69.0333 83.6742 69.9C84.5409 70.7 84.9742 71.6667 84.9742 72.8V76.8C84.9742 78.0667 84.5409 79.1 83.6742 79.9C82.8742 80.6333 81.9076 81 80.7742 81C79.5076 81 78.4742 80.6333 77.6742 79.9C76.8742 79.1 76.4742 78.0667 76.4742 76.8V72.8Z"></path><path d="M106.955 81C105.822 81 104.822 80.6 103.955 79.8C103.155 78.9333 102.755 77.9333 102.755 76.8V6.8C102.755 5.66666 103.155 4.69999 103.955 3.9C104.822 3.03333 105.822 2.6 106.955 2.6H152.255C153.389 2.6 154.322 3.03333 155.055 3.9C155.855 4.69999 156.255 5.66666 156.255 6.8C156.255 7.93333 155.855 8.93333 155.055 9.8C154.322 10.6667 153.389 11.1 152.255 11.1H111.155V72.5H151.955C153.222 72.5 154.222 72.9 154.955 73.7C155.755 74.5 156.156 75.5333 156.156 76.8C156.156 77.9333 155.755 78.9333 154.955 79.8C154.222 80.6 153.222 81 151.955 81H106.955ZM117.455 46C116.322 46 115.322 45.6 114.455 44.8C113.655 43.9333 113.255 42.9333 113.255 41.8C113.255 40.6667 113.655 39.7 114.455 38.9C115.322 38.0333 116.322 37.6 117.455 37.6H135.955C137.089 37.6 138.055 38.0333 138.855 38.9C139.722 39.7 140.156 40.6667 140.156 41.8C140.156 42.9333 139.722 43.9333 138.855 44.8C138.055 45.6 137.089 46 135.955 46H117.455Z"></path><path d="M174.814 72.8C174.814 71.6667 175.214 70.7 176.014 69.9C176.814 69.0333 177.847 68.6 179.114 68.6C180.247 68.6 181.214 69.0333 182.014 69.9C182.881 70.7 183.314 71.6667 183.314 72.8V76.8C183.314 78.0667 182.881 79.1 182.014 79.9C181.214 80.6333 180.247 81 179.114 81C177.847 81 176.814 80.6333 176.014 79.9C175.214 79.1 174.814 78.0667 174.814 76.8V72.8Z"></path><path d="M267.392 72.8C267.392 71.6667 267.792 70.7 268.592 69.9C269.392 69.0333 270.426 68.6 271.692 68.6C272.826 68.6 273.792 69.0333 274.592 69.9C275.459 70.7 275.892 71.6667 275.892 72.8V76.8C275.892 78.0667 275.459 79.1 274.592 79.9C273.792 80.6333 272.826 81 271.692 81C270.426 81 269.392 80.6333 268.592 79.9C267.792 79.1 267.392 78.0667 267.392 76.8V72.8Z"></path><path d="M314.873 5.3C315.273 4.36666 315.84 3.63333 316.573 3.1C317.373 2.56666 318.14 2.29999 318.873 2.29999C319.607 2.29999 320.307 2.56666 320.973 3.1C321.707 3.63333 322.273 4.36666 322.673 5.3L350.873 75C351.273 76.0667 351.207 77.1667 350.673 78.3C350.207 79.3667 349.473 80.1 348.473 80.5H348.573C347.44 81.0333 346.34 81.0667 345.273 80.6C344.207 80.1333 343.473 79.3333 343.073 78.2V78.3L318.873 18.2L294.473 78.3V78.2C294.073 79.3333 293.34 80.1333 292.273 80.6C291.207 81.0667 290.107 81.0333 288.973 80.5H289.073C288.007 80.1 287.24 79.4 286.773 78.4C286.307 77.3333 286.273 76.2333 286.673 75.1L314.873 5.3Z"></path><path d="M362.607 72.8C362.607 71.6667 363.007 70.7 363.807 69.9C364.607 69.0333 365.64 68.6 366.907 68.6C368.04 68.6 369.007 69.0333 369.807 69.9C370.674 70.7 371.107 71.6667 371.107 72.8V76.8C371.107 78.0667 370.674 79.1 369.807 79.9C369.007 80.6333 368.04 81 366.907 81C365.64 81 364.607 80.6333 363.807 79.9C363.007 79.1 362.607 78.0667 362.607 76.8V72.8Z"></path><path d="M430.888 49.8C431.622 50.8 431.922 51.8667 431.788 53C431.655 54.0667 431.155 54.9667 430.288 55.7C429.222 56.4333 428.088 56.7333 426.888 56.6C425.755 56.4667 424.822 55.9667 424.088 55.1L397.588 19.4V76.8C397.588 77.9333 397.155 78.9333 396.288 79.8C395.422 80.6 394.422 81 393.288 81C392.155 81 391.155 80.6 390.288 79.8C389.488 78.9333 389.088 77.9333 389.088 76.8V6.8C389.088 5.66666 389.488 4.69999 390.288 3.9C391.155 3.03333 392.155 2.6 393.288 2.6C394.022 2.6 394.688 2.8 395.288 3.19999C395.888 3.53333 396.388 3.96666 396.788 4.5L430.888 49.8ZM465.888 76.8C465.888 77.9333 465.488 78.9333 464.688 79.8C463.955 80.6 463.022 81 461.888 81C460.622 81 459.588 80.6 458.788 79.8C458.055 78.9333 457.688 77.9333 457.688 76.8V19.6L438.688 44.9C437.955 45.8333 437.022 46.3667 435.888 46.5C434.755 46.6333 433.655 46.3333 432.588 45.6C431.722 44.8667 431.188 43.9333 430.988 42.8C430.855 41.6667 431.155 40.6 431.888 39.6L458.188 4.5C459.055 3.23333 460.288 2.6 461.888 2.6C463.022 2.6 463.955 3.03333 464.688 3.9C465.488 4.69999 465.888 5.66666 465.888 6.8V76.8Z"></path><path d="M485.166 72.8C485.166 71.6667 485.566 70.7 486.366 69.9C487.166 69.0333 488.199 68.6 489.466 68.6C490.599 68.6 491.566 69.0333 492.366 69.9C493.232 70.7 493.666 71.6667 493.666 72.8V76.8C493.666 78.0667 493.232 79.1 492.366 79.9C491.566 80.6333 490.599 81 489.466 81C488.199 81 487.166 80.6333 486.366 79.9C485.566 79.1 485.166 78.0667 485.166 76.8V72.8Z"></path><path d="M515.647 81C514.514 81 513.514 80.6 512.647 79.8C511.847 78.9333 511.447 77.9333 511.447 76.8V6.8C511.447 5.66666 511.847 4.69999 512.647 3.9C513.514 3.03333 514.514 2.6 515.647 2.6H560.947C562.08 2.6 563.014 3.03333 563.747 3.9C564.547 4.69999 564.947 5.66666 564.947 6.8C564.947 7.93333 564.547 8.93333 563.747 9.8C563.014 10.6667 562.08 11.1 560.947 11.1H519.847V72.5H560.647C561.914 72.5 562.914 72.9 563.647 73.7C564.447 74.5 564.847 75.5333 564.847 76.8C564.847 77.9333 564.447 78.9333 563.647 79.8C562.914 80.6 561.914 81 560.647 81H515.647ZM526.147 46C525.014 46 524.014 45.6 523.147 44.8C522.347 43.9333 521.947 42.9333 521.947 41.8C521.947 40.6667 522.347 39.7 523.147 38.9C524.014 38.0333 525.014 37.6 526.147 37.6H544.647C545.78 37.6 546.747 38.0333 547.547 38.9C548.414 39.7 548.847 40.6667 548.847 41.8C548.847 42.9333 548.414 43.9333 547.547 44.8C546.747 45.6 545.78 46 544.647 46H526.147Z"></path><path d="M252.452 83.4147H256.569C257.211 83.4147 257.827 83.1608 258.282 82.7085C258.742 82.2521 259 81.6311 259 80.9834V3.09037C259 2.45598 258.769 1.84336 258.349 1.36734C257.854 0.805674 257.142 0.483856 256.394 0.483856H225.614C224.881 0.483856 224.177 0.774006 223.656 1.291C223.131 1.81263 222.836 2.52225 222.836 3.26248V5.96791C222.836 6.70813 223.131 7.41776 223.656 7.93938C224.177 8.45638 224.881 8.74653 225.614 8.74653H249.784V66.9401L198.742 2.55867C197.94 1.54657 196.61 1.11202 195.365 1.45489C193.968 1.83949 193 3.10981 193 4.55863V81.3722C193 82.6871 193.487 83.9555 194.366 84.9329L221.337 114.899C222.263 115.928 223.583 116.516 224.967 116.516C226.194 116.516 227.376 116.055 228.278 115.223L243.61 101.091C244.441 100.325 244.913 99.2465 244.913 98.1165C244.913 97.0445 244.488 96.0163 243.73 95.2579L243.561 95.0878C242.709 94.235 241.553 93.7557 240.348 93.7557C239.196 93.7557 238.088 94.1933 237.246 94.9797L226.27 105.242C225.84 105.645 225.164 105.621 224.763 105.189L203.068 81.7989C202.52 81.2083 202.216 80.4326 202.216 79.6271V20.7604L250.778 82.6006C251.181 83.1146 251.799 83.4147 252.452 83.4147Z"></path></svg></div>`;
  pop();
}
function _page($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<div class="flex w-full flex-col items-center justify-center gap-4 px-4 pb-12 pt-2 sm:gap-12 sm:pt-12"><div class="flex flex-col items-center justify-center sm:gap-4">${anchor}`;
  Logo($$payload);
  $$payload.out += `${anchor} <h2 class="text-md text-center dark:text-stone-200 sm:text-2xl svelte-uhhjzp">Rapidly Enhance and Name Assignments for Maximum Efficiency</h2></div> ${anchor_1}`;
  AssignmentInputCard($$payload);
  $$payload.out += `${anchor_1}</div>`;
  pop();
}
export {
  _page as default
};
