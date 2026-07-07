// Standard error reporting for localhost
export function reportError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  
  console.error("Error occurred:", {
    error,
    route: window.location.pathname,
    ...context,
  });
  
  // You can integrate with services like Sentry, LogRocket, etc. here
  // Example:
  // Sentry.captureException(error, { contexts: { custom: context } });
}
