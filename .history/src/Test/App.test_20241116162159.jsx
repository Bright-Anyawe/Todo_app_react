import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../component/Layout/App";
import { expect } from "vitest";

describe("App", () => {
  it("should render the header contents container", () => {
    render(<App />);
    const headerContentsContainer = screen.getByTestId("header");

    expect(headerContentsContainer).toBeInTheDocument();
    //     expect(headerContentsContainer).toBeInTheDocument();
  });
  // it("should render side bar content", () => {
  //   render(<App />);
  //   const heroContentsContainer = screen.getByTestId("hero-contents");

  //   expect(heroContentsContainer).toBeInTheDocument();
  //   //     expect(headerContentsContainer).toBeInTheDocument();
  // });
});
