import { writable } from 'svelte/store';
import { loadAllClients, createClient } from '../../api/client';
import type { ClientType } from '../../types/DTM';

export const clients = writable<ClientType[]>([]);
export const loadClients = async () => {
  const data = await loadAllClients();
  if (data) {
    clients.set(data as ClientType[]);
  }
};

export const addClient = async (client: ClientType) => {
  await createClient(client);
  await loadClients();
  return client;
};
