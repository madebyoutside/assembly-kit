import { describe, expect, it } from "vite-plus/test";

import pkg from "../package.json" with { type: "json" };
import { SDK_VERSION } from "src/version";

describe("SDK_VERSION", () => {
  it("matches package.json", () => {
    expect(SDK_VERSION).toBe(pkg.version);
  });
});
