import { G as onDestroy, H as value_or_fallback, I as add_styles, D as bind_props, E as pop, z as push, F as create_anchor, J as escape_text, K as spread_props, L as spread_attributes, M as merge_styles, N as stringify, O as attr, Q as slot, R as store_get, S as ensure_array_like, T as unsubscribe_stores, V as tick, W as getContext, A as setContext, X as rest_props, Y as VoidElements, Z as sanitize_props } from "../../chunks/main-client.js";
import { u as useToasterStore, t as toast, s as startPause, e as endPause, a as update, p as prefersReducedMotion, i as isBrowser, b as sleep, c as isHTMLElement, w as wrapArray, d as createElHelpers, f as derivedWithUnsubscribe, g as toWritableStores, h as generateIds, j as derivedVisible, k as builder, l as styleToString, m as effect, n as executeCallbacks, o as addMeltEventListener, q as safeOnMount, r as isElementDisabled, v as usePopper, x as getPortalDestination, F as FIRST_LAST_KEYS, y as kbd, S as SELECTION_KEYS, z as overridable, A as disabledAttr, B as omit, C as addEventListener, D as handleFocus, E as removeScroll, G as noop, H as createBitAttrs, I as removeUndefined, J as getOptionUpdater, K as getPositioningUpdater, L as createDispatcher, M as disabledAttrs, N as cn, O as flyAndScale, P as Icon, Q as Button } from "../../chunks/Icon.js";
import "../../chunks/client.js";
import "dequal";
import { w as writable, g as get_store_value, d as derived } from "../../chunks/index.js";
import "clsx";
function calculateOffset(toast2, $toasts, opts) {
  const { reverseOrder, gutter = 8, defaultPosition } = opts || {};
  const relevantToasts = $toasts.filter((t) => (t.position || defaultPosition) === (toast2.position || defaultPosition) && t.height);
  const toastIndex = relevantToasts.findIndex((t) => t.id === toast2.id);
  const toastsBefore = relevantToasts.filter((toast3, i) => i < toastIndex && toast3.visible).length;
  const offset = relevantToasts.filter((t) => t.visible).slice(...reverseOrder ? [toastsBefore + 1] : [0, toastsBefore]).reduce((acc, t) => acc + (t.height || 0) + gutter, 0);
  return offset;
}
const handlers = {
  startPause() {
    startPause(Date.now());
  },
  endPause() {
    endPause(Date.now());
  },
  updateHeight: (toastId, height) => {
    update({ id: toastId, height });
  },
  calculateOffset
};
function useToaster(toastOptions) {
  const { toasts, pausedAt } = useToasterStore(toastOptions);
  const timeouts = /* @__PURE__ */ new Map();
  let _pausedAt;
  const unsubscribes = [
    pausedAt.subscribe(($pausedAt) => {
      if ($pausedAt) {
        for (const [, timeoutId] of timeouts) {
          clearTimeout(timeoutId);
        }
        timeouts.clear();
      }
      _pausedAt = $pausedAt;
    }),
    toasts.subscribe(($toasts) => {
      if (_pausedAt) {
        return;
      }
      const now = Date.now();
      for (const t of $toasts) {
        if (timeouts.has(t.id)) {
          continue;
        }
        if (t.duration === Infinity) {
          continue;
        }
        const durationLeft = (t.duration || 0) + t.pauseDuration - (now - t.createdAt);
        if (durationLeft < 0) {
          if (t.visible) {
            toast.dismiss(t.id);
          }
          return null;
        }
        timeouts.set(t.id, setTimeout(() => toast.dismiss(t.id), durationLeft));
      }
    })
  ];
  onDestroy(() => {
    for (const unsubscribe of unsubscribes) {
      unsubscribe();
    }
  });
  return { toasts, handlers };
}
function CheckmarkIcon($$payload, $$props) {
  push(false);
  let primary = value_or_fallback($$props["primary"], "#61d345");
  let secondary = value_or_fallback($$props["secondary"], "#fff");
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-11kvm4p"></div>`;
  bind_props($$props, { primary, secondary });
  pop();
}
function ErrorIcon($$payload, $$props) {
  push(false);
  let primary = value_or_fallback($$props["primary"], "#ff4b4b");
  let secondary = value_or_fallback($$props["secondary"], "#fff");
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-1ee93ns"></div>`;
  bind_props($$props, { primary, secondary });
  pop();
}
function LoaderIcon($$payload, $$props) {
  push(false);
  let primary = value_or_fallback($$props["primary"], "#616161");
  let secondary = value_or_fallback($$props["secondary"], "#e0e0e0");
  $$payload.out += `<div${add_styles({
    "--primary": primary,
    "--secondary": secondary
  })} class="svelte-1j7dflg"></div>`;
  bind_props($$props, { primary, secondary });
  pop();
}
function ToastIcon($$payload, $$props) {
  push(false);
  let type, icon, iconTheme;
  let toast2 = $$props["toast"];
  ({ type, icon, iconTheme } = toast2);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (typeof icon === "string") {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<div class="animated svelte-1kgeier">${escape_text(icon)}</div>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    if (typeof icon !== "undefined") {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_2 = create_anchor($$payload);
      $$payload.out += `${anchor_2}`;
      icon?.($$payload, {});
      $$payload.out += `${anchor_2}`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `${anchor_3}`;
      if (type !== "blank") {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_4 = create_anchor($$payload);
        const anchor_5 = create_anchor($$payload);
        $$payload.out += `<div class="indicator svelte-1kgeier">${anchor_4}`;
        LoaderIcon($$payload, spread_props([iconTheme]));
        $$payload.out += `${anchor_4} ${anchor_5}`;
        if (type !== "loading") {
          $$payload.out += "<!--ssr:if:true-->";
          const anchor_6 = create_anchor($$payload);
          $$payload.out += `<div class="status svelte-1kgeier">${anchor_6}`;
          if (type === "error") {
            $$payload.out += "<!--ssr:if:true-->";
            const anchor_7 = create_anchor($$payload);
            $$payload.out += `${anchor_7}`;
            ErrorIcon($$payload, spread_props([iconTheme]));
            $$payload.out += `${anchor_7}`;
          } else {
            $$payload.out += "<!--ssr:if:false-->";
            const anchor_8 = create_anchor($$payload);
            $$payload.out += `${anchor_8}`;
            CheckmarkIcon($$payload, spread_props([iconTheme]));
            $$payload.out += `${anchor_8}`;
          }
          $$payload.out += `${anchor_6}</div>`;
        } else {
          $$payload.out += "<!--ssr:if:false-->";
        }
        $$payload.out += `${anchor_5}</div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
      }
      $$payload.out += `${anchor_3}`;
    }
    $$payload.out += `${anchor_1}`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { toast: toast2 });
  pop();
}
function ToastMessage($$payload, $$props) {
  push(false);
  let toast2 = $$props["toast"];
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${spread_attributes([{ "class": "message" }, toast2.ariaProps], true, false, "svelte-1nauejd")}>${anchor}`;
  if (typeof toast2.message === "string") {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `${escape_text(toast2.message)}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    toast2.message?.($$payload, { toast: toast2 });
    $$payload.out += `${anchor_1}`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { toast: toast2 });
  pop();
}
function ToastBar($$payload, $$props) {
  push(false);
  let toast2 = $$props["toast"];
  let position = value_or_fallback($$props["position"], void 0);
  let style = value_or_fallback($$props["style"], "");
  let Component = value_or_fallback($$props["Component"], void 0);
  let factor;
  let animation;
  {
    const top = (toast2.position || position || "top-center").includes("top");
    factor = top ? 1 : -1;
    const [enter, exit] = prefersReducedMotion() ? ["fadeIn", "fadeOut"] : ["enter", "exit"];
    animation = toast2.visible ? enter : exit;
  }
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${add_styles(merge_styles(`${stringify(style)}; ${stringify(toast2.style)}`, { "--factor": factor }))}${attr("class", `base ${stringify(toast2.height ? animation : "transparent")} ${stringify(toast2.className || "")} svelte-ug60r4`, false)}>${anchor}`;
  if (Component) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    Component?.($$payload, {
      $$slots: {
        "icon": ($$payload2, $$slotProps) => {
          const anchor_2 = create_anchor($$payload2);
          $$payload2.out += `${anchor_2}`;
          ToastIcon($$payload2, { toast: toast2, slot: "icon" });
          $$payload2.out += `${anchor_2}`;
        },
        "message": ($$payload2, $$slotProps) => {
          const anchor_3 = create_anchor($$payload2);
          $$payload2.out += `${anchor_3}`;
          ToastMessage($$payload2, { toast: toast2, slot: "message" });
          $$payload2.out += `${anchor_3}`;
        }
      }
    });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_4 = create_anchor($$payload);
    $$payload.out += `${anchor_4}`;
    slot(
      $$payload,
      $$props.children,
      {
        ToastIcon,
        ToastMessage,
        get toast() {
          return toast2;
        }
      },
      () => {
        const anchor_5 = create_anchor($$payload);
        const anchor_6 = create_anchor($$payload);
        $$payload.out += `${anchor_5}`;
        ToastIcon($$payload, { toast: toast2 });
        $$payload.out += `${anchor_5} ${anchor_6}`;
        ToastMessage($$payload, { toast: toast2 });
        $$payload.out += `${anchor_6}`;
      }
    );
    $$payload.out += `${anchor_4}`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { toast: toast2, position, style, Component });
  pop();
}
function ToastWrapper($$payload, $$props) {
  push(false);
  let top, bottom, factor, justifyContent;
  let toast2 = $$props["toast"];
  let setHeight = $$props["setHeight"];
  top = toast2.position?.includes("top") ? 0 : null;
  bottom = toast2.position?.includes("bottom") ? 0 : null;
  factor = toast2.position?.includes("top") ? 1 : -1;
  justifyContent = toast2.position?.includes("center") && "center" || (toast2.position?.includes("right") || toast2.position?.includes("end")) && "flex-end" || null;
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${add_styles({
    "--factor": factor,
    "--offset": toast2.offset,
    top,
    bottom,
    "justify-content": justifyContent
  })}${attr(
    "class",
    `wrapper svelte-v01oml ${stringify([
      toast2.visible ? "active" : "",
      !prefersReducedMotion() ? "transition" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )}>${anchor}`;
  if (toast2.type === "custom") {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    ToastMessage($$payload, { toast: toast2 });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get toast() {
          return toast2;
        }
      },
      () => {
        const anchor_3 = create_anchor($$payload);
        $$payload.out += `${anchor_3}`;
        ToastBar($$payload, { toast: toast2, position: toast2.position });
        $$payload.out += `${anchor_3}`;
      }
    );
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor}</div>`;
  bind_props($$props, { toast: toast2, setHeight });
  pop();
}
function Toaster($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  let reverseOrder = value_or_fallback($$props["reverseOrder"], false);
  let position = value_or_fallback($$props["position"], "top-center");
  let toastOptions = value_or_fallback($$props["toastOptions"], void 0);
  let gutter = value_or_fallback($$props["gutter"], 8);
  let containerStyle = value_or_fallback($$props["containerStyle"], void 0);
  let containerClassName = value_or_fallback($$props["containerClassName"], void 0);
  const { toasts, handlers: handlers2 } = useToaster(toastOptions);
  let _toasts;
  _toasts = store_get($$store_subs, "$toasts", toasts).map((toast2) => ({
    ...toast2,
    position: toast2.position || position,
    offset: handlers2.calculateOffset(toast2, store_get($$store_subs, "$toasts", toasts), {
      reverseOrder,
      gutter,
      defaultPosition: position
    })
  }));
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(_toasts);
  $$payload.out += `<div${attr("class", `toaster ${stringify(containerClassName || "")} svelte-1phplh9`, false)}${attr("style", containerStyle, false)} role="alert">${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const toast2 = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}${anchor_2}`;
    ToastWrapper($$payload, {
      toast: toast2,
      setHeight: (height) => handlers2.updateHeight(toast2.id, height)
    });
    $$payload.out += `${anchor_2}${anchor_1}`;
  }
  $$payload.out += `${anchor}</div>`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, {
    reverseOrder,
    position,
    toastOptions,
    gutter,
    containerStyle,
    containerClassName
  });
  pop();
}
function AnimatedIconGitHub($$payload, $$props) {
  push(false);
  $$payload.out += `<div class="wrapper w-14 transition-transform duration-500 hover:scale-110 sm:w-16"><svg id="github-logo-3" viewBox="0 0 350 350" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" class="fill-foreground svelte-74e9eg"><g id="octocatGroup" transform="translate(176.516104,174.507897) scale(1,1)" class="svelte-74e9eg"><g id="github-logo-3-u-octocat" transform="translate(-176.516104,-174.507897)"><g id="github-logo-3-u-mask-group" mask="url(#github-logo-3-u-masks)"><path id="octocatIcon" d="M112.960508,237.331573c1.237319-9.73313,5.203479-16.47098,9.414652-20.213549-33.196295-3.494494-68.122999-16.470981-68.122999-74.37055c0-16.47098,5.941582-29.946679,15.356234-40.427099-1.485396-3.742569-6.688874-19.218185,1.488458-39.930948c0,0,12.63352-3.993707,41.119426,15.472553c12.19583-3.299515,24.773192-4.978003,37.407468-4.992134c12.63352,0,25.512053,1.748778,37.404406,4.992134c28.488969-19.46626,41.122488-15.472553,41.122488-15.472553c8.177333,20.712763,2.970791,36.188379,1.485396,39.930948c9.662728,10.48042,15.359297,23.956119,15.359297,40.427099c0,57.899569-34.926705,70.624918-68.371076,74.37055c5.451555,4.740996,10.155818,13.723775,10.155818,27.949826c0,20.213549-.245013,36.436454-.245013,41.425526c0,3.993707,2.725777,8.737766,10.155818,7.240126c59.452577-19.968537,102.308537-76.367403,102.308537-142.998613C299.244432,67.378499,232.113738,0,149.623747,0C66.88568,0,0,67.378499,0,150.734889c0,66.63121,42.855961,123.033139,102.308537,142.99555c7.433104,1.500703,10.155818-3.243356,10.155818-7.234001c0-3.494493-.245013-15.472553-.245013-27.952888" transform="translate(27.016058 27.499656)" clip-rule="evenodd" fill-rule="evenodd" class="svelte-74e9eg"></path><mask id="github-logo-3-u-masks" x="-150%" y="-150%" height="400%" width="400%" fill="white"><rect id="github-logo-3-s-rect1" width="126.673063" height="93.428549" rx="0" ry="0" transform="matrix(2.551557 0 0 3.465898 16.330703 13.374634)" stroke-width="0"></rect><g id="tailGroup" transform="translate(139.020729,274.024542) rotate(8.704455)" class="svelte-74e9eg"><path id="tail" d="M49.28484,208.660023c30.667915-1.297971,30.296017,8.94263,39.053288,23.142689c6.873284,11.145143,18.44183,14.644983,38.776904,9.980348" transform="translate(-127.391415,-241.927638)" fill="none" fill-rule="evenodd" stroke="#000" stroke-width="10" stroke-linecap="round" class="svelte-74e9eg"></path></g></mask></g></g></g></svg></div>`;
  pop();
}
function addHighlight(element) {
  element.setAttribute("data-highlighted", "");
}
function removeHighlight(element) {
  element.removeAttribute("data-highlighted");
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function handleRovingFocus(nextElement) {
  if (!isBrowser)
    return;
  sleep(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement(prevElement)) {
    return prevElement;
  }
  return null;
}
const ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
const defaults$3 = {
  onMatch: handleRovingFocus,
  getCurrentItem: () => document.activeElement
};
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$3, ...args };
  const typed = writable([]);
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key, items) => {
    if (ignoredKeys.has(key))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
const SUB_OPEN_KEYS = {
  ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
  rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
};
const SUB_CLOSE_KEYS = {
  ltr: [kbd.ARROW_LEFT],
  rtl: [kbd.ARROW_RIGHT]
};
const menuIdParts = ["menu", "trigger"];
const defaults$2 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: "body",
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  typeahead: true,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = writable(false);
  const lastPointerX = writable(0);
  const pointerGraceIntent = writable(null);
  const pointerDir = writable("right");
  const currentFocusedItem = writable(null);
  const pointerMovingToSubmenu = derivedWithUnsubscribe([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  });
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = builder(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": $portal ? "" : void 0,
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          setMeltMenuAttribute(node, selector);
          const popper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              clickOutside: $closeOnOutsideClick ? {
                handler: (e) => {
                  get_store_value(onOutsideClick)?.(e);
                  if (e.defaultPrevented)
                    return;
                  if (isHTMLElement($rootActiveTrigger) && !$rootActiveTrigger.contains(e.target)) {
                    rootOpen.set(false);
                    $rootActiveTrigger.focus();
                  }
                }
              } : null,
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          });
          if (popper && popper.destroy) {
            unsubPopper = popper.destroy;
          }
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement(target) || !isHTMLElement(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, get_store_value(loop) ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = builder(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p) => {
        if (p)
          return p;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = get_store_value(rootOpen);
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = builder(name("arrow"), {
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
  const item = builder(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (get_store_value(closeOnItemClick)) {
          sleep(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = builder(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = builder(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = builder(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = builder(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = builder(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (get_store_value(closeOnItemClick)) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$2,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options;
    const subActiveTrigger = writable(null);
    const subOpenTimer = writable(null);
    const pointerGraceTimer = writable(0);
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(get_store_value(subIds.trigger));
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = builder(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = get_store_value(subActiveTrigger);
          if (!activeTrigger)
            return;
          tick().then(() => {
            const parentMenuEl = getParentMenu(activeTrigger);
            const popper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement(parentMenuEl) ? parentMenuEl : void 0,
                clickOutside: null,
                focusTrap: null,
                escapeKeydown: null
              }
            });
            if (popper && popper.destroy) {
              unsubPopper = popper.destroy;
            }
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement(target) || !isHTMLElement(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, get_store_value(loop) ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = get_store_value(subActiveTrigger);
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && get_store_value(typeahead) === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = get_store_value(subActiveTrigger);
          if (get_store_value(isUsingKeyboard)) {
            const target = e.target;
            const submenuEl = document.getElementById(get_store_value(subIds.menu));
            if (!isHTMLElement(submenuEl) || !isHTMLElement(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement(relatedTarget) || !isHTMLElement(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = builder(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p) => {
          if (p)
            return p;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(get_store_value(pointerGraceTimer));
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!get_store_value(subOpen)) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = get_store_value(typed);
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!get_store_value(subOpen)) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          if (!isFocusWithinSubmenu(get_store_value(subIds.menu))) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = get_store_value(subOpenTimer);
          if (!get_store_value(subOpen) && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(get_store_value(subIds.menu));
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(get_store_value(pointerGraceTimer));
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = builder(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser || $pointerGraceIntent)
        return;
      window.clearTimeout(get_store_value(pointerGraceTimer));
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser)
        return;
      sleep(1).then(() => {
        const menuEl = document.getElementById(get_store_value(subIds.menu));
        if (!menuEl)
          return;
        if ($subOpen && get_store_value(isUsingKeyboard)) {
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        }
        if (!$subOpen) {
          const focusedItem = get_store_value(currentFocusedItem);
          if (focusedItem && menuEl.contains(focusedItem)) {
            removeHighlight(focusedItem);
          }
        }
        if (menuEl && !$subOpen) {
          const subTriggerEl = document.getElementById(get_store_value(subIds.trigger));
          if (!subTriggerEl || document.activeElement === subTriggerEl)
            return;
          removeHighlight(subTriggerEl);
        }
      });
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(get_store_value(rootIds.trigger));
    if (isHTMLElement(triggerEl) && get_store_value(rootOpen)) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = get_store_value(rootActiveTrigger);
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = get_store_value(closeFocus);
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep(1).then(() => {
      const menuEl = document.getElementById(get_store_value(rootIds.menu));
      if (menuEl && $rootOpen && get_store_value(isUsingKeyboard)) {
        if (get_store_value(disableFocusFirstItem)) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && get_store_value(closeOnEscape)) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    const $currentFocusedItem = get_store_value(currentFocusedItem);
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget) || !isHTMLElement(target))
      return;
    const $lastPointerX = get_store_value(lastPointerX);
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = get_store_value(typed);
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return get_store_value(pointerMovingToSubmenu)(e);
  }
  function getParentMenu(element) {
    const parentMenuEl = element.closest('[role="menu"]');
    if (!isHTMLElement(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    ids: rootIds,
    trigger: rootTrigger,
    menu: rootMenu,
    open: rootOpen,
    item,
    group,
    groupLabel,
    arrow: rootArrow,
    options: opts.rootOptions,
    createCheckboxItem,
    createSubmenu,
    createMenuRadioGroup,
    separator,
    handleTypeaheadSearch
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = get_store_value(prevFocusable);
    if ($prevFocusable) {
      e.preventDefault();
      sleep(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = get_store_value(nextFocusable);
    if ($nextFocusable) {
      e.preventDefault();
      sleep(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement(item));
}
function applyAttrsIfDisabled(element) {
  if (!element || !isElementDisabled(element))
    return;
  element.setAttribute("data-disabled", "");
  element.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser)
    return;
  const timer = get_store_value(timerStore);
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element, selector) {
  if (!element)
    return;
  const menuEl = element.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement(menuEl))
    return;
  element.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement(currentFocusedItem) || !isHTMLElement(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement(submenuEl);
}
const defaults$1 = {
  arrowSize: 8,
  positioning: {
    placement: "bottom"
  },
  preventScroll: true,
  closeOnEscape: true,
  closeOnOutsideClick: true,
  portal: void 0,
  loop: false,
  dir: "ltr",
  defaultOpen: false,
  forceVisible: false,
  typeahead: true,
  closeFocus: void 0,
  disableFocusFirstItem: false,
  closeOnItemClick: true,
  onOutsideClick: void 0
};
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$1, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = writable(null);
  const nextFocusable = writable(null);
  const prevFocusable = writable(null);
  const { trigger, menu, item, arrow, createSubmenu, createCheckboxItem, createMenuRadioGroup, separator, group, groupLabel, ids } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger,
    nextFocusable,
    prevFocusable,
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements: {
      trigger,
      menu,
      item,
      arrow,
      separator,
      group,
      groupLabel
    },
    states: {
      open: rootOpen
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    options: rootOptions
  };
}
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = builder("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
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
function Menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "asChild",
    "disabled",
    "el",
    "$$props"
  ]);
  push(false);
  const $$store_subs = {};
  let builder2, attrs;
  let href = value_or_fallback($$props["href"], void 0);
  let asChild = value_or_fallback($$props["asChild"], false);
  let disabled = value_or_fallback($$props["disabled"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { item }, getAttrs } = getCtx();
  createDispatcher();
  builder2 = store_get($$store_subs, "$item", item);
  attrs = {
    ...getAttrs("item"),
    ...disabledAttrs(disabled)
  };
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
    const $$tag = href ? "a" : "div";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    if ($$tag) {
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `<${$$tag}${spread_attributes([{ "href": href }, builder2, $$restProps], false, false, "")}>`;
      if (!VoidElements.has($$tag)) {
        $$payload.out += `${anchor_3}`;
        const anchor_4 = create_anchor($$payload);
        $$payload.out += `${anchor_4}`;
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
        $$payload.out += `${anchor_4}`;
        $$payload.out += `${anchor_3}</${$$tag}>`;
      }
    }
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor}`;
  unsubscribe_stores($$store_subs);
  bind_props($$props, { href, asChild, disabled, el });
  pop();
}
function Menu($$payload, $$props) {
  push(false);
  const $$store_subs = {};
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], void 0);
  let portal = value_or_fallback($$props["portal"], void 0);
  let open = value_or_fallback($$props["open"], void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], void 0);
  let preventScroll = value_or_fallback($$props["preventScroll"], void 0);
  let loop = value_or_fallback($$props["loop"], void 0);
  let dir = value_or_fallback($$props["dir"], void 0);
  let typeahead = value_or_fallback($$props["typeahead"], void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], void 0);
  let disableFocusFirstItem = value_or_fallback($$props["disableFocusFirstItem"], void 0);
  let closeOnItemClick = value_or_fallback($$props["closeOnItemClick"], void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], void 0);
  const {
    states: { open: localOpen },
    updateOption,
    ids
  } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("portal", portal);
  updateOption("preventScroll", preventScroll);
  updateOption("loop", loop);
  updateOption("dir", dir);
  updateOption("closeFocus", closeFocus);
  updateOption("disableFocusFirstItem", disableFocusFirstItem);
  updateOption("typeahead", typeahead);
  updateOption("closeOnItemClick", closeOnItemClick);
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
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    open,
    onOpenChange,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick
  });
  pop();
}
function Menu_content($$payload, $$props) {
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
    elements: { menu },
    states: { open },
    ids,
    getAttrs
  } = getCtx();
  createDispatcher();
  const attrs = getAttrs("content");
  if (id) {
    ids.menu.set(id);
  }
  builder2 = store_get($$store_subs, "$menu", menu);
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
function Menu_trigger($$payload, $$props) {
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
function Dropdown_menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "inset", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let inset = value_or_fallback($$props["inset"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_item($$payload, spread_props([
    {
      class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", inset && "pl-8", className)
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
  bind_props($$props, { class: className, inset });
  pop();
}
function Dropdown_menu_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "sideOffset",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let sideOffset = value_or_fallback($$props["sideOffset"], 4);
  let transition = value_or_fallback($$props["transition"], flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_content($$payload, spread_props([
    {
      transition,
      transitionConfig,
      sideOffset,
      class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
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
    sideOffset,
    transition,
    transitionConfig
  });
  pop();
}
function Moon($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const iconNode = [
    [
      "path",
      { "d": "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" }
    ]
  ];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Icon($$payload, spread_props([
    { name: "moon" },
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
function Sun($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  push(false);
  const iconNode = [
    [
      "circle",
      { "cx": "12", "cy": "12", "r": "4" }
    ],
    ["path", { "d": "M12 2v2" }],
    ["path", { "d": "M12 20v2" }],
    ["path", { "d": "m4.93 4.93 1.41 1.41" }],
    ["path", { "d": "m17.66 17.66 1.41 1.41" }],
    ["path", { "d": "M2 12h2" }],
    ["path", { "d": "M20 12h2" }],
    ["path", { "d": "m6.34 17.66-1.41 1.41" }],
    ["path", { "d": "m19.07 4.93-1.41 1.41" }]
  ];
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Icon($$payload, spread_props([
    { name: "sun" },
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
const Root = Menu;
const Trigger = Menu_trigger;
function ThemeSwitcher($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<div class="absolute self-start p-2">${anchor}`;
  Root($$payload, {
    children: ($$payload2, $$slotProps) => {
      const anchor_1 = create_anchor($$payload2);
      const anchor_5 = create_anchor($$payload2);
      $$payload2.out += `${anchor_1}`;
      Trigger($$payload2, {
        asChild: true,
        children: ($$payload3, $$slotProps2) => {
          const builder2 = $$slotProps2.builder;
          const anchor_2 = create_anchor($$payload3);
          $$payload3.out += `${anchor_2}`;
          Button($$payload3, {
            builders: [builder2],
            variant: "ghost",
            size: "icon",
            children: ($$payload4, $$slotProps3) => {
              const anchor_3 = create_anchor($$payload4);
              const anchor_4 = create_anchor($$payload4);
              $$payload4.out += `${anchor_3}`;
              Sun($$payload4, {
                class: "h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
              });
              $$payload4.out += `${anchor_3} ${anchor_4}`;
              Moon($$payload4, {
                class: "absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
              });
              $$payload4.out += `${anchor_4} <span class="sr-only">Toggle theme</span>`;
            }
          });
          $$payload3.out += `${anchor_2}`;
        }
      });
      $$payload2.out += `${anchor_1} ${anchor_5}`;
      Dropdown_menu_content($$payload2, {
        align: "end",
        class: "border-opacity-30",
        children: ($$payload3, $$slotProps2) => {
          const anchor_6 = create_anchor($$payload3);
          const anchor_7 = create_anchor($$payload3);
          const anchor_8 = create_anchor($$payload3);
          const anchor_9 = create_anchor($$payload3);
          $$payload3.out += `<form method="POST">${anchor_6}`;
          Dropdown_menu_item($$payload3, {
            class: "p-0",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button formaction="/?/setTheme&theme=light" class="w-full p-2 text-start">Light</button>`;
            }
          });
          $$payload3.out += `${anchor_6} ${anchor_7}`;
          Dropdown_menu_item($$payload3, {
            class: "p-0",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button formaction="/?/setTheme&theme=dark" class="w-full p-2 text-start">Dark</button>`;
            }
          });
          $$payload3.out += `${anchor_7} ${anchor_8}`;
          Dropdown_menu_item($$payload3, {
            class: "p-0",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button formaction="/?/setTheme&theme=noroff" class="w-full p-2 text-start">Noroff</button>`;
            }
          });
          $$payload3.out += `${anchor_8} ${anchor_9}`;
          Dropdown_menu_item($$payload3, {
            class: "p-0",
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<button formaction="/?/setTheme&theme=system" class="w-full p-2 text-start">System</button>`;
            }
          });
          $$payload3.out += `${anchor_9}</form>`;
        }
      });
      $$payload2.out += `${anchor_5}`;
    }
  });
  $$payload.out += `${anchor}</div>`;
  pop();
}
function _layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Toaster($$payload, {});
  $$payload.out += `${anchor} <main class="from flex min-h-svh flex-col items-center bg-background dark:bg-gradient-to-tr dark:from-stone-950 dark:to-background">${anchor_1}`;
  ThemeSwitcher($$payload);
  $$payload.out += `${anchor_1} ${anchor_2}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_2} <div class="flex-grow"></div> <a href="https://github.com/kyrregjerstad/RENAME" class="p-4">${anchor_3}`;
  AnimatedIconGitHub($$payload);
  $$payload.out += `${anchor_3}</a></main>`;
  pop();
}
export {
  _layout as default
};
