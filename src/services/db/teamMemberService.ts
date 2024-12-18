import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface TeamMember {
  id?: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  active: boolean;
  events: string[];
  reportsTo: string;
  type: string;
  createdAt: string;
}

export const teamMembersCollection = collection(db, 'teamMembers');

export const addTeamMember = async (teamMember: Omit<TeamMember, 'id'>) => {
  return await addDoc(teamMembersCollection, teamMember);
};

export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const snapshot = await getDocs(teamMembersCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
};

export const getActiveTeamMembers = async (): Promise<TeamMember[]> => {
  const q = query(teamMembersCollection, where("active", "==", true));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
};