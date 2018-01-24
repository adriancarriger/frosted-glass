// Temporary replacement for `.closest` because Jest doesn't seem to support it
// istanbul ignore next
export function tempClosest(element, selector) {
  while (element && element.nodeType === 1) {
    if (element.matches(selector)) {
      return element;
    }

    element = element.parentNode;
  }

  return null;
}
