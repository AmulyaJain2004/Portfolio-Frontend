import React, { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaImage, FaChevronDown, FaChevronUp } from "react-icons/fa";

const DEFAULT_IMAGE = "https://via.placeholder.com/400x200?text=Project";

const ProjectCard = React.memo(({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Check if description is long enough to need truncation
  const shouldTruncate = project?.description && project.description.length > 150;
  // Safe guard against undefined or null project
  if (!project) {
    return (
      <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-indigo-900/70 border border-gray-700 rounded-2xl shadow-lg p-4 flex items-center justify-center">
        <span className="text-gray-400">Project data unavailable</span>
      </div>
    );
  }

  return (
    <div
      className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-indigo-900/70 border border-gray-700 rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden hover:border-indigo-400 transition-all group"
      role="region"
      tabIndex={0}
      aria-label={`Project card: ${project?.title || "Untitled Project"}`}
    >
      {/* Project Image */}
      <div className="w-full h-44 bg-gray-900 flex items-center justify-center overflow-hidden relative">
        {project?.image ? (
          <img
            src={project.image}
            alt={project?.title || "Project image"}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-700">
            <FaImage size={48} className="mb-2" />
            <span className="text-xs">No Image</span>
          </div>
        )}
        {/* Optional: Featured badge */}
        {project?.featured && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
            Featured
          </span>
        )}
      </div>
      {/* Card Content */}
      <div className="flex flex-col gap-3 p-5">
        <h3 className="text-xl font-extrabold text-indigo-200 mb-1 group-hover:text-yellow-200 transition-colors">
          {project?.title || "Untitled Project"}
        </h3>
        
        {/* Description with expandable functionality */}
        <div className="text-gray-300 text-sm leading-relaxed flex-1">
          <p className={!isExpanded && shouldTruncate ? "line-clamp-3" : ""}>
            {project?.description || "No description available"}
          </p>
          
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-indigo-400 hover:text-yellow-200 text-xs font-medium mt-2 flex items-center gap-1 transition-colors"
              aria-expanded={isExpanded}
              aria-label={isExpanded ? "Show less description" : "Show more description"}
            >
              {isExpanded ? (
                <>
                  <span>Show Less</span>
                  <FaChevronUp size={12} />
                </>
              ) : (
                <>
                  <span>More...</span>
                  <FaChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
        {project?.tech_stack && (
          <div className="flex flex-wrap gap-2 mt-2">
            {project.tech_stack.split(",").map((tech, idx) => (
              <span
                key={idx}
                className="bg-indigo-900/60 border border-indigo-400 text-indigo-200 px-3 py-1 rounded-full text-xs font-semibold shadow-sm hover:bg-indigo-700/80 hover:text-yellow-200 transition-colors"
              >
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
        <div className="flex gap-4 mt-3">
          {project?.github_link && (
            <a
              href={project.github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-indigo-400 hover:scale-110 transition-transform"
              title="GitHub"
              aria-label={`GitHub repository for ${
                project?.title || "this project"
              }`}
            >
              <FaGithub size={20} />
              <span className="text-xs font-medium hidden sm:inline">
                GitHub
              </span>
            </a>
          )}
          {project?.demo_link && (
            <a
              href={project.demo_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-yellow-200 hover:scale-110 transition-transform"
              title="Live Demo"
              aria-label={`Live demo for ${project?.title || "this project"}`}
            >
              <FaExternalLinkAlt size={20} />
              <span className="text-xs font-medium hidden sm:inline">
                Live Demo
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

export default ProjectCard;
