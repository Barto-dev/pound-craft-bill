import {writable} from 'svelte/store';
import data from '../../seed.json';
import type { ISettings } from '../../global';

export const settings = writable<ISettings>();

export const loadSettings = () => {
  settings.set(data.settings);
}
