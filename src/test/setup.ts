import "@testing-library/jest-dom";
import { beforeAll, afterEach, afterAll, vi, expect } from "vitest";
import { startServer, resetServer, stopServer } from "./mocks/server";

// Establish API mocking before all tests
beforeAll(() => {
  startServer();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  resetServer();
  vi.clearAllMocks();
});

// Clean up after the tests are finished
afterAll(() => {
  stopServer();
});

// Mock console methods for cleaner test output during development
const originalConsoleLog = console.log;
const originalConsoleWarn = console.warn;
const originalConsoleError = console.error;

beforeAll(() => {
  // Suppress console.log in tests unless explicitly needed
  console.log = vi.fn();
  console.warn = vi.fn();
  // Keep console.error for important debugging
  console.error = (...args) => {
    if (!args[0]?.includes?.("Warning: validateDOMNesting")) {
      originalConsoleError(...args);
    }
  };
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.warn = originalConsoleWarn;
  console.error = originalConsoleError;
});

// Mock fetch for tests that don't use MSW
window.fetch = vi.fn();

// Mock IntersectionObserver
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock ResizeObserver
Object.defineProperty(globalThis, "ResizeObserver", {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: vi.fn(),
});

// Extend expect with custom matchers
expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () =>
          `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});
