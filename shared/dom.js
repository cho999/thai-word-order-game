export function $(selector, root = document) {
  return root.querySelector(selector);
}

export function $$(selector, root = document) {
  return [...root.querySelectorAll(selector)];
}

export function show(element) {
  element?.classList.remove("hidden");
}

export function hide(element) {
  element?.classList.add("hidden");
}
