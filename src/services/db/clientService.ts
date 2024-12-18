import { collection, addDoc, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface Client {
  id?: string;
  company: string;
  pointOfContact: string;
  email: string;
  phone: string;
  website: string;
  category: 'Branding' | 'Social Media' | 'Website' | 'SEO' | 'Photography' | 'Other';
  outreachStatus: 'Lead' | 'In Contact' | 'Proposal Sent' | 'Signed';
  notes: string;
  createdAt: string;
}

export const clientsCollection = collection(db, 'clients');

export const addClient = async (client: Omit<Client, 'id'>) => {
  return await addDoc(clientsCollection, {
    ...client,
    createdAt: new Date().toISOString()
  });
};

export const getClients = async (): Promise<Client[]> => {
  const snapshot = await getDocs(clientsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
};