import React, { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { getCreatorTasks, Task } from '../services/db/taskService';
import { getProjects, Project } from '../services/db/projectService';
import { CreatorTaskCard } from '../components/creator/CreatorTaskCard';
import { PlusCircle } from 'lucide-react';

const CreatorView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Record<string, Project>>({});
  const { selectedCreator } = useStore();

  useEffect(() => {
    const fetchData = async () => {
      if (selectedCreator) {
        const [tasksData, projectsData] = await Promise.all([
          getCreatorTasks(selectedCreator),
          getProjects()
        ]);
        
        setTasks(tasksData);
        const projectsMap = projectsData.reduce((acc, project) => {
          acc[project.id!] = project;
          return acc;
        }, {} as Record<string, Project>);
        setProjects(projectsMap);
      }
    };
    
    fetchData();
  }, [selectedCreator]);

  if (!selectedCreator) {
    return (
      <div className="text-center text-gray-600 mt-8">
        Please select a team member from the landing page to view their tasks.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Tasks</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <PlusCircle size={20} />
          <span>Add Task</span>
        </button>
      </div>
      
      {tasks.length === 0 ? (
        <div className="text-center text-gray-600 mt-8">
          No tasks assigned to this team member.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {tasks.map((task) => (
            <CreatorTaskCard
              key={task.id}
              task={task}
              project={projects[task.project]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CreatorView;