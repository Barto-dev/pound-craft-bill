import { snackBar } from '$lib/stores/snackBarStore';
import type { PostgrestError } from '@supabase/supabase-js';

export const displayError = (error: PostgrestError) => {
  console.error(error);
  snackBar.send({
    message: error.message,
    type: 'error'
  });
};
