import { ReactElement } from "react";
import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,
  getByRole,
  getByText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByTestId,
  findByRole,
  findByText,
  findByTestId,
} from "@testing-library/dom";
import {
  render as rtlRender,
  RenderOptions,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

// Custom render function that includes providers if needed
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => {
  return {
    user: userEvent.setup(),
    ...rtlRender(ui, options),
  };
};

// Export specific functions to avoid conflicts
export {
  // Core testing utilities
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  within,

  // Query functions
  getByRole,
  getByText,
  getByTestId,
  queryByRole,
  queryByText,
  queryByTestId,
  findByRole,
  findByText,
  findByTestId,

  // Custom render
  customRender as render,

  // User event
  userEvent,
};

// Re-export types
export type { RenderOptions };

// Custom matchers for common assertions
export const waitForApiCall = (timeout = 1000) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

// Helper to simulate user typing with debounce
export const typeWithDelay = async (
  user: ReturnType<typeof userEvent.setup>,
  input: HTMLElement,
  text: string
) => {
  await user.clear(input);
  await user.type(input, text);
  // Wait for debounce
  await new Promise((resolve) => setTimeout(resolve, 350));
};

// Helper to wait for element to appear
export const waitForElement = async (
  getElement: () => HTMLElement | null,
  timeout = 5000
) => {
  const start = Date.now();

  while (Date.now() - start < timeout) {
    const element = getElement();
    if (element) return element;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error(`Element not found within ${timeout}ms`);
};

// Mock console methods for testing
export const mockConsole = () => {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  const logs: string[] = [];
  const warnings: string[] = [];
  const errors: string[] = [];

  console.log = (message: string) => logs.push(message);
  console.warn = (message: string) => warnings.push(message);
  console.error = (message: string) => errors.push(message);

  const restore = () => {
    console.log = originalLog;
    console.warn = originalWarn;
    console.error = originalError;
  };

  return { logs, warnings, errors, restore };
};

// Helper to test loading states
export const expectLoadingState = (container: HTMLElement) => {
  expect(container.querySelector(".spin")).toBeInTheDocument();
};

// Helper to test error states
export const expectErrorState = (
  container: HTMLElement,
  errorMessage?: string
) => {
  const errorElement = container.querySelector('[class*="error"]');
  expect(errorElement).toBeInTheDocument();

  if (errorMessage) {
    expect(errorElement).toHaveTextContent(errorMessage);
  }
};

// Helper to test empty states
export const expectEmptyState = (
  container: HTMLElement,
  emptyMessage?: string
) => {
  const emptyElement = container.querySelector(".empty-state");
  expect(emptyElement).toBeInTheDocument();

  if (emptyMessage) {
    expect(emptyElement).toHaveTextContent(emptyMessage);
  }
};

// Helper for testing accessibility
export const testAccessibility = {
  hasProperLabels: (element: HTMLElement) => {
    const inputs = element.querySelectorAll("input");
    inputs.forEach((input) => {
      expect(input).toHaveAttribute("placeholder");
    });
  },

  hasKeyboardSupport: async (
    user: ReturnType<typeof userEvent.setup>,
    element: HTMLElement
  ) => {
    await user.tab();
    expect(element).toHaveFocus();
  },

  hasProperAriaLabels: (element: HTMLElement) => {
    const interactive = element.querySelectorAll("button, input, a");
    interactive.forEach((el) => {
      expect(el).toHaveAttribute("aria-label");
    });
  },
};

// Mock IntersectionObserver for components that use it
export const mockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });

  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

// Helper to test responsive behavior
export const testResponsive = {
  mobile: () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 375,
    });
    window.dispatchEvent(new Event("resize"));
  },

  tablet: () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 768,
    });
    window.dispatchEvent(new Event("resize"));
  },

  desktop: () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    window.dispatchEvent(new Event("resize"));
  },
};
