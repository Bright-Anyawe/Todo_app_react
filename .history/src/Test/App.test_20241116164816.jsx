import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../component/Layout/App";
import { GeneralContext, ProjectContext } from "../component/Layout/App";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";


vi.mock('../SideBar', () => () => <div data-testid="sidebar">Sidebar</div>);
jest.mock('./Header', () => () => <div data-testid="header">Header</div>);
jest.mock('./Display', () => () => <div data-testid="display">Display</div>);

describe("App", () => {
  it("should render the header contents container", () => {
    render(
      <MemoryRouter>
        <GeneralContext.Provider
          value={{ toggleSidebar: vi.fn(), isCollapsed: false }}
        >
          <ProjectContext.Provider
            value={{ projects: [], setProjects: vi.fn() }}
          >
            <App />
          </ProjectContext.Provider>
        </GeneralContext.Provider>
      </MemoryRouter>
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
