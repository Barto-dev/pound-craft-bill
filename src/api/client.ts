import { supabase } from './supabase';

export const loadAllClients = async () => {
  const { data, error } = await supabase
    .from('client')
    .select('*, invoice(id,invoiceStatus,lineItems(*))');
  if (error) {
    console.error(error);
    return;
  }
  return data;
};

export const loadClient = async (id: string) => {
  const { data, error } = await supabase
    .from('client')
    .select('*, invoice(id,invoiceStatus,lineItems(*))')
    .eq('id', id);
  if (error) {
    console.error(error);
    return;
  }
  if (data?.length) {
    return data[0];
  }
};
