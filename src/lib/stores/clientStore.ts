import data from '../../seed.json';
import { writable } from 'svelte/store';
import type { Client } from '../../global';

export const clients = writable<Client[]>([]);
export const loadClients = () => {
  clients.set(data.clients);
};

export const addClient = (client: Client) => {
  clients.update((prev) => {
    return [...prev, client];
  });
  return client;
}
