export function triggerTransitionEnd(element: null | HTMLElement): void {
  const event = new Event('transitionend', { bubbles: true });
  if (element) {
    element.dispatchEvent(event);
  }
}

export function triggerAnimationendEnd(element: null | HTMLElement): void {
  const event = new Event('animationend', { bubbles: true });
  if (element) {
    element.dispatchEvent(event);
  }
}
