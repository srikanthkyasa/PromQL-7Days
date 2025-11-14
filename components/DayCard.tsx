
import React, { useState, useCallback } from 'react';
import { generateLearningContent } from '../services/geminiService';
import { ChevronDownIcon, LoadingSpinner } from './icons';
import { MarkdownRenderer } from './MarkdownRenderer';

interface DayCardProps {
  day: number;
  title: string;
  topic: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const DayCard: React.FC<DayCardProps> = ({ day, title, topic, Icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleToggle = useCallback(async () => {
    // Immediately toggle expansion state
    setIsExpanded(prev => !prev);

    // Fetch content only if it's the first time opening and content is not already loaded
    if (!isExpanded && !content && !isLoading) {
      setIsLoading(true);
      setError(null);
      try {
        const generatedContent = await generateLearningContent(topic);
        setContent(generatedContent);
      } catch (err) {
        setError('Failed to generate content. Please try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isExpanded, content, isLoading, topic]);

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
            {isLoading && (
              <div className="flex items-center justify-center space-x-3 text-gray-400">
                <LoadingSpinner className="w-6 h-6" />
                <span>Generating your lesson plan...</span>
              </div>
            )}
            {error && <p className="text-red-400 text-center">{error}</p>}
            {content && <MarkdownRenderer content={content} />}
          </div>
        </div>
      )}
    </div>
  );
};
