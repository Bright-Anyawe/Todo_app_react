import { expect, afterEach } from "vitest";
import { cleanu
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
