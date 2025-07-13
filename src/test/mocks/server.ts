import { handlers } from './handler';
// src/test/mocks/server.ts
import { setupServer } from "msw/node";

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers);

// Enable API mocking before tests
export const startServer = () => {
  server.listen({
    onUnhandledRequest: "error", // Fail tests on unhandled requests
  });
};

// Reset handlers after each test
export const resetServer = () => {
  server.resetHandlers();
};

// Stop API mocking after tests
export const stopServer = () => {
  server.close();
};

// Add custom handlers for specific tests
export const addHandlers = (...newHandlers: Parameters<typeof server.use>) => {
  server.use(...newHandlers);
};

// Server instance for direct access
export { server as default };
