import { supabase } from './supabase';
import { displayError } from '$lib/utils/handleError';

type SignUpData = {
  email: string;
  password: string;
};

export const signUp = async (signUpData: SignUpData) => {
  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password
  });
  if (error) {
    displayError(error);
    return;
  }

  return data;
};

export const signIn = async (signInData: SignUpData) => {
  const { data, error } = await supabase.auth.
  signInWithPassword({
    email: signInData.email,
    password: signInData.password
  });
  if (error) {
    displayError(error);
    return;
  }

  return data;
}
