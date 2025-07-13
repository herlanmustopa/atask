import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../utils";
import SearchForm  from "../../../components/search";

describe("SearchForm", () => {
  const defaultProps = {
    query: "",
    onQueryChange: vi.fn(),
    onSearch: vi.fn(),
    loading: false,
  };

  it("renders search input and button", () => {
    render(<SearchForm {...defaultProps} />);

    expect(
      screen.getByPlaceholderText(/enter github username/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls onQueryChange when typing", async () => {
    const mockOnQueryChange = vi.fn();
    const { user } = render(
      <SearchForm {...defaultProps} onQueryChange={mockOnQueryChange} />
    );

    const input = screen.getByPlaceholderText(/enter github username/i);
    await user.type(input, "testuser");

    expect(mockOnQueryChange).toHaveBeenCalledTimes(8); // 't', 'e', 's', 't', 'u', 's', 'e', 'r'
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(1, "t");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(2, "e");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(3, "s");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(4, "t");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(5, "u");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(6, "s");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(7, "e");
    expect(mockOnQueryChange).toHaveBeenNthCalledWith(8, "r");
    // ... and so on
    // expect(mockOnQueryChange).toHaveBeenNthCalledWith(8, "testuser");

    // OR just check the last call:
    // expect(mockOnQueryChange).toHaveBeenLastCalledWith("testuser");
  });

  it("calls onSearch when button clicked", async () => {
    const mockOnSearch = vi.fn();
    const { user } = render(
      <SearchForm {...defaultProps} query="testuser" onSearch={mockOnSearch} />
    );

    await user.click(screen.getByRole("button", { name: /search/i }));
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it("calls onSearch when Enter key pressed", async () => {
    const mockOnSearch = vi.fn();
    const { user } = render(
      <SearchForm {...defaultProps} query="testuser" onSearch={mockOnSearch} />
    );

    const input = screen.getByPlaceholderText(/enter github username/i);
    await user.type(input, "{enter}");

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it("disables button when loading", () => {
    render(<SearchForm {...defaultProps} loading={true} />);

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("disables button when query is empty", () => {
    render(<SearchForm {...defaultProps} query="" />);

    expect(screen.getByRole("button", { name: /search/i })).toBeDisabled();
  });

  it("shows loading spinner when loading", () => {
    render(<SearchForm {...defaultProps} loading={true} />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
