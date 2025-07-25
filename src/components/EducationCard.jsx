import React from "react";
import { FaUniversity } from "react-icons/fa";

const EducationCard = React.memo(({ education }) => {
  // Safe guard against undefined or null education
  if (!education) {
    return (
      <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-indigo-900/70 border border-gray-700 rounded-2xl shadow-lg p-4 flex items-center justify-center">
        <span className="text-gray-400">Education data unavailable</span>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-black/80 via-gray-900/80 to-indigo-900/70 border border-gray-700 rounded-2xl shadow-lg p-0 flex flex-col overflow-hidden hover:border-indigo-400 transition-all group">
      <div className="flex items-start gap-3 px-5 pt-5 pb-2">
        <div className="flex-shrink-0 mt-1">
          <FaUniversity className="text-indigo-400 w-6 h-6" />
        </div>
        <span className="font-bold text-lg text-indigo-200 group-hover:text-yellow-200 transition-colors flex-1 leading-tight">
          {education?.degree || "Unknown Degree"}
        </span>
      </div>
      <div className="flex flex-col gap-2 px-5 pb-5 flex-1">
        <span className="text-gray-400 text-sm font-semibold mb-1">
          {education?.institution || "Unknown Institution"}
        </span>
        <span className="text-gray-500 text-xs mb-2">
          {education?.start_year || "----"} - {education?.end_year || "Present"}
        </span>
        {education?.description && (
          <span className="text-gray-300 text-xs leading-relaxed line-clamp-4">
            {education.description}
          </span>
        )}
      </div>
    </div>
  );
});

export default EducationCard;
