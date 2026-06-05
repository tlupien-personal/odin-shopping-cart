import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const mockSetCart = vi.fn();

vi.mock("react-router", () => {
  return {
    useOutletContext: () => [{}, mockSetCart],
  };
});

const MOCK_DATA = {
  id: 69,
  image: "test/img/src",
  price: 2,
  title: "test title",
};

describe("ProductCard", () => {
  it("renders data", () => {});

  it("changes style", () => {});

  it("starts at qty 1 by default", async () => {
    render(<ProductCard data={MOCK_DATA} />);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(1);
  });

  it("uses supplied quantity if applicable", async () => {
    render(<ProductCard data={{ ...MOCK_DATA, quantity: 3 }} />);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(3);
  });

  it("increments quantity", async () => {
    const user = userEvent.setup();
    render(<ProductCard data={MOCK_DATA} />);
    const qtyInput = await screen.findByRole("spinbutton");
    const incrementButton = await screen.findByRole("button", {
      name: /increment/i,
    });
    await user.click(incrementButton);
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(0);
  });

  it("increments quantity with cart side effect", async () => {
    const user = userEvent.setup();
    render(<ProductCard data={MOCK_DATA} isInCart={true} />);
    const qtyInput = await screen.findByRole("spinbutton");
    const incrementButton = await screen.findByRole("button", {
      name: /increment/i,
    });
    await user.click(incrementButton);
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
  });

  it("decrements quantity", async () => {
    const user = userEvent.setup();
    render(<ProductCard data={{ ...MOCK_DATA, quantity: 3 }} />);
    const qtyInput = await screen.findByRole("spinbutton");
    const decrementButton = await screen.findByRole("button", {
      name: /decrement/i,
    });
    await user.click(decrementButton);
    expect(+qtyInput.value).toBe(2);
  });

  it("decrements quantity with cart side effect", () => {});

  it("adds to cart", () => {});

  it("removes from cart", () => {});
});
