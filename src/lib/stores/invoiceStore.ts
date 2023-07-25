import { writable } from 'svelte/store';
import type { Invoice } from '../../global';
import data from '../../seed.json';
import { loadAllInvoices } from '$lib/utils/supabase';
import type { InvoiceType } from '$lib/utils/supabase';

export const invoices = writable<InvoiceType[]>([]);

export const loadInvoices = async () => {
  const data = await loadAllInvoices();
  console.log(data);
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

export const deleteInvoice = (invoiceToDelete: Invoice) => {
  invoices.update((prev) => {
    return prev.filter((invoice) => invoice.id !== invoiceToDelete.id);
  });
  // to use this data after successful delete
  return invoiceToDelete;
};

export const getInvoiceById = (id: string) => {
  return data.invoices.find((invoice) => invoice.id === id);
};
