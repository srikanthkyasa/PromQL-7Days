
import React from 'react';
import { DayCard } from './components/DayCard';
import { PrometheusIcon, GraphIcon, AlertIcon, DashboardIcon, OperatorIcon, ScaleIcon, BestPracticesIcon } from './components/icons';

const learningPath = [
  { 
    day: 1, 
    title: 'Introduction to Prometheus', 
    topic: 'Core Concepts, Architecture, and Data Model', 
    icon: PrometheusIcon,
    content: `## 🎯 Overview
Welcome to Day 1! Today, we'll dive into the fundamentals of Prometheus. You'll learn what it is, its core architecture, and how it stores data. This foundation is crucial for everything that follows.

## 📚 Key Concepts
*   **Time Series Data:** Prometheus collects metrics, which are streams of timestamped values belonging to the same metric and the same set of labeled dimensions.
*   **Pull Model:** Prometheus scrapes (pulls) metrics from instrumented jobs, either directly or via an intermediary push gateway for short-lived jobs.
*   **Exporters:** These are helper applications that expose metrics from third-party systems (like databases or hardware) in a Prometheus-compatible format.
*   **PromQL:** Prometheus has its own powerful query language called PromQL (Prometheus Query Language) that lets you select and aggregate time series data in real time.
*   **Architecture:** The main components are the Prometheus server (which scrapes and stores data), client libraries, a push gateway, exporters, and the Alertmanager.

## ⌨️ PromQL Examples
\`\`\`promql
# Check which monitored services are up and running (1 = up, 0 = down)
up
\`\`\`
\`\`\`promql
# Get the total number of HTTP requests for a specific job
http_requests_total{job="api-server"}
\`\`\`
\`\`\`promql
# Get the memory usage in bytes for all instances
node_memory_MemAvailable_bytes
\`\`\`

## 🏋️‍♂️ Daily Challenge
Your mission, should you choose to accept it:
1.  Install Prometheus on your local machine using Docker or by downloading the binary.
2.  Configure Prometheus to scrape its own metrics.
3.  Go to the Prometheus UI (usually at \`http://localhost:9090\`) and run the \`up\` query to verify it's working.`
  },
  { 
    day: 2, 
    title: 'Getting Started with PromQL', 
    topic: 'Basic Queries, Selectors, and Operators', 
    icon: GraphIcon,
    content: `## 🎯 Overview
Day 2 is all about getting hands-on with PromQL, the Prometheus Query Language. You'll learn how to select specific time series, filter them using labels, and use basic operators to start making sense of your data.

## 📚 Key Concepts
*   **Instant Vector Selectors:** Return a set of time series with a single value for each at the current timestamp. Example: \`http_requests_total\`.
*   **Range Vector Selectors:** Return a set of time series with a range of data points over time for each series. Example: \`http_requests_total[5m]\`.
*   **Filtering with Labels:** Use curly braces \`{}\` to filter time series by labels. You can use operators like \`=\` (equals), \`!=\` (not equals), \`=~\` (regex match), and \`!~\` (not regex match).
*   **Operators:** PromQL supports arithmetic (\`+\`, \`-\`, \`*\`, \`/\`), comparison (\`==\`, \`!=\`, \`>\`, \`<\`), and logical (\`and\`, \`or\`, \`unless\`) operators.

## ⌨️ PromQL Examples
\`\`\`promql
# Select all HTTP requests for the "api-server" job with a "200" status code.
http_requests_total{job="api-server", code="200"}
\`\`\`
\`\`\`promql
# Calculate the total number of requests across all instances of the "api-server" job.
sum(http_requests_total{job="api-server"})
\`\`\`
\`\`\`promql
# Get all failed requests (status codes starting with 5).
http_requests_total{code=~"5.."}
\`\`\`

## 🏋️‍♂️ Daily Challenge
Using the Prometheus UI, write PromQL queries to answer the following questions:
1.  How many time series exist for the metric \`prometheus_http_requests_total\`? (Hint: use \`count()\`)
2.  Find the available memory (\`node_memory_MemAvailable_bytes\`) for all instances EXCEPT a specific one.
3.  Calculate the ratio of failed requests (\`code="500"\`) to total requests for a job.`
  },
  { 
    day: 3, 
    title: 'Advanced PromQL Functions', 
    topic: 'Functions for Aggregation, Rates, and Predictions', 
    icon: ScaleIcon,
    content: `## 🎯 Overview
Ready to level up your PromQL skills? Today we explore some of the most powerful functions in PromQL. These functions allow you to calculate rates, deltas, and perform advanced aggregations, turning raw metrics into actionable insights.

## 📚 Key Concepts
*   **\`rate(v range-vector)\`:** Calculates the per-second average rate of increase of a counter. It's the most common function for counters.
*   **\`increase(v range-vector)\`:** Calculates the total increase of a counter over the specified time range. Useful for knowing "how many" events happened in a period.
*   **\`sum()\` and \`avg()\`:** Aggregation operators that sum up or average values across different time series. Can be used with a \`by()\` or \`without()\` clause to preserve certain labels.
*   **\`histogram_quantile(φ float, b instant-vector)\`:** Calculates the φ-quantile (0 ≤ φ ≤ 1) from the buckets of a histogram. This is essential for calculating things like 95th or 99th percentile latencies.

## ⌨️ PromQL Examples
\`\`\`promql
# Calculate the per-second rate of HTTP requests over the last 5 minutes.
rate(http_requests_total[5m])
\`\`\`
\`\`\`promql
# Calculate the 95th percentile latency for API requests over the last 10 minutes.
histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[10m])) by (le))
\`\`\`
\`\`\`promql
# Calculate the average CPU usage percentage by instance.
avg(instance:cpu_usage_percentage) by (instance)
\`\`\`

## 🏋️‍♂️ Daily Challenge
1.  Write a query to calculate the average request rate over the last 10 minutes for each HTTP method (GET, POST, etc.).
2.  Imagine you have a metric \`rpc_calls_total\`. How would you find the total number of RPC calls that occurred in the last hour?
3.  Explain the difference between \`sum(rate(errors_total[5m]))\` and \`rate(sum(errors_total)[5m])\`. Which one is correct and why?`
  },
  { 
    day: 4, 
    title: 'Alerting with Alertmanager', 
    topic: 'Setting up Rules, Grouping, and Notifications', 
    icon: AlertIcon,
    content: `## 🎯 Overview
Collecting metrics is only half the battle. Today, we'll learn how to use Prometheus to alert us when things go wrong. We'll cover writing alerting rules and configuring the Alertmanager to handle, group, and route notifications effectively.

## 📚 Key Concepts
*   **Alerting Rules:** These are defined in Prometheus configuration files. They consist of a PromQL expression that is evaluated at regular intervals. If the expression returns any time series, the alert is considered "firing".
*   **Alertmanager:** A separate component that handles alerts sent by Prometheus servers. It takes care of deduplicating, grouping, and routing them to the correct receiver integration (like email, Slack, or PagerDuty).
*   **Grouping:** Alertmanager groups alerts of a similar nature into a single notification. This prevents alert storms. For example, grouping by \`cluster\` and \`alertname\`.
*   **Silences & Inhibitions:** Silences allow you to temporarily mute alerts for a specific time. Inhibitions are rules that suppress certain alerts if other specific alerts are already firing.

## ⌨️ PromQL Examples
\`\`\`promql
# Alerting rule: Fire an alert if an instance has been down for more than 5 minutes.
- alert: InstanceDown
  expr: up == 0
  for: 5m
  labels:
    severity: page
  annotations:
    summary: "Instance {{ $labels.instance }} down"
    description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 5 minutes."
\`\`\`
\`\`\`promql
# Alerting rule: Fire if CPU usage is over 80%.
- alert: HighCpuUsage
  expr: 100 * (1 - avg(rate(node_cpu_seconds_total{mode="idle"}[2m])) by (instance)) > 80
  for: 10m
  labels:
    severity: warning
\`\`\`

## 🏋️‍♂️ Daily Challenge
1.  Write an alerting rule that fires if a disk is predicted to run out of space in the next 24 hours. (Hint: use \`predict_linear()\`).
2.  In an Alertmanager configuration, set up a route that sends alerts with \`severity="critical"\` to a PagerDuty receiver and all other alerts to a Slack receiver.
3.  Why is the \`for\` clause in an alerting rule important?`
  },
  { 
    day: 5, 
    title: 'Dashboards & Visualization', 
    topic: 'Connecting Grafana and building insightful dashboards', 
    icon: DashboardIcon,
    content: `## 🎯 Overview
Metrics are most powerful when you can visualize them. Today's focus is on building insightful dashboards. We'll use Grafana, the most popular open-source tool for visualizing Prometheus data, to turn our PromQL queries into meaningful graphs and panels.

## 📚 Key Concepts
*   **Grafana:** A visualization and analytics platform that connects to various data sources, including Prometheus.
*   **Data Source:** You first need to configure Prometheus as a data source in Grafana, pointing it to your Prometheus server's URL.
*   **Dashboard:** A collection of panels arranged in a grid. Each dashboard typically focuses on monitoring a specific service or system.
*   **Panel:** A single visualization within a dashboard (e.g., a graph, a single stat, a gauge, or a table). Each panel is powered by one or more PromQL queries.
*   **Variables:** Grafana allows you to create template variables, which act as dynamic filters on your dashboards. For example, you could have a variable to switch between different jobs or instances.

## ⌨️ PromQL Examples
\`\`\`promql
# Query for a time series graph showing CPU usage. The $__rate_interval is a Grafana variable.
100 * (1 - avg(rate(node_cpu_seconds_total{mode="idle", instance="$instance"}[$__rate_interval])) by (instance))
\`\`\`
\`\`\`promql
# Query for a "Single Stat" panel showing the current number of up instances.
sum(up{job="$job"})
\`\`\`
\`\`\`promql
# Query for a table panel showing the top 5 memory-consuming instances.
topk(5, node_memory_Active_bytes)
\`\`\`

## 🏋️‍♂️ Daily Challenge
1.  Install Grafana and connect it to your Prometheus data source.
2.  Create a new dashboard.
3.  Add a "Time series" panel that shows the per-second rate of requests (\`http_requests_total\`) over time.
4.  Add a "Stat" panel that shows the total number of errors (\`errors_total\`).
5.  (Bonus) Create a dashboard variable that lets you filter by \`job\`.`
  },
  { 
    day: 6, 
    title: 'Prometheus in Kubernetes', 
    topic: 'Service Discovery and monitoring with the Prometheus Operator', 
    icon: OperatorIcon,
    content: `## 🎯 Overview
Kubernetes has become the standard for container orchestration, and monitoring it is critical. Today, we'll explore how to effectively monitor a Kubernetes cluster using Prometheus, focusing on service discovery and the powerful Prometheus Operator.

## 📚 Key Concepts
*   **Service Discovery:** Prometheus can dynamically discover targets to scrape in a Kubernetes environment. It can find pods, services, endpoints, ingresses, and nodes. This eliminates the need for static configuration.
*   **Prometheus Operator:** This operator simplifies the deployment and management of Prometheus, Alertmanager, and related monitoring components on Kubernetes.
*   **Custom Resource Definitions (CRDs):** The Prometheus Operator introduces CRDs like \`ServiceMonitor\`, \`PodMonitor\`, and \`PrometheusRule\` to declaratively manage scraping configurations and alerting rules as Kubernetes objects.
*   **\`kube-state-metrics\`:** A service that listens to the Kubernetes API server and generates metrics about the state of the objects (e.g., deployments, pods, daemonsets).

## ⌨️ PromQL Examples
\`\`\`promql
# Get the number of pods in a "CrashLoopBackOff" state.
kube_pod_container_status_waiting_reason{reason="CrashLoopBackOff"} == 1
\`\`\`
\`\`\`promql
# Calculate CPU usage for each pod.
sum(rate(container_cpu_usage_seconds_total{image!=""}[5m])) by (pod)
\`\`\`
\`\`\`promql
# Get the number of ready pods for each deployment.
kube_deployment_status_replicas_available
\`\`\`

## 🏋️‍♂️ Daily Challenge
1.  Install the Prometheus Operator in a local Kubernetes cluster (like minikube or kind).
2.  Deploy a sample application that exposes metrics.
3.  Create a \`ServiceMonitor\` object that tells Prometheus to start scraping your sample application's metrics endpoint.
4.  Verify in the Prometheus UI that the new targets are being scraped successfully.`
  },
  { 
    day: 7, 
    title: 'Scaling & Best Practices', 
    topic: 'Federation, HA Setup, and effective instrumentation', 
    icon: BestPracticesIcon,
    content: `## 🎯 Overview
Congratulations on making it to the final day! Today we'll discuss advanced topics for running Prometheus in large-scale production environments. We'll cover scaling strategies, high availability, and best practices for instrumenting your own applications.

## 📚 Key Concepts
*   **Federation:** A hierarchical approach where a central Prometheus server scrapes aggregated time series data from other "leaf" Prometheus servers. Useful for scaling across clusters or data centers.
*   **High Availability (HA):** Running two or more identical Prometheus servers that scrape the same targets. Alerts are sent to a shared Alertmanager cluster to handle deduplication.
*   **Remote Storage:** For long-term storage and global query view, Prometheus can write its data to remote endpoints. Popular open-source solutions include Thanos and Cortex.
*   **Instrumentation Best Practices:**
    *   **Use the right metric type:** Use Counters for things that only go up, Gauges for values that can go up and down, Histograms for latencies, and Summaries for percentile observations.
    *   **Keep cardinality in mind:** Avoid using labels with high-cardinality values (like user IDs or request IDs) as it can overload Prometheus.
    *   **Expose a \`/metrics\` endpoint:** This is the standard path for Prometheus to scrape.

## ⌨️ PromQL Examples
\`\`\`promql
# On a federation server, you might query metrics that have been aggregated at the source.
# This query is the same, but the data represents a wider scope.
sum(rate(http_requests_total[5m])) by (cluster)
\`\`\`
\`\`\`promql
# Check if both of your HA Prometheus replicas are scraping a specific target.
count(up{job="api-server"}) by (instance) == 2
\`\`\`

## 🏋️‍♂️ Daily Challenge
1.  Design a high-level architecture diagram for monitoring three Kubernetes clusters located in different geographic regions. Your design should include HA, long-term storage, and a global view for dashboards.
2.  Review a sample application's code. Identify 3 key metrics you would add for monitoring its performance and reliability. For each, specify the metric type (Counter, Gauge, etc.) and the labels you would include.
3.  Explain the pros and cons of Federation vs. a Remote Storage solution like Thanos.`
  },
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
          <p className="text-lg text-gray-400">Your 7-day journey to becoming a monitoring expert.</p>
        </header>
        
        <div className="space-y-4">
          {learningPath.map((day) => (
            <DayCard 
              key={day.day} 
              day={day.day}
              title={day.title}
              topic={day.topic}
              Icon={day.icon}
              content={day.content}
            />
          ))}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Content is for educational purposes.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
