import { vi, describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import useProductData from "./useProductData";

const mockProducts = [
  { id: 1, image: "test/img/src", price: 2, title: "test title 1" },
  { id: 2, image: "test/img/src", price: 3, title: "test title 2" },
];

let mockProductCache = {};

const TestComponent = () => {
  const { products, isLoading, error } = useProductData(mockProductCache);
  return (
    <div>
      {products && Object.values(products).map((p) => <p key={p.id}>{p.id}</p>)}
      {isLoading && <p>{"" + isLoading}</p>}
      {error && <p>{error?.message}</p>}
    </div>
  );
};

describe("useProductData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockProductCache = {};
  });

  it("correctly returns the products when the fetch succeeds", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockProducts),
      }),
    );
    await waitFor(() => render(<TestComponent />));
    const testResults = await screen.findAllByRole("paragraph");
    expect(testResults.length).toBe(2);
    expect(testResults[0]).toHaveTextContent(1);
    expect(testResults[1]).toHaveTextContent(2);
  });

  it("uses the cache rather than fetch if available", async () => {
    global.fetch = vi.fn();
    for (const p of mockProducts) {
      mockProductCache[p.id] = p;
    }
    await waitFor(() => render(<TestComponent />));
    expect(global.fetch).toHaveBeenCalledTimes(0);
    const testResults = await screen.findAllByRole("paragraph");
    expect(testResults.length).toBe(2);
    expect(testResults[0]).toHaveTextContent(1);
    expect(testResults[1]).toHaveTextContent(2);
  });

  it("returns an error when fetch has bad status", async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        status: 500,
        json: () => Promise.resolve("Data source is kil :("),
      }),
    );
    await waitFor(() => render(<TestComponent />));
    const testResults = await screen.findAllByRole("paragraph");
    expect(testResults.length).toBe(1);
    expect(testResults[0]).toHaveTextContent(/500/);
  });

  it("returns an error when fetch fails completely", async () => {
    global.fetch = vi.fn(() => {
      throw new Error("Something has gone horribly wrong");
    });
    await waitFor(() => render(<TestComponent />));
    const testResults = await screen.findAllByRole("paragraph");
    expect(testResults.length).toBe(1);
    expect(testResults[0]).toHaveTextContent(/wrong/);
  });

  it("is loading when it's loading", async () => {
    global.fetch = vi.fn(() =>
      setTimeout(
        () =>
          Promise.resolve({
            status: 200,
            json: () => Promise.resolve(mockProducts),
          }),
        10000,
      ),
    );
    render(<TestComponent />);
    const testResults = await screen.findAllByRole("paragraph");
    expect(testResults.length).toBe(1);
    expect(testResults[0]).toHaveTextContent(/true/);
  });
});
