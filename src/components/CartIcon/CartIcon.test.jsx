import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CartIcon from "./CartIcon";

const setUp = (cartContents) => {
  render(
    <MemoryRouter>
      <CartIcon cart={cartContents} />
    </MemoryRouter>,
  );
};

describe("CartIcon", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays 0 for empty cart", async () => {
    setUp({});
    const badge = await screen.findByRole("status");
    expect(badge).toHaveTextContent("0");
  });

  it("displays 1 for cart with 1x 1 item", async () => {
    setUp({ 1: 1 });
    const badge = await screen.findByRole("status");
    expect(badge).toHaveTextContent("1");
  });

  it("displays 2 for cart with 2x 1 item", async () => {
    setUp({ 1: 2 });
    const badge = await screen.findByRole("status");
    expect(badge).toHaveTextContent("2");
  });

  it("displays 2 for cart with 1x 2 items", async () => {
    setUp({ 1: 1, 2: 1 });
    const badge = await screen.findByRole("status");
    expect(badge).toHaveTextContent("2");
  });

  it("displays 3 for cart with mixed item qty / type", async () => {
    setUp({ 1: 2, 2: 1 });
    const badge = await screen.findByRole("status");
    expect(badge).toHaveTextContent("3");
  });
});
