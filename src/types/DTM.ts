import type { Database } from './supabase';

export type Row<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update'];

type ClientInvoice = Pick<Row<'invoice'>, 'id' | 'invoiceStatus'> & {
  lineItems: Row<'lineItems'>[];
};

export type InvoiceType = Row<'invoice'> & {
  client: Pick<Row<'client'>, 'name' | 'id'> | null;
  lineItems: Row<'lineItems'>[];
};

export type LineItemType = Row<'lineItems'>;
export type ClientType = Row<'client'> & {
  invoice: ClientInvoice[];
};