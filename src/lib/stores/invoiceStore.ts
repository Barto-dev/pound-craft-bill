import { writable } from 'svelte/store';
import {
  deleteInvoiceFromDatabase,
  insertInvoice,
  loadAllInvoices,
  loadInvoiceById,
  updateInvoiceInDatabase
} from '../../api/invoice';
import type { InvoiceType } from '../../types/DTM';

export const invoices = writable<InvoiceType[]>([]);

export const loadInvoices = async () => {
  const data = await loadAllInvoices();
  if (data) {
    invoices.set(data);
  }
};

export const addInvoice = async (
  invoice: InvoiceType,
) => {
  await insertInvoice(invoice);
  await loadInvoices();
};

export const updateInvoice = async (
  invoiceToUpdate: InvoiceType,
) => {
  await updateInvoiceInDatabase(invoiceToUpdate);
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
