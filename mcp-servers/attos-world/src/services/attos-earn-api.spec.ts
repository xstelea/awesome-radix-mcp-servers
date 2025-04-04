import { describe, it, expect } from "vitest";
import { fetchPools } from "./attos-earn-api";

describe("attos-earn-api", () => {
  it("should fetch pools", async () => {
    const pools = await fetchPools();

    console.log(pools);

    expect(pools).toBeDefined();
  });
});
