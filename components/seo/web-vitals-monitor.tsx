import Script from 'next/script';

export function WebVitalsMonitor() {
  return (
    <Script id="web-vitals-monitor" strategy="afterInteractive">
      {`
(function () {
  try {
    if (!('PerformanceObserver' in window)) return;

    const emit = function(metricName, metricValue) {
      if (window.gtag) {
        window.gtag('event', metricName, {
          value: Math.round(metricValue),
          metric_id: metricName,
          metric_value: metricValue,
          metric_delta: metricValue,
          non_interaction: true
        });
      }
    };

    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        emit('LCP', entry.startTime);
      });
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    let clsValue = 0;
    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      emit('CLS', clsValue * 1000);
    }).observe({ type: 'layout-shift', buffered: true });

    new PerformanceObserver(function(list) {
      list.getEntries().forEach(function(entry) {
        if (entry.interactionId) {
          emit('INP', entry.duration);
        }
      });
    }).observe({ type: 'event', buffered: true, durationThreshold: 40 });
  } catch (error) {
    console.error('WebVitals monitor failed', error);
  }
})();
      `}
    </Script>
  );
}
