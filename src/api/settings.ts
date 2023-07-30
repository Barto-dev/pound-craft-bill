import { displayError } from '$lib/utils/handleError';
import { supabase } from './supabase';
import type { SettingsType } from '../types/DTM';

export const getSettingsFromDatabase = async () => {
  const { data, error } = await supabase.from('settings').select('*').single();
  if (error) {
    displayError(error);
    return;
  }

  return data;
};
export const addSettingsToDatabase = async (settings: SettingsType) => {
  const { data, error } = await supabase.from('settings').insert(settings);
  if (error) {
    displayError(error);
    return;
  }

  return data;
};
