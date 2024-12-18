import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export interface Task {
  id?: string;
  name: string;
  customer: string; // client ID
  due: string; // task deadline
  assignTo: string; // team member ID
  project: string; // project ID
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
}

export const tasksCollection = collection(db, 'tasks');

export const addTask = async (task: Omit<Task, 'id'>) => {
  return await addDoc(tasksCollection, task);
};

export const getTasks = async (): Promise<Task[]> => {
  const snapshot = await getDocs(tasksCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const getProjectTasks = async (projectId: string): Promise<Task[]> => {
  const q = query(tasksCollection, where("project", "==", projectId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const getCreatorTasks = async (creatorId: string): Promise<Task[]> => {
  const q = query(tasksCollection, where("assignTo", "==", creatorId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};