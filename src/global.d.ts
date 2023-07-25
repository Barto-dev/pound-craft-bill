import type { ClientStatus } from './enums';

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

interface ISettings {
  myName: string;
  email: string;
  street: string;
  city: string;
  county: string;
  zip: string;
}

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface ISnackbar {
  id: string;
  message: string;
  type: NotificationType;
}
