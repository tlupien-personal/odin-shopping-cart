import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

let mockCart = { 1: 1 };
const mockSetCart = vi.fn();

vi.mock("react-router", () => {
  return {
    useOutletContext: () => [mockCart, mockSetCart],
  };
});

const MOCK_DATA = {
  id: 69,
  image: "test/img/src",
  price: 2,
  title: "test title",
};

const buttonSetup = async (buttonName, cartMode = false, quantity) => {
  const user = userEvent.setup();
  render(
    <ProductCard
      data={quantity ? { ...MOCK_DATA, quantity } : MOCK_DATA}
      isInCart={cartMode}
    />,
  );
  const button = await screen.findByRole("button", {
    name: `${buttonName}`,
  });
  return [user, button];
};

describe("ProductCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockCart = { 1: 1 };
  });

  it("renders data", async () => {
    render(<ProductCard data={MOCK_DATA} />);
    const title = await screen.findByText(/test title/i);
    expect(title).toBeInTheDocument();
    const img = await screen.findByAltText(/product image/i);
    expect(img).toBeInTheDocument();
    const price = await screen.findByText(/\$/i);
    expect(price).toBeInTheDocument();
  });

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
    const [user, button] = await buttonSetup("increment");
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(0);
  });

  it("increments quantity with cart side effect fresh", async () => {
    const [user, button] = await buttonSetup("increment", true);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 2,
    });
  });

  it("increments quantity with cart side effect used", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("increment", true, 2);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(3);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 3,
    });
  });

  it("decrements quantity", async () => {
    const [user, button] = await buttonSetup("decrement", false, 3);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(0);
  });

  it("decrements quantity with cart side effect fresh", async () => {
    const [user, button] = await buttonSetup("decrement", true, 3);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 2,
    });
  });

  it("decrements quantity with cart side effect used", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("decrement", true, 2);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(1);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 1,
    });
  });

  it("adds to cart fresh", async () => {
    const [user, button] = await buttonSetup("command", false, 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 2,
    });
  });

  it("adds to cart used", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("command", false, 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 4,
    });
  });

  it("removes from cart", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("command", true, 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
    });
  });
});
