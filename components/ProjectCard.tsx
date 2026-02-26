
import React from 'react';
import { Project } from '../types';
import { DynamicIcon } from './Icons';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5 transition-all hover:border-blue-500/30">
      <div className="aspect-video overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm line-clamp-2 mb-4">{project.description}</p>
        <a 
          href={project.link} 
          className="inline-flex items-center text-sm font-semibold text-white hover:underline gap-2"
        >
          View Case Study
          <DynamicIcon name="ExternalLink" className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
