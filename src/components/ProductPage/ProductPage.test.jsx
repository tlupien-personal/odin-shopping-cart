import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductPage from "./ProductPage";
import useProductData from "../../hooks/useProductData";

vi.mock("../../hooks/useProductData", () => ({
  default: vi.fn(),
}));

let mockCart = { 1: 1 };
const mockSetCart = vi.fn();

vi.mock("react-router", () => {
  return {
    useOutletContext: () => [mockCart, mockSetCart],
  };
});

const mockProducts = [
  { id: 1, image: "test/img/src", price: 2, title: "test title 1" },
  { id: 2, image: "test/img/src", price: 3, title: "test title 2" },
];

vi.mock("../ProductGrid", () => ({
  default: ({ products }) => products.map((p) => <p>{p.id}</p>),
  // one of the lines of code of all time
}));

describe("ProductPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCart = { 1: 1 };
  });

  it("displays the loading spinner when it's loading", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: {},
      isLoading: true,
      error: null,
    });
    render(<ProductPage pageType="shop" />);
    const spinner = await screen.findByRole("img", { name: /loading/i });
    expect(spinner).toBeInTheDocument();
  });

  it("displays an error message when there is an error fetching the data", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: {},
      isLoading: false,
      error: new Error(`Failed to fetch data with status code 418`),
    });
    render(<ProductPage pageType="shop" />);
    const errorHeading = await screen.findByRole("heading");
    expect(errorHeading).toHaveTextContent(/error/i);
    const errorBody = await screen.findAllByRole("paragraph");
    expect(errorBody[1]).toHaveTextContent(/418/i);
  });

  it("displays all products on the shop page", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
    render(<ProductPage pageType="shop" />);
    const mockCards = await screen.findAllByRole("paragraph");
    expect(mockCards.length).toBe(2);
  });

  it("displays only products in the cart on cart page", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
    render(<ProductPage pageType="cart" />);
    const mockCards = await screen.findAllByRole("paragraph");
    expect(mockCards.length).toBe(1);
  });

  it("has the right heading on shop page", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
    render(<ProductPage pageType="shop" />);
    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent("Shop");
  });

  it("has the right heading on cart page", async () => {
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
    render(<ProductPage pageType="cart" />);
    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent("Cart");
  });

  it("has the right heading on cart page when empty", async () => {
    mockCart = {};
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      isLoading: false,
      error: null,
    });
    render(<ProductPage pageType="cart" />);
    const heading = await screen.findByRole("heading");
    expect(heading).toHaveTextContent("Cart (empty)");
  });
});
