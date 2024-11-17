const Header = ({ toggleSidebar, isCollapsed, arrowRef }) => {
  
  return (
    <>
      <header test->
        <div className="subHeadContainer">
          <div>
            {" "}
            <h1 className="headerTextContent">Plan Your Life </h1>
          </div>{" "}
        </div>

        <div className="arrowLeftContainer">
          <svg
            ref={arrowRef}
            
            style={{
              transform: !isCollapsed ? "rotate(-180deg)" : "",
              transition: "transform 0.5s ease-in-out",
            }}
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
