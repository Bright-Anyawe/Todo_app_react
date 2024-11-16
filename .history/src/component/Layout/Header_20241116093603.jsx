import { useRef } from "react";

const Header = ({ toggleSidebar, isCollapsed }) => {
  const activeArrowRef = useRef(null);
  if (isCollapsed) {
      active.current.style.transform = "rotate(180deg)";
  }
  return (
    <>
      <header>
        <div className="subHeadContainer">
          <div>
            {" "}
            <h1 className="headerTextContent">Plan Your Life </h1>
          </div>{" "}
          <svg
            ref={activeArrowRef}
            className="arrow left"
            onClick={toggleSidebar}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <title>arrow-left</title>
            <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z" />
          </svg>
        </div>
      </header>
    </>
  );
};

export default Header;
