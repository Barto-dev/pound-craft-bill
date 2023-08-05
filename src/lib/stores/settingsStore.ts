import { writable } from 'svelte/store';
import { getSettingsFromDatabase, updateSettingsInDatabase } from '../../api/settings';
import type { SettingsType } from '../../types/DTM';

export const settings = writable<SettingsType>();

export const loadSettings = async () => {
  const settingsResponse = await getSettingsFromDatabase();
  if (settingsResponse) {
    settings.set(settingsResponse);
  }
};

export const updateSettings = async (settings: SettingsType) => {
  await updateSettingsInDatabase(settings);
  await loadSettings();
}
