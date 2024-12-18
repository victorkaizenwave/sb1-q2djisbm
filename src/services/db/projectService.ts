import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface Project {
  id?: string;
  name: string;
  company: string; // client ID
  due: string; // deadline
  owner: string; // team member ID
  projectTasks: string[];
  relatedNotes: string;
  status: 'active' | 'completed' | 'on-hold';
  value: number;
  createdAt: string;
}

export const projectsCollection = collection(db, 'projects');

export const addProject = async (project: Omit<Project, 'id'>) => {
  return await addDoc(projectsCollection, project);
};

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(projectsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getClientProjects = async (clientId: string): Promise<Project[]> => {
  const q = query(projectsCollection, where("company", "==", clientId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};