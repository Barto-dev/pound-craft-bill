import { writable } from 'svelte/store';
import { loadAllClients } from '../../api/client';
import type { ClientType } from '../../types/DTM';

export const clients = writable<ClientType[]>([]);
export const loadClients = async () => {
  const data = await loadAllClients();
  if (data) {
    clients.set(data as ClientType[]);
  }
};

export const addClient = (client: ClientType) => {
  clients.update((prev) => {
    return [...prev, client];
  });
  return client;
};
