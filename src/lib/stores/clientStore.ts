import data from '../../seed.json';
import { writable } from 'svelte/store';
import type { Client } from '../../global';

export const clients = writable<Client[]>([]);
export const loadClients = () => {
  clients.set(data.clients as Client[]);
}
