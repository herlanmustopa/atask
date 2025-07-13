// src/test/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers } from "./handler";

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(...handlers);

// Start the worker (for browser environment)
export const startWorker = async () => {
  if (typeof window !== "undefined") {
    await worker.start({
      onUnhandledRequest: "warn",
    });
  }
};

// Stop the worker
export const stopWorker = () => {
  if (typeof window !== "undefined") {
    worker.stop();
  }
};

// Add custom handlers for specific scenarios
export const addHandlers = (...newHandlers: Parameters<typeof worker.use>) => {
  worker.use(...newHandlers);
};

// Reset handlers
export const resetHandlers = () => {
  worker.resetHandlers();
};

export { worker as default };
