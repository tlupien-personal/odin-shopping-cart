import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProductGrid from "./ProductGrid";

const mockProducts = [
  { id: 1, image: "test/img/src", price: 2, title: "test title 1" },
  { id: 2, image: "test/img/src", price: 3, title: "test title 2" },
];

vi.mock("../ProductCard", () => ({
  default: () => {},
}));

describe("ProductGrid", () => {
  it("doesn't render cart-related stuff for shop pageType", async () => {
    render(<ProductGrid products={mockProducts} pageType={"shop"} />);
    const headers = screen.queryByRole("paragraph");
    expect(headers).not.toBeInTheDocument();
  });

  it("renders table cruft for cart pageType", async () => {
    render(<ProductGrid products={mockProducts} pageType={"cart"} />);
    const cruft = screen.queryAllByRole("paragraph");
    expect(cruft.length).toBe(6);
  });

  it("calculates the grand total correctly", async () => {
    const mockProducts2 = [
      { ...mockProducts[0], quantity: 2 },
      { ...mockProducts[1], quantity: 2 },
    ];
    render(<ProductGrid products={mockProducts2} pageType={"cart"} />);
    const grandTotalValue = screen.queryByText(/\$/i);
    expect(grandTotalValue).toHaveTextContent("$10.00");
  });
});
