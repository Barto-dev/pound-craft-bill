import { writable } from 'svelte/store';
import {
  deleteInvoiceFromDatabase,
  insertInvoice,
  loadAllInvoices,
  loadInvoiceById,
  updateInvoiceInDatabase
} from '../../api/invoice';
import type { InvoiceType } from '../../types/DTM';
import { snackBar } from '$lib/stores/snackBarStore';

export const invoices = writable<InvoiceType[]>([]);

export const loadInvoices = async () => {
  const data = await loadAllInvoices();
  if (data) {
    invoices.set(data);
  }
};

export const addInvoice = async (
  invoice: InvoiceType,
  userId: string = '7c6166b5-6d09-4545-b8fb-8c606c98a6ea'
) => {
  await insertInvoice(invoice, userId);
  await loadInvoices();
};

export const updateInvoice = async (
  invoiceToUpdate: InvoiceType,
  userId: string = '7c6166b5-6d09-4545-b8fb-8c606c98a6ea'
) => {
  await updateInvoiceInDatabase(invoiceToUpdate, userId);
  await loadInvoices();
};

export const getInvoiceById = async (id: string) => {
  const data = await loadInvoiceById(id);
  if (data) {
    return data;
  }
};
export const deleteInvoice = async (invoiceId: string) => {
  await deleteInvoiceFromDatabase(invoiceId);
  await loadInvoices();
};
