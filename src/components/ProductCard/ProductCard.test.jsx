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

const buttonSetup = async (buttonName, pageType = "shop", quantity) => {
  const user = userEvent.setup();
  render(
    <ProductCard
      data={quantity ? { ...MOCK_DATA, quantity } : MOCK_DATA}
      pageType={pageType}
    />,
  );
  const button = await screen.findByRole("button", {
    name: `${buttonName}`,
  });
  return [user, button];
};

const inputSetup = async (userInput, pageType) => {
  const user = userEvent.setup();
  render(<ProductCard data={MOCK_DATA} pageType={pageType} />);
  const qtyInput = await screen.findByRole("spinbutton");
  await user.type(qtyInput, `{backspace}${userInput}`);
  // why is there {backspace}?
  // because on initial render field should contain 1,
  // so to write something new, the user would have to delete that
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

  it("puts total price on pageType cart", async () => {
    render(<ProductCard data={MOCK_DATA} pageType={"cart"} />);
    const prices = await screen.findAllByText(/\$/i);
    expect(prices.length).toBe(2);
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
    const [user, button] = await buttonSetup("increment", "cart");
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
    const [user, button] = await buttonSetup("increment", "cart", 2);
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
    const [user, button] = await buttonSetup("decrement", "shop", 3);
    await user.click(button);
    const qtyInput = await screen.findByRole("spinbutton");
    expect(+qtyInput.value).toBe(2);
    expect(mockSetCart).toHaveBeenCalledTimes(0);
  });

  it("decrements quantity with cart side effect fresh", async () => {
    const [user, button] = await buttonSetup("decrement", "cart", 3);
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
    const [user, button] = await buttonSetup("decrement", "cart", 2);
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
    const [user, button] = await buttonSetup("command", "shop", 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 2,
    });
  });

  it("adds to cart used", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("command", "shop", 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 4,
    });
  });

  it("removes from cart", async () => {
    mockCart = { 1: 1, 69: 2 };
    const [user, button] = await buttonSetup("command", "cart", 2);
    await user.click(button);
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
    });
  });

  it("displays an error for negative numbers (shop)", async () => {
    await inputSetup("-1", "shop");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for non-integer numbers (shop)", async () => {
    await inputSetup("1.5", "shop");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for zero (shop)", async () => {
    await inputSetup("0", "shop");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for letters (shop)", async () => {
    await inputSetup("abc", "shop");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for negative numbers (cart)", async () => {
    await inputSetup("-1", "cart");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for non-integer numbers (cart)", async () => {
    await inputSetup("1.5", "cart");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for zero (cart)", async () => {
    await inputSetup("0", "cart");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays an error for letters (cart)", async () => {
    await inputSetup("abc", "cart");
    const errorMsg = await screen.findByRole("alert");
    expect(errorMsg).toBeInTheDocument();
  });

  it("does not display an error by default (shop)", async () => {
    render(<ProductCard data={MOCK_DATA} pageType="shop" />);
    const errorMsg = screen.queryByRole("alert");
    expect(errorMsg).not.toBeInTheDocument();
  });

  it("does not display an error by default (cart)", async () => {
    render(<ProductCard data={MOCK_DATA} pageType="cart" />);
    const errorMsg = screen.queryByRole("alert");
    expect(errorMsg).not.toBeInTheDocument();
  });

  it("disables the add to cart button on bad input", async () => {
    await inputSetup("-1", "shop");
    const cartBtn = await screen.findByRole("button", { name: "command" });
    expect(cartBtn).toBeDisabled();
  });

  it("does not disable the remove button on bad input", async () => {
    await inputSetup("-1", "cart");
    const cartBtn = await screen.findByRole("button", { name: "command" });
    expect(cartBtn).not.toBeDisabled();
  });

  it("updates the cart when keyboard input validly modifies qty", async () => {
    await inputSetup("2", "cart");
    expect(mockSetCart).toHaveBeenCalledTimes(1);
    expect(mockSetCart).toHaveBeenCalledWith({
      1: 1,
      69: 2,
    });
  });

  it("avoids displaying negative price", async () => {
    await inputSetup("-2", "cart");
    const priceCols = await screen.findAllByText(/\$/i);
    const totalPrice = priceCols[1];
    expect(totalPrice).toHaveTextContent("$2.00");
  });

  it("avoids displaying price based on decimal quantity", async () => {
    await inputSetup("1.5", "cart");
    const priceCols = await screen.findAllByText(/\$/i);
    const totalPrice = priceCols[1];
    expect(totalPrice).toHaveTextContent("$2.00");
  });
});
