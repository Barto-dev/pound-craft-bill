import { supabase } from './supabase';
import type { InvoiceType } from '../types/DTM';
import { displayError } from '$lib/utils/handleError';
import { snackBar } from '$lib/stores/snackBarStore';

export const loadAllInvoices = async () => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)');
  if (error) {
    console.error(error);
    return;
  }
  return data;
};

export const loadInvoiceById = async (id: string) => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name), lineItems(*)')
    .eq('id', id);
  if (error) {
    console.error(error);
    return;
  }
  if (data?.length) {
    return data[0];
  }
  console.warn('cannot find invoice with id', id);
};

export const insertInvoice = async (invoice: InvoiceType, userId: string) => {
  const { lineItems, client, ...newInvoice } = invoice;
  // add invoice to supabase
  const invoiceResults = await supabase
    .from('invoice')
    .insert([{ ...newInvoice, clientId: client?.id, userId }])
    .select();

  if (invoiceResults.error) {
    displayError(invoiceResults.error);
    return;
  }
  // get id of invoice
  const invoiceId = invoiceResults.data?.[0].id;
  // loop over all line items and add to them invoice id
  if (lineItems && lineItems.length) {
    const newLineItems = lineItems.map((lineItem) => {
      return { ...lineItem, invoiceId, userId };
    });
    const lineItemResults = await supabase.from('lineItems').insert(newLineItems).select();
    if (lineItemResults.error) {
      displayError(lineItemResults.error);
      return;
    }
  }
  snackBar.send({ message: 'Your invoice was successfully created', type: 'success' });
};
