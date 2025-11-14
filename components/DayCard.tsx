
import React, { useState } from 'react';
import { ChevronDownIcon } from './icons';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DayCardProps {
  day: number;
  title: string;
  topic: string;
  Icon: React.ComponentType<{ className?: string }>;
  content: string;
}

export const DayCard: React.FC<DayCardProps> = ({ day, title, topic, Icon, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="border border-gray-700/50 rounded-lg shadow-md bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300 ease-in-out">
      <button 
        onClick={handleToggle}
        className="w-full p-5 text-left flex justify-between items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 bg-gray-700 p-3 rounded-full">
            <Icon className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sky-400">Day {day}</p>
            <h3 className="text-lg font-bold text-gray-100">{title}</h3>
          </div>
        </div>
        <ChevronDownIcon 
          className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      {isExpanded && (
        <div className="p-5 pt-0">
          <div className="border-t border-gray-700 pt-5">
            <MarkdownRenderer content={content} />
          </div>
        </div>
      )}
    </div>
  );
};
