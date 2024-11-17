

import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
impor;
it("should render the hero section contents container", () => {
  render(<App />);
  const heroContentsContainer = screen.getByTestId("hero-contents");

  expect(heroContentsContainer).toBeInTheDocument();
  //     expect(headerContentsContainer).toBeInTheDocument();
});

it("should render the card presentation contents container", () => {
  render(<App />);
  const cardPresentationContainer = screen.getByTestId(
    "cardPresentation-contents"
  );

  expect(cardPresentationContainer).toBeInTheDocument();
  //     expect(headerContentsContainer).toBeInTheDocument();
});
