
import React from 'react';

export interface LearningDay {
  day: number;
  title: string;
  topic: string;
  icon: React.ComponentType<{ className?: string }>;
}
