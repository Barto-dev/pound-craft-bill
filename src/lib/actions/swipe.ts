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
  const elementWidth = node.clientWidth;
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

  const handleMouseUp = (event: MouseEvent) => {
    endingX = event.clientX;
    moveCardOver(endingX);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }

  const handleMouseDown = (event: MouseEvent) => {
    x = event.clientX;
    startingX = event.clientX;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }

  node.addEventListener('mousedown', handleMouseDown);

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
      node.removeEventListener('mousedown', handleMouseDown);
    }
  }
}
