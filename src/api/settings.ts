import { displayError } from '$lib/utils/handleError';
import { supabase } from './supabase';
import type { SettingsType } from '../types/DTM';
import { snackBar } from '$lib/stores/snackBarStore';

export const getSettingsFromDatabase = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .single();
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

export const updateSettingsInDatabase = async (settings: SettingsType) => {
  const { data, error } = await supabase
    .from('settings')
    .update(settings)
    .eq('id', settings.id)
    .single();
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Invoice settings were successfully updated',
    type: 'success'
  })

  return data;
}

export const updatePasswordInDatabase = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password
  });
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Password was successfully updated',
    type: 'success'
  })

  return data;
}

export const updateEmailInDatabase = async (email: string) => {
  const { data, error } = await supabase.auth.updateUser({
    email
  });
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Check your email for the confirmation link',
    type: 'success'
  })

  return data;
}
