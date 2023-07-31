import type { Action } from 'svelte/action';

export const clickOutside: Action<HTMLElement, () => void> = (node, runFunction) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      if (runFunction) {
        runFunction();
      }
    }
  }
  document.addEventListener('click', handleClick, true);

  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}
