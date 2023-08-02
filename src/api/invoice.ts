import { supabase } from './supabase';
import type { InvoiceType } from '../types/DTM';
import { displayError } from '$lib/utils/handleError';
import { snackBar } from '$lib/stores/snackBarStore';

export const loadAllInvoices = async () => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name, email, street, city, county, postCode), lineItems(*)');
  if (error) {
    console.error(error);
    return;
  }
  return data;
};

export const loadInvoiceById = async (id: string) => {
  const { data, error } = await supabase
    .from('invoice')
    .select('*, client(id, name, email, street, city, county, postCode), lineItems(*)')
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

const deleteLineItemsFromDatabase = async (invoiceId: string) => {
  const { error } = await supabase.from('lineItems').delete().eq('invoiceId', invoiceId);
  if (error) {
    displayError(error);
    return false;
  }
  return true;
};

const addLineItemsToDatabase = async (
  lineItems: InvoiceType['lineItems'],
  invoiceId: string,
  userId: string
) => {
  if (lineItems && lineItems.length) {
    const newLineItems = lineItems.map((lineItem) => {
      const newLineItem = { ...lineItem, invoiceId, userId };
      const { id, ...lineItemWithoutId } = newLineItem;
      return { ...lineItemWithoutId };
    });
    const lineItemResults = await supabase.from('lineItems').insert(newLineItems).select();
    if (lineItemResults.error) {
      displayError(lineItemResults.error);
      return false;
    }
  }
  return true;
};

export const insertInvoice = async (invoice: InvoiceType) => {
  const { lineItems, client, ...newInvoice } = invoice;
  // add invoice to supabase
  const invoiceResults = await supabase
    .from('invoice')
    .insert([{ ...newInvoice, clientId: client?.id }])
    .select();

  if (invoiceResults.error) {
    displayError(invoiceResults.error);
    return;
  }
  // get id of invoice
  const invoiceId = invoiceResults.data?.[0].id;
  // loop over all line items and add to them invoice id
  const isSuccessful = await addLineItemsToDatabase(lineItems, invoiceId, userId);
  if (!isSuccessful) {
    return;
  }
  snackBar.send({ message: 'Your invoice was successfully created', type: 'success' });
};

export const updateInvoiceInDatabase = async (invoice: InvoiceType, userId: string) => {
  const { client, lineItems, ...updateInvoice } = invoice;
  const isSuccessful = await deleteLineItemsFromDatabase(updateInvoice.id);
  if (!isSuccessful) {
    return;
  }
  // add new line items
  const isLineItemsAddedSuccessful = await addLineItemsToDatabase(
    lineItems,
    updateInvoice.id,
    userId
  );
  if (!isLineItemsAddedSuccessful) {
    return;
  }
  // update the invoice in supabase
  const { error } = await supabase
    .from('invoice')
    .update({ ...updateInvoice, userId, clientId: client?.id })
    .eq('id', updateInvoice.id);
  if (error) {
    displayError(error);
    return;
  }
  // display success message
  snackBar.send({ message: 'Your invoice was successfully updated', type: 'success' });
};

export const deleteInvoiceFromDatabase = async (invoiceId: string) => {
  // delete invoice from supabase
  const { error } = await supabase.from('invoice').delete().eq('id', invoiceId);
  if (error) {
    displayError(error);
    return;
  }
  snackBar.send({
    message: 'Your invoice was successfully deleted',
    type: 'success'
  });
};
