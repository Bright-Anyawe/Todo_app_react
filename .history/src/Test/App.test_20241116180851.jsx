import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../component/Layout/App";
import { GeneralContext, ProjectContext } from "../component/Layout/App";
import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("/Header", () => {
  const MockHeader = () => <div data-testid="header">Header</div>;
  MockHeader.displayName = "Header";
  return MockHeader;
});
vi.mock("/SideBar", () => {
  const MockSideBar = () => <div data-testid="sidebar">Sidebar</div>;
  MockSideBar.displayName = "SideBar";
  return MockSideBar;
});
vi.mock("/Display", () => {
  const MockDisplay = () => <div data-testid="display">Display</div>;
  MockDisplay.displayName = "Display";
  return MockDisplay;
});

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
  it("should render side bar content", () => {
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
    const sideBar = screen.getByTestId("sidebar");

    expect(sideBar).toBeInTheDocument();
    //     expect(headerContentsContainer).toBeInTheDocument();
  });
});
