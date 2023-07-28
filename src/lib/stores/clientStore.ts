import { writable } from 'svelte/store';
import { loadAllClients, createClientInDatabase, updateClientInDatabase } from '../../api/client';
import type { ClientType } from '../../types/DTM';

export const clients = writable<ClientType[]>([]);
export const loadClients = async () => {
  const data = await loadAllClients();
  if (data) {
    clients.set(data as ClientType[]);
  }
};

export const createClient = async (client: ClientType) => {
  await createClientInDatabase(client);
  await loadClients();
};

export const updateClient = async (client: ClientType) => {
  await updateClientInDatabase(client);
  await loadClients();
};
