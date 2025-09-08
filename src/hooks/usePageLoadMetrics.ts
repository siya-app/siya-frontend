import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function usePageLoadMetrics() {
  const location = useLocation();

  useEffect(() => {
    const start = performance.now();

    requestAnimationFrame(() => {
      const duration = performance.now() - start;
      console.log(`[SPA Metric] ${location.pathname} rendered in ${duration.toFixed(2)} ms`);
      // també podries enviar-ho a un backend o Datadog
    });
  }, [location]);
}
