import { supabase } from './supabase';
import type { ClientType, InsertClientType } from '../types/DTM';
import { snackBar } from '$lib/stores/snackBarStore';
import { displayError } from '$lib/utils/handleError';

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
    .select('*, invoice(*, client(id, name), lineItems(*))')
    .eq('id', id);
  if (error) {
    console.error(error);
    return;
  }
  if (data?.length) {
    return data[0];
  }
  console.warn('cannot find client with id', id);
};

export const createClientInDatabase = async (client: InsertClientType) => {
  const { data, error } = await supabase
    .from('client')
    .insert([
      { ...client, userId: '7c6166b5-6d09-4545-b8fb-8c606c98a6ea' } as InsertClientType & {
        userId: string;
      }
    ])
    .select();
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Your  client was created successfully',
    type: 'success'
  });
  return data;
};

export const updateClientInDatabase = async (client: ClientType) => {
  const { invoice, ...clientToUpdate } = client;
  const { data, error } = await supabase
    .from('client')
    .update(clientToUpdate)
    .eq('id', clientToUpdate.id);
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Your  client was upated successfully',
    type: 'success'
  });
};
