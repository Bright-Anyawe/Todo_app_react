import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../component/Layout/App";
import { GeneralContext, ProjectContext } from "../component/Layout/App";
import { expect } from "vitest";

describe("App", () => {
  it("should render the header contents container", () => {
    render(
    <GeneralContext.Provider value={}>

      
      <App />
    </GeneralContext.Provider>
    
    );
    const headerContainer = screen.getByTestId("header");

    expect(headerContainer).toBeInTheDocument();
    //     expect(headerContentsContainer).toBeInTheDocument();
  });
  // it("should render side bar content", () => {
  //   render(<App />);
  //   const heroContentsContainer = screen.getByTestId("hero-contents");

  //   expect(heroContentsContainer).toBeInTheDocument();
  //   //     expect(headerContentsContainer).toBeInTheDocument();
  // });
});
