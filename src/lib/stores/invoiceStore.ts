import { writable } from 'svelte/store';
import { loadAllInvoices, loadInvoiceById } from '$lib/utils/supabase';
import type { InvoiceType } from '../../types/DTM';

export const invoices = writable<InvoiceType[]>([]);

export const loadInvoices = async () => {
  const data = await loadAllInvoices();
  if (data) {
    invoices.set(data);
  }
};

export const addInvoice = (invoice: InvoiceType) => {
  invoices.update((prev) => {
    return [...prev, invoice];
  });
  return invoice;
};

export const updateInvoice = (invoiceToUpdate: InvoiceType) => {
  invoices.update((prev) => {
    return prev.map((invoice) => {
      if (invoice.id === invoiceToUpdate.id) {
        return invoiceToUpdate;
      }
      return invoice;
    });
  });
  return invoiceToUpdate;
};

export const deleteInvoice = (invoiceToDelete: InvoiceType) => {
  invoices.update((prev) => {
    return prev.filter((invoice) => invoice.id !== invoiceToDelete.id);
  });
  // to use this data after successful delete
  return invoiceToDelete;
};

export const getInvoiceById = async (id: string) => {
  const data = await loadInvoiceById(id);
  if (data) {
    return data;
  }
};
