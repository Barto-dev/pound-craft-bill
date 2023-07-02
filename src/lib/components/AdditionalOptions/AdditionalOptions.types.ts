import type { SvelteComponent } from 'svelte';

export interface Option {
  label: string;
  icon?: new (...args: any[]) => SvelteComponent;
  disabled: boolean;
  onClick: () => void;
}
