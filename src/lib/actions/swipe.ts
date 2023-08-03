import type { Action, ActionReturn } from 'svelte/action';
import { spring } from 'svelte/motion';

const THRESHOLD = 20;

interface Attributes {
  'on:outofview'?: (event: CustomEvent) => void;
}

interface SwipeOptions {
  triggerReset?: boolean,
}
export const swipe: Action<HTMLElement, SwipeOptions> = (
  node,
  params
): ActionReturn<SwipeOptions, Attributes> => {

  let x: number;
  let startingX: number;
  let endingX: number;
  let triggerReset = params?.triggerReset ?? false;
  let elementWidth = node.clientWidth;
  const mobileMediaQueryListener = window.matchMedia('(max-width: 1024px)');
  const coordinates = spring(
    { x: 0, y: 0 },
    { stiffness: 0.2, damping: 0.4 }
  );

  coordinates.subscribe(($prevCoords) => {
    node.style.transform = `translate3d(${$prevCoords.x}px, 0, 0)`;
  });

  const resetCard = () => {
    coordinates.update(() => {
      return { x: 0, y: 0 }
    });
  }

  const outOfView = () => {
    node.dispatchEvent(
      new CustomEvent('outOfView')
    )
  }

  const backInView = () => {
    node.dispatchEvent(
      new CustomEvent('backInView')
    )
  }

  const updateCoordinates = (x: number) => {
    coordinates.update(() => {
      return { x, y: 0 }
    });
  }

  const moveCardOver = (endingX: number) => {
    const leftSnapX = elementWidth * -0.95;
    const rightSnapX = 0;
    const movement = startingX - endingX;
    // swiped left
    if (movement > THRESHOLD) {
      x = leftSnapX;
      updateCoordinates(x);
      outOfView();
    }

    // swiped right
    if (movement < THRESHOLD) {
      x = rightSnapX;
      updateCoordinates(x)
    }
  }

  const handleMouseMove = (event: MouseEvent) => {
    // delta x = difference where we clicked and where we are now
    const dx = event.clientX - x;
    x = event.clientX;
    coordinates.update(($prevCoords) => {
      return { x: $prevCoords.x + dx, y: 0 }
    });
  }

  const handleTouchMove = (event: TouchEvent) => {
    // delta x = difference where we clicked and where we are now
    const dx = event.touches[0].clientX - x;
    x = event.touches[0].clientX;
    coordinates.update(($prevCoords) => {
      return { x: $prevCoords.x + dx, y: 0 }
    });
  }

  const handleTouchEnd = (event: TouchEvent) => {
    endingX = event.changedTouches[0].clientX;
    moveCardOver(endingX);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  }

  const handleTouchStart = (event: TouchEvent) => {
    x = event.touches[0].clientX;
    startingX = event.touches[0].clientX;
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  }

  const setupEventListeners = (matches: boolean) => {
    if (matches) {
      node.addEventListener('touchstart', handleTouchStart);
    } else {
      node.removeEventListener('touchstart', handleTouchStart);
    }
    elementWidth = node.clientWidth;
  }

  setupEventListeners(mobileMediaQueryListener.matches);

  mobileMediaQueryListener.onchange = (evt) => {
    setupEventListeners(evt.matches);
  }

  return {
    // this code will run any time when params of action change
    // in this particular case it will run when params object change
    update(newParams) {
      if (newParams.triggerReset) {
        resetCard();
      }
      triggerReset = false;
    },

    destroy() {
      node.removeEventListener('touchstart', handleTouchStart);
    }
  }
}
