
import React from 'react';
import { DayCard } from './components/DayCard';
import type { LearningDay } from './types';
import { PrometheusIcon, GraphIcon, AlertIcon, DashboardIcon, OperatorIcon, ScaleIcon, BestPracticesIcon } from './components/icons';

const learningPath: LearningDay[] = [
  { day: 1, title: 'Introduction to Prometheus', topic: 'Core Concepts, Architecture, and Data Model', icon: PrometheusIcon },
  { day: 2, title: 'Getting Started with PromQL', topic: 'Basic Queries, Selectors, and Operators', icon: GraphIcon },
  { day: 3, title: 'Advanced PromQL Functions', topic: 'Functions for Aggregation, Rates, and Predictions', icon: ScaleIcon },
  { day: 4, title: 'Alerting with Alertmanager', topic: 'Setting up Rules, Grouping, and Notifications', icon: AlertIcon },
  { day: 5, title: 'Dashboards & Visualization', topic: 'Connecting Grafana and building insightful dashboards', icon: DashboardIcon },
  { day: 6, title: 'Prometheus in Kubernetes', topic: 'Service Discovery and monitoring with the Prometheus Operator', icon: OperatorIcon },
  { day: 7, title: 'Scaling & Best Practices', topic: 'Federation, HA Setup, and effective instrumentation', icon: BestPracticesIcon },
];

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mb-4">
            <PrometheusIcon className="h-16 w-16 text-orange-500" />
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Prometheus & PromQL Mastery
            </h1>
          </div>
          <p className="text-lg text-gray-400">Your 7-day journey to becoming a monitoring expert, powered by AI.</p>
        </header>
        
        <div className="space-y-4">
          {learningPath.map((day) => (
            <DayCard 
              key={day.day} 
              day={day.day}
              title={day.title}
              topic={day.topic}
              Icon={day.icon}
            />
          ))}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Generated with Gemini API. All content is for educational purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
