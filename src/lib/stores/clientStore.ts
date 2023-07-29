import { writable } from 'svelte/store';
import {
  loadAllClients,
  createClientInDatabase,
  updateClientInDatabase,
  deleteClientFromDatabase
} from '../../api/client';
import type { ClientType } from '../../types/DTM';

export const clients = writable<ClientType[]>([]);
export const loadClients = async () => {
  const data = await loadAllClients();
  if (data) {
    clients.set(data as ClientType[]);
  }
};

export const createClient = async (client: ClientType) => {
  const data = await createClientInDatabase(client);
  await loadClients();
  return data?.[0];
};

export const updateClient = async (client: ClientType) => {
  await updateClientInDatabase(client);
  await loadClients();
};

export const deleteClient = async (id: string) => {
  await deleteClientFromDatabase(id);
  await loadClients();
};
