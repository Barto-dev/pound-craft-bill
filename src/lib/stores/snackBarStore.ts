import { writable } from 'svelte/store';
import type { ISnackbar, NotificationType } from '../../global';
import { nanoid } from 'nanoid';

const newSnackBar = () => {
  const { subscribe, update } = writable<ISnackbar[]>([]);

  function send(content: { message: string; type: NotificationType }) {
    const newSnackBar = { id: nanoid(), ...content };
    update((snackBars) => [...snackBars, newSnackBar]);
  }

  function remove(id?: string) {
    update((snackBars) => {
      if (id) {
        return snackBars.filter((snackBar) => snackBar.id !== id);
      }
      // If no id is passed, remove the first snackBar
      return snackBars.slice(1);
    });
  }

  return { subscribe, send, remove };
};

export const snackBar = newSnackBar();
