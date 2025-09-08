// src/monitoring.ts
import { onCLS, onINP, onLCP, onTTFB, type Metric } from 'web-vitals';

function reportMetric(metric: Metric) {
  console.log('[Web Vital]', metric.name, metric.value);
  // Opcional: enviar a un backend o a Datadog
  // fetch('/analytics', { method: 'POST', body: JSON.stringify(metric) });
}

// Mesures a la càrrega inicial
export function initWebVitals() {
  onCLS(reportMetric);
  onINP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
}
