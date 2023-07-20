import type { InvoiceStatus, ClientStatus } from './enums';

interface ILineItem {
  amount: number;
  description: string;
  id: string;
  quantity: number;
}

interface Client {
  city?: string;
  clientStatus?: ClientStatus;
  email: string;
  id: string;
  name: string;
  state?: string;
  street?: string;
  zip?: string;
}

interface Invoice {
  client: Client;
  createdAt: string;
  discount?: string;
  dueDate: string;
  id: string;
  invoiceNumber: string;
  invoiceStatus: InvoiceStatus;
  issueDate: string;
  lineItems?: ILineItem[];
  notes?: string;
  subject?: string;
  terms?: string;
}
