import { sanitizeInput } from "@/utils/helpers";

describe("sanitizeInput", () => {
  it("removes non-numeric characters for non-area types", () => {
    expect(sanitizeInput("abc123", "unit")).toBe("123");
  });

  it("removes non-numeric and non-decimal characters for area type", () => {
    expect(sanitizeInput("abc123.45", "area")).toBe("123.45");
  });

  it("removes leading zeros", () => {
    expect(sanitizeInput("00123", "unit")).toBe("123");
  });

  it("removes leading decimal point", () => {
    expect(sanitizeInput(".1", "area")).toBe("0.10");
  });

  it("limits to 2 decimal places for area type", () => {
    expect(sanitizeInput("123.45664", "area")).toBe("123.46");
  });
});
