import { snackBar } from '$lib/stores/snackBarStore';
import type { AuthError, PostgrestError } from '@supabase/supabase-js';

export const displayError = (error: PostgrestError | AuthError) => {
  console.error(error);
  snackBar.send({
    message: error.message,
    type: 'error'
  });
};
