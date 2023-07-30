import { writable } from 'svelte/store';
import data from '../../seed.json';
import type { ISettings } from '../../global';
import { getSettingsFromDatabase } from '../../api/settings';
import type { SettingsType } from '../../types/DTM';

export const settings = writable<SettingsType>();

export const loadSettings = async () => {
  const settingsResponse = await getSettingsFromDatabase();
  if (settingsResponse) {
    settings.set(settingsResponse);
  }
};
