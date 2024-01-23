const EMPTY_FUNC = () => {
};
function run_all(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i]();
  }
}
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    if (invalidate)
      invalidate(void 0);
    return EMPTY_FUNC;
  }
  const unsub = store.subscribe(
    run,
    // @ts-expect-error
    invalidate
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
var is_array = Array.isArray;
var array_from = Array.from;
var object_keys = Object.keys;
var object_assign = Object.assign;
var is_frozen = Object.isFrozen;
var define_property = Object.defineProperty;
var get_descriptor = Object.getOwnPropertyDescriptor;
var object_prototype = Object.prototype;
var array_prototype = Array.prototype;
var get_prototype_of = Object.getPrototypeOf;
const PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
const DOMBooleanAttributes = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected"
];
const ROOT_BLOCK = 0;
const IF_BLOCK = 1;
const EACH_BLOCK = 2;
function create_root_block(intro) {
  return {
    // dom
    d: null,
    // effect
    e: null,
    // intro
    i: intro,
    // parent
    p: null,
    // transition
    r: null,
    // type
    t: ROOT_BLOCK
  };
}
const SOURCE = 1;
const DERIVED = 1 << 1;
const EFFECT = 1 << 2;
const PRE_EFFECT = 1 << 3;
const RENDER_EFFECT = 1 << 4;
const MANAGED = 1 << 6;
const UNOWNED = 1 << 7;
const CLEAN = 1 << 8;
const DIRTY = 1 << 9;
const MAYBE_DIRTY = 1 << 10;
const INERT = 1 << 11;
const DESTROYED = 1 << 12;
const IS_EFFECT = EFFECT | PRE_EFFECT | RENDER_EFFECT;
const FLUSH_MICROTASK = 0;
const FLUSH_SYNC = 1;
const UNINITIALIZED = Symbol();
let current_scheduler_mode = FLUSH_MICROTASK;
let is_micro_task_queued = false;
let is_task_queued = false;
let is_raf_queued = false;
let is_flushing_effect = false;
let current_queued_pre_and_render_effects = [];
let current_queued_effects = [];
let current_queued_tasks = [];
let current_raf_tasks = [];
let flush_count = 0;
let current_consumer = null;
let current_effect = null;
let current_dependencies = null;
let current_dependencies_index = 0;
let current_untracked_writes = null;
let current_untracking = false;
let ignore_mutation_validation = false;
let current_skip_consumer = false;
let current_block = null;
let current_component_context = null;
let is_ssr = false;
let updating_derived = false;
function set_is_ssr(ssr) {
  is_ssr = ssr;
}
function is_runes(context) {
  const component_context = context || current_component_context;
  return component_context !== null && component_context.r;
}
function default_equals(a, b) {
  return a === b;
}
function create_source_signal(flags, value) {
  return {
    // consumers
    c: null,
    // equals
    e: default_equals,
    // flags
    f: flags,
    // value
    v: value,
    // context: We can remove this if we get rid of beforeUpdate/afterUpdate
    x: null
  };
}
function create_computation_signal(flags, value, block) {
  return {
    // block
    b: block,
    // consumers
    c: null,
    // destroy
    d: null,
    // equals
    e: null,
    // flags
    f: flags,
    // level
    l: 0,
    // init
    i: null,
    // references
    r: null,
    // value
    v: value,
    // context: We can remove this if we get rid of beforeUpdate/afterUpdate
    x: null,
    // destroy
    y: null
  };
}
function push_reference(target_signal, ref_signal) {
  const references = target_signal.r;
  if (references === null) {
    target_signal.r = [ref_signal];
  } else {
    references.push(ref_signal);
  }
}
function is_signal_dirty(signal) {
  const flags = signal.f;
  if ((flags & DIRTY) !== 0 || signal.v === UNINITIALIZED) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    const dependencies = (
      /** @type {import('./types.js').ComputationSignal<V>} **/
      signal.d
    );
    if (dependencies !== null) {
      const length = dependencies.length;
      let i;
      for (i = 0; i < length; i++) {
        const dependency = dependencies[i];
        if ((dependency.f & MAYBE_DIRTY) !== 0 && !is_signal_dirty(dependency)) {
          set_signal_status(dependency, CLEAN);
          continue;
        }
        if ((dependency.f & DIRTY) !== 0) {
          if ((dependency.f & DERIVED) !== 0) {
            update_derived(
              /** @type {import('./types.js').ComputationSignal<V>} **/
              dependency,
              true
            );
            if ((signal.f & DIRTY) !== 0) {
              return true;
            }
          } else {
            return true;
          }
        }
      }
    }
  }
  return false;
}
function execute_signal_fn(signal) {
  const init = signal.i;
  const previous_dependencies = current_dependencies;
  const previous_dependencies_index = current_dependencies_index;
  const previous_untracked_writes = current_untracked_writes;
  const previous_consumer = current_consumer;
  const previous_block = current_block;
  const previous_component_context = current_component_context;
  const previous_skip_consumer = current_skip_consumer;
  const is_render_effect = (signal.f & RENDER_EFFECT) !== 0;
  const previous_untracking = current_untracking;
  current_dependencies = /** @type {null | import('./types.js').Signal[]} */
  null;
  current_dependencies_index = 0;
  current_untracked_writes = null;
  current_consumer = signal;
  current_block = signal.b;
  current_component_context = signal.x;
  current_skip_consumer = !is_flushing_effect && (signal.f & UNOWNED) !== 0;
  current_untracking = false;
  if (is_render_effect && current_component_context?.u != null) {
    current_component_context.u.e();
  }
  try {
    let res;
    if (is_render_effect) {
      res = /** @type {(block: import('./types.js').Block, signal: import('./types.js').Signal) => V} */
      init(
        /** @type {import('./types.js').Block} */
        signal.b,
        /** @type {import('./types.js').Signal} */
        signal
      );
    } else {
      res = /** @type {() => V} */
      init();
    }
    let dependencies = (
      /** @type {import('./types.js').Signal<unknown>[]} **/
      signal.d
    );
    if (current_dependencies !== null) {
      let i;
      if (dependencies !== null) {
        const deps_length = dependencies.length;
        const full_current_dependencies = current_dependencies_index === 0 ? current_dependencies : dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
        const current_dep_length = full_current_dependencies.length;
        const full_current_dependencies_set = current_dep_length > 16 ? new Set(full_current_dependencies) : null;
        for (i = current_dependencies_index; i < deps_length; i++) {
          const dependency = dependencies[i];
          if (full_current_dependencies_set !== null && !full_current_dependencies_set.has(dependency) || !full_current_dependencies.includes(dependency)) {
            remove_consumer(signal, dependency);
          }
        }
      }
      if (dependencies !== null && current_dependencies_index > 0) {
        dependencies.length = current_dependencies_index + current_dependencies.length;
        for (i = 0; i < current_dependencies.length; i++) {
          dependencies[current_dependencies_index + i] = current_dependencies[i];
        }
      } else {
        signal.d = /** @type {import('./types.js').Signal<V>[]} **/
        dependencies = current_dependencies;
      }
      if (!current_skip_consumer) {
        for (i = current_dependencies_index; i < dependencies.length; i++) {
          const dependency = dependencies[i];
          const consumers = dependency.c;
          if (consumers === null) {
            dependency.c = [signal];
          } else if (consumers[consumers.length - 1] !== signal) {
            consumers.push(signal);
          }
        }
      }
    } else if (dependencies !== null && current_dependencies_index < dependencies.length) {
      remove_consumers(signal, current_dependencies_index);
      dependencies.length = current_dependencies_index;
    }
    return res;
  } finally {
    current_dependencies = previous_dependencies;
    current_dependencies_index = previous_dependencies_index;
    current_untracked_writes = previous_untracked_writes;
    current_consumer = previous_consumer;
    current_block = previous_block;
    current_component_context = previous_component_context;
    current_skip_consumer = previous_skip_consumer;
    current_untracking = previous_untracking;
  }
}
function remove_consumer(signal, dependency) {
  const consumers = dependency.c;
  let consumers_length = 0;
  if (consumers !== null) {
    consumers_length = consumers.length - 1;
    const index = consumers.indexOf(signal);
    if (index !== -1) {
      if (consumers_length === 0) {
        dependency.c = null;
      } else {
        consumers[index] = consumers[consumers_length];
        consumers.pop();
      }
    }
  }
  if (consumers_length === 0 && (dependency.f & UNOWNED) !== 0) {
    set_signal_status(dependency, DIRTY);
    remove_consumers(
      /** @type {import('./types.js').ComputationSignal<V>} **/
      dependency,
      0
    );
  }
}
function remove_consumers(signal, start_index) {
  const dependencies = signal.d;
  if (dependencies !== null) {
    const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
    let i;
    for (i = start_index; i < dependencies.length; i++) {
      const dependency = dependencies[i];
      if (active_dependencies === null || !active_dependencies.includes(dependency)) {
        remove_consumer(signal, dependency);
      }
    }
  }
}
function destroy_references(signal) {
  const references = signal.r;
  signal.r = null;
  if (references !== null) {
    let i;
    for (i = 0; i < references.length; i++) {
      const reference = references[i];
      if ((reference.f & IS_EFFECT) !== 0) {
        destroy_signal(reference);
      } else {
        remove_consumers(reference, 0);
        reference.d = null;
      }
    }
  }
}
function report_error(block, error) {
  let current_block2 = block;
  if (current_block2 !== null) {
    throw error;
  }
}
function execute_effect(signal) {
  if ((signal.f & DESTROYED) !== 0) {
    return;
  }
  const teardown = signal.v;
  const previous_effect = current_effect;
  current_effect = signal;
  try {
    destroy_references(signal);
    if (teardown !== null) {
      teardown();
    }
    const possible_teardown = execute_signal_fn(signal);
    if (typeof possible_teardown === "function") {
      signal.v = possible_teardown;
    }
  } catch (error) {
    const block = signal.b;
    if (block !== null) {
      report_error(block, error);
    } else {
      throw error;
    }
  } finally {
    current_effect = previous_effect;
  }
  const component_context = signal.x;
  if (is_runes(component_context) && // Don't rerun pre effects more than once to accomodate for "$: only runs once" behavior
  (signal.f & PRE_EFFECT) !== 0 && current_queued_pre_and_render_effects.length > 0) {
    flush_local_pre_effects(component_context);
  }
}
function infinite_loop_guard() {
  if (flush_count > 100) {
    throw new Error(
      "ERR_SVELTE_TOO_MANY_UPDATES"
    );
  }
  flush_count++;
}
function flush_queued_effects(effects) {
  const length = effects.length;
  if (length > 0) {
    infinite_loop_guard();
    const previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      let i;
      for (i = 0; i < length; i++) {
        const signal = effects[i];
        const flags = signal.f;
        if ((flags & (DESTROYED | INERT)) === 0) {
          if (is_signal_dirty(signal)) {
            set_signal_status(signal, CLEAN);
            execute_effect(signal);
          } else if ((flags & MAYBE_DIRTY) !== 0) {
            set_signal_status(signal, CLEAN);
          }
        }
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
    effects.length = 0;
  }
}
function process_microtask() {
  is_micro_task_queued = false;
  if (flush_count > 101) {
    return;
  }
  const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
  const previous_queued_effects = current_queued_effects;
  current_queued_pre_and_render_effects = [];
  current_queued_effects = [];
  flush_queued_effects(previous_queued_pre_and_render_effects);
  flush_queued_effects(previous_queued_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
function schedule_effect(signal, sync) {
  const flags = signal.f;
  if (sync) {
    execute_effect(signal);
    set_signal_status(signal, CLEAN);
  } else {
    if (current_scheduler_mode === FLUSH_MICROTASK) {
      if (!is_micro_task_queued) {
        is_micro_task_queued = true;
        queueMicrotask(process_microtask);
      }
    }
    if ((flags & EFFECT) !== 0) {
      current_queued_effects.push(signal);
      if ((flags & MANAGED) === 0) {
        mark_subtree_children_inert(signal, true);
      }
    } else {
      const length = current_queued_pre_and_render_effects.length;
      let should_append = length === 0;
      if (!should_append) {
        const target_level = signal.l;
        const target_block = signal.b;
        const is_pre_effect = (flags & PRE_EFFECT) !== 0;
        let target_signal;
        let is_target_pre_effect;
        let i = length;
        while (true) {
          target_signal = current_queued_pre_and_render_effects[--i];
          if (target_signal.l <= target_level) {
            if (i + 1 === length) {
              should_append = true;
            } else {
              is_target_pre_effect = (target_signal.f & PRE_EFFECT) !== 0;
              if (target_signal.b !== target_block || is_target_pre_effect && !is_pre_effect) {
                i++;
              }
              current_queued_pre_and_render_effects.splice(i, 0, signal);
            }
            break;
          }
          if (i === 0) {
            current_queued_pre_and_render_effects.unshift(signal);
            break;
          }
        }
      }
      if (should_append) {
        current_queued_pre_and_render_effects.push(signal);
      }
    }
  }
}
function process_task() {
  is_task_queued = false;
  const tasks = current_queued_tasks.slice();
  current_queued_tasks = [];
  run_all(tasks);
}
function process_raf_task() {
  is_raf_queued = false;
  const tasks = current_raf_tasks.slice();
  current_raf_tasks = [];
  run_all(tasks);
}
function flush_local_pre_effects(context) {
  const effects = [];
  for (let i = 0; i < current_queued_pre_and_render_effects.length; i++) {
    const effect = current_queued_pre_and_render_effects[i];
    if ((effect.f & PRE_EFFECT) !== 0 && effect.x === context) {
      effects.push(effect);
      current_queued_pre_and_render_effects.splice(i, 1);
      i--;
    }
  }
  flush_queued_effects(effects);
}
function flushSync(fn) {
  const previous_scheduler_mode = current_scheduler_mode;
  const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
  const previous_queued_effects = current_queued_effects;
  try {
    infinite_loop_guard();
    const pre_and_render_effects = [];
    const effects = [];
    current_scheduler_mode = FLUSH_SYNC;
    current_queued_pre_and_render_effects = pre_and_render_effects;
    current_queued_effects = effects;
    flush_queued_effects(previous_queued_pre_and_render_effects);
    flush_queued_effects(previous_queued_effects);
    if (fn !== void 0) {
      fn();
    }
    if (current_queued_pre_and_render_effects.length > 0 || effects.length > 0) {
      flushSync();
    }
    if (is_raf_queued) {
      process_raf_task();
    }
    if (is_task_queued) {
      process_task();
    }
    flush_count = 0;
  } finally {
    current_scheduler_mode = previous_scheduler_mode;
    current_queued_pre_and_render_effects = previous_queued_pre_and_render_effects;
    current_queued_effects = previous_queued_effects;
  }
}
async function tick() {
  await Promise.resolve();
  flushSync();
}
function update_derived(signal, force_schedule) {
  const previous_updating_derived = updating_derived;
  updating_derived = true;
  const value = execute_signal_fn(signal);
  updating_derived = previous_updating_derived;
  const status = current_skip_consumer || (signal.f & UNOWNED) !== 0 ? DIRTY : CLEAN;
  set_signal_status(signal, status);
  const equals = (
    /** @type {import('./types.js').EqualsFunctions} */
    signal.e
  );
  if (!equals(value, signal.v)) {
    signal.v = value;
    mark_signal_consumers(signal, DIRTY, force_schedule);
  }
}
function get(signal) {
  const flags = signal.f;
  if ((flags & DESTROYED) !== 0) {
    return signal.v;
  }
  if (current_consumer !== null && (current_consumer.f & MANAGED) === 0 && !current_untracking) {
    const unowned = (current_consumer.f & UNOWNED) !== 0;
    const dependencies = current_consumer.d;
    if (current_dependencies === null && dependencies !== null && dependencies[current_dependencies_index] === signal && !(unowned && current_effect !== null)) {
      current_dependencies_index++;
    } else if (dependencies === null || current_dependencies_index === 0 || dependencies[current_dependencies_index - 1] !== signal) {
      if (current_dependencies === null) {
        current_dependencies = [signal];
      } else if (signal !== current_dependencies[current_dependencies.length - 1]) {
        current_dependencies.push(signal);
      }
    }
    if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && current_untracked_writes.includes(signal)) {
      set_signal_status(current_effect, DIRTY);
      schedule_effect(current_effect, false);
    }
  }
  if ((flags & DERIVED) !== 0 && is_signal_dirty(signal)) {
    {
      update_derived(
        /** @type {import('./types.js').ComputationSignal<V>} **/
        signal,
        false
      );
    }
  }
  return signal.v;
}
function set(signal, value) {
  set_signal_value(signal, value);
  return value;
}
function mark_subtree_children_inert(signal, inert, visited_blocks) {
  const references = signal.r;
  if (references !== null) {
    let i;
    for (i = 0; i < references.length; i++) {
      const reference = references[i];
      if ((reference.f & IS_EFFECT) !== 0) {
        mark_subtree_inert(references[i], inert, visited_blocks);
      }
    }
  }
}
function mark_subtree_inert(signal, inert, visited_blocks = /* @__PURE__ */ new Set()) {
  const flags = signal.f;
  const is_already_inert = (flags & INERT) !== 0;
  if (is_already_inert !== inert) {
    signal.f ^= INERT;
    if (!inert && (flags & IS_EFFECT) !== 0 && (flags & CLEAN) === 0) {
      schedule_effect(
        /** @type {import('./types.js').EffectSignal} */
        signal,
        false
      );
    }
    const block = signal.b;
    if (block !== null && !visited_blocks.has(block)) {
      visited_blocks.add(block);
      const type = block.t;
      if (type === IF_BLOCK) {
        const condition_effect = block.e;
        if (condition_effect !== null && block !== current_block) {
          mark_subtree_inert(condition_effect, inert);
        }
        const consequent_effect = block.ce;
        if (consequent_effect !== null && block.v) {
          mark_subtree_inert(consequent_effect, inert, visited_blocks);
        }
        const alternate_effect = block.ae;
        if (alternate_effect !== null && !block.v) {
          mark_subtree_inert(alternate_effect, inert, visited_blocks);
        }
      } else if (type === EACH_BLOCK) {
        const items = block.v;
        for (let { e: each_item_effect } of items) {
          if (each_item_effect !== null) {
            mark_subtree_inert(each_item_effect, inert, visited_blocks);
          }
        }
      }
    }
  }
  mark_subtree_children_inert(signal, inert, visited_blocks);
}
function mark_signal_consumers(signal, to_status, force_schedule) {
  const runes = is_runes(signal.x);
  const consumers = signal.c;
  if (consumers !== null) {
    const length = consumers.length;
    let i;
    for (i = 0; i < length; i++) {
      const consumer = consumers[i];
      const flags = consumer.f;
      const unowned = (flags & UNOWNED) !== 0;
      const dirty = (flags & DIRTY) !== 0;
      if (dirty && !unowned || (!force_schedule || !runes) && consumer === current_effect) {
        continue;
      }
      set_signal_status(consumer, to_status);
      if ((flags & CLEAN) !== 0 || dirty && unowned) {
        if ((consumer.f & IS_EFFECT) !== 0) {
          schedule_effect(
            /** @type {import('./types.js').EffectSignal} */
            consumer,
            false
          );
        } else {
          mark_signal_consumers(consumer, MAYBE_DIRTY, force_schedule);
        }
      }
    }
  }
}
function set_signal_value(signal, value) {
  if (!current_untracking && !ignore_mutation_validation && current_consumer !== null && is_runes(signal.x) && (current_consumer.f & DERIVED) !== 0) {
    throw new Error(
      "ERR_SVELTE_UNSAFE_MUTATION"
    );
  }
  if ((signal.f & SOURCE) !== 0 && !/** @type {import('./types.js').EqualsFunctions} */
  signal.e(value, signal.v)) {
    const component_context = signal.x;
    signal.v = value;
    if (is_runes(component_context) && current_effect !== null && current_effect.c === null && (current_effect.f & CLEAN) !== 0) {
      if (current_dependencies !== null && current_dependencies.includes(signal)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect, false);
      } else {
        if (current_untracked_writes === null) {
          current_untracked_writes = [signal];
        } else {
          current_untracked_writes.push(signal);
        }
      }
    }
    mark_signal_consumers(signal, DIRTY, true);
    if (current_effect === null && current_queued_pre_and_render_effects.length === 0) {
      const update_callbacks = component_context?.u;
      if (update_callbacks != null) {
        run_all(update_callbacks.b);
        const managed = managed_effect(() => {
          destroy_signal(managed);
          run_all(update_callbacks.a);
        });
      }
    }
  }
}
function destroy_signal(signal) {
  const teardown = (
    /** @type {null | (() => void)} */
    signal.v
  );
  const destroy = signal.y;
  const flags = signal.f;
  destroy_references(signal);
  remove_consumers(signal, 0);
  signal.i = signal.r = signal.y = signal.x = signal.b = // @ts-expect-error - this is fine, since we're assigning to null to clear out a destroyed signal
  signal.v = signal.d = signal.c = null;
  set_signal_status(signal, DESTROYED);
  if (destroy !== null) {
    if (is_array(destroy)) {
      run_all(destroy);
    } else {
      destroy();
    }
  }
  if (teardown !== null && (flags & IS_EFFECT) !== 0) {
    teardown();
  }
}
// @__NO_SIDE_EFFECTS__
function source(initial_value) {
  const source2 = create_source_signal(SOURCE | CLEAN, initial_value);
  source2.x = current_component_context;
  return source2;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  const s = /* @__PURE__ */ source(initial_value);
  s.e = safe_equal;
  return s;
}
function untrack(fn) {
  const previous_untracking = current_untracking;
  try {
    current_untracking = true;
    return fn();
  } finally {
    current_untracking = previous_untracking;
  }
}
function internal_create_effect(type, init, sync, block, schedule) {
  const signal = create_computation_signal(type | DIRTY, null, block);
  signal.i = init;
  signal.x = current_component_context;
  if (current_effect !== null) {
    signal.l = current_effect.l + 1;
    if ((type & MANAGED) === 0) {
      push_reference(current_effect, signal);
    }
  }
  if (schedule) {
    schedule_effect(signal, sync);
  }
  return signal;
}
function effect_active() {
  return current_effect ? (current_effect.f & MANAGED) === 0 : false;
}
function user_effect(init) {
  if (current_effect === null) {
    throw new Error(
      "ERR_SVELTE_ORPHAN_EFFECT"
    );
  }
  const apply_component_effect_heuristics = current_effect.f & RENDER_EFFECT && current_component_context !== null && !current_component_context.m;
  const effect = internal_create_effect(
    EFFECT,
    init,
    false,
    current_block,
    !apply_component_effect_heuristics
  );
  if (apply_component_effect_heuristics) {
    let effects = (
      /** @type {import('./types.js').ComponentContext} */
      current_component_context.e
    );
    if (effects === null) {
      effects = /** @type {import('./types.js').ComponentContext} */
      current_component_context.e = [];
    }
    effects.push(effect);
  }
  return effect;
}
function managed_effect(init) {
  return internal_create_effect(EFFECT | MANAGED, init, false, current_block, true);
}
function render_effect(init, block = current_block, managed = false, sync = true) {
  let flags = RENDER_EFFECT;
  if (managed) {
    flags |= MANAGED;
  }
  return internal_create_effect(
    flags,
    /** @type {any} */
    init,
    sync,
    block,
    true
  );
}
const STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function safe_not_equal(a, b) {
  return a != a ? (
    // eslint-disable-next-line eqeqeq
    b == b
  ) : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function safe_equal(a, b) {
  return !safe_not_equal(a, b);
}
function get_or_init_context_map() {
  const component_context = current_component_context;
  if (component_context === null) {
    throw new Error(
      "ERR_SVELTE_ORPHAN_CONTEXT"
    );
  }
  let context_map = component_context.c;
  if (context_map === null) {
    const parent_context = get_parent_context(component_context);
    context_map = component_context.c = new Map(parent_context || void 0);
  }
  return context_map;
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
function update(signal, d = 1) {
  const value = get(signal);
  set_signal_value(signal, value + d);
  return value;
}
function onDestroy(fn) {
  if (!is_ssr) {
    user_effect(() => () => untrack(fn));
  }
}
function push$1(props, runes = false) {
  current_component_context = {
    // accessors
    a: null,
    // context
    c: null,
    // effects
    e: null,
    // mounted
    m: false,
    // parent
    p: current_component_context,
    // props
    s: props,
    // runes
    r: runes,
    // update_callbacks
    u: null
  };
}
function pop$1(accessors) {
  const context_stack_item = current_component_context;
  if (context_stack_item !== null) {
    if (accessors !== void 0) {
      context_stack_item.a = accessors;
    }
    const effects = context_stack_item.e;
    if (effects !== null) {
      context_stack_item.e = null;
      for (let i = 0; i < effects.length; i++) {
        schedule_effect(effects[i], false);
      }
    }
    current_component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
}
const ATTR_REGEX = /[&"]/g;
const CONTENT_REGEX = /[&<]/g;
const INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
const VoidElements = /* @__PURE__ */ new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
]);
function create_payload() {
  return { out: "", head: { title: "", out: "", anchor: 0 }, anchor: 0 };
}
function copy_payload(to_copy) {
  return {
    ...to_copy,
    head: { ...to_copy.head }
  };
}
function assign_payload(p1, p2) {
  p1.out = p2.out;
  p1.head = p2.head;
  p1.anchor = p2.anchor;
}
function render(component, options) {
  const payload = create_payload();
  const root_anchor = create_anchor(payload);
  const root_head_anchor = create_anchor(payload.head);
  set_is_ssr(true);
  payload.out += root_anchor;
  if (options.context) {
    push$1({});
    current_component_context.c = options.context;
  }
  component(payload, options.props, {}, {});
  if (options.context) {
    pop$1();
  }
  payload.out += root_anchor;
  set_is_ssr(false);
  return {
    head: payload.head.out || payload.head.title ? payload.head.title + root_head_anchor + payload.head.out + root_head_anchor : "",
    html: payload.out
  };
}
function push(runes) {
  push$1({}, runes);
}
function pop() {
  pop$1();
}
function escape(value, is_attr = false) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
function escape_text(value) {
  const escaped = escape(value);
  return escaped === "" ? " " : escaped;
}
function attr(name, value, boolean) {
  if (value == null || !value && boolean || value === "" && name === "class")
    return "";
  const assignment = boolean ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function spread_attributes(attrs, lowercase_attributes, is_svg, class_hash, additional) {
  const merged_attrs = {};
  let key;
  for (let i = 0; i < attrs.length; i++) {
    const obj = attrs[i];
    for (key in obj) {
      if (typeof obj[key] !== "function") {
        merged_attrs[key] = obj[key];
      }
    }
  }
  const styles = additional?.styles;
  if (styles) {
    if ("style" in merged_attrs) {
      merged_attrs.style = style_object_to_string(
        merge_styles(
          /** @type {string} */
          merged_attrs.style,
          styles
        )
      );
    } else {
      merged_attrs.style = style_object_to_string(styles);
    }
  }
  if (class_hash) {
    if ("class" in merged_attrs) {
      merged_attrs.class += ` ${class_hash}`;
    } else {
      merged_attrs.class = class_hash;
    }
  }
  const classes = additional?.classes;
  if (classes) {
    if ("class" in merged_attrs) {
      merged_attrs.class += ` ${classes}`;
    } else {
      merged_attrs.class = classes;
    }
  }
  let attr_str = "";
  let name;
  for (name in merged_attrs) {
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name))
      continue;
    if (lowercase_attributes) {
      name = name.toLowerCase();
    }
    const is_boolean = !is_svg && DOMBooleanAttributes.includes(name);
    attr_str += attr(name, merged_attrs[name], is_boolean);
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key in obj) {
      merged_props[key] = obj[key];
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter(
    /** @param {any} key */
    (key) => style_object[key]
  ).map(
    /** @param {any} key */
    (key) => `${key}: ${escape(style_object[key], true)};`
  ).join(" ");
}
function add_styles(style_object) {
  const styles = style_object_to_string(style_object);
  return styles ? ` style="${styles}"` : "";
}
function merge_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function store_get(store_values, store_name, store) {
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  store_values[store_name]?.[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function value_or_fallback(value, fallback) {
  return value === void 0 ? fallback : value;
}
function slot(payload, slot_fn, slot_props, fallback_fn) {
  if (slot_fn === void 0) {
    if (fallback_fn !== null) {
      fallback_fn();
    }
  } else {
    slot_fn(payload, slot_props);
  }
}
function rest_props(props, rest) {
  const rest_props2 = {};
  let key;
  for (key in props) {
    if (!rest.includes(key)) {
      rest_props2[key] = props[key];
    }
  }
  return rest_props2;
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function bind_props(props_parent, props_now) {
  for (const key in props_now) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key)?.set) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function create_anchor(payload) {
  const depth = payload.anchor++;
  return `<!--ssr:${depth}-->`;
}
function getContext(key) {
  const context_map = get_or_init_context_map();
  return (
    /** @type {T} */
    context_map.get(key)
  );
}
function setContext(key, context) {
  const context_map = get_or_init_context_map();
  context_map.set(key, context);
  return context;
}
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function createEventDispatcher() {
  const component_context = current_component_context;
  if (component_context === null) {
    throw new Error("createEventDispatcher can only be used during component initialisation.");
  }
  return (type, detail, options) => {
    const events = (
      /** @type {Record<string, Function | Function[]>} */
      component_context.s.$$events?.[
        /** @type {any} */
        type
      ]
    );
    if (events) {
      const callbacks = is_array(events) ? events.slice() : [events];
      const event = create_custom_event(
        /** @type {string} */
        type,
        detail,
        options
      );
      for (const fn of callbacks) {
        fn.call(component_context.a, event);
      }
      return !event.defaultPrevented;
    }
    return true;
  };
}
export {
  createEventDispatcher as $,
  setContext as A,
  copy_payload as B,
  assign_payload as C,
  bind_props as D,
  pop as E,
  create_anchor as F,
  onDestroy as G,
  value_or_fallback as H,
  add_styles as I,
  escape_text as J,
  spread_props as K,
  spread_attributes as L,
  merge_styles as M,
  stringify as N,
  attr as O,
  PassiveDelegatedEvents as P,
  slot as Q,
  store_get as R,
  ensure_array_like as S,
  unsubscribe_stores as T,
  UNINITIALIZED as U,
  tick as V,
  getContext as W,
  rest_props as X,
  VoidElements as Y,
  sanitize_props as Z,
  escape as _,
  array_prototype as a,
  subscribe_to_store as a0,
  is_array as b,
  set as c,
  define_property as d,
  effect_active as e,
  updating_derived as f,
  get_descriptor as g,
  get as h,
  is_frozen as i,
  get_prototype_of as j,
  object_keys as k,
  create_root_block as l,
  mutable_source as m,
  current_component_context as n,
  object_prototype as o,
  push$1 as p,
  pop$1 as q,
  render_effect as r,
  source as s,
  array_from as t,
  update as u,
  destroy_signal as v,
  object_assign as w,
  flushSync as x,
  render as y,
  push as z
};
