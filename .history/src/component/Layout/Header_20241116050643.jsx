const Header = ({ toggleSidebar }) => {
  return (
    <>
      <header>
        <div className="subHeadContainer">
          <div>
            {" "}
            <h1 className="headerTextContent">Plan Your Life </h1>
          </div>{" "}
          <svg
            className="ham hamRotate180 ham5 active"
            viewBox="0 0 100 100"
            height="60px"
          >
            <path
              className="line top"
              d="m 30,33 h 40 c 0,0 8.5,-0.68551 8.5,10.375 0,8.292653 -6.122707,9.002293 -8.5,6.625 l -11.071429,-11.071429"
            ></path>
            <path className="line middle" d="m 70,50 h -40"></path>
            <path
              className="line bottom"
              d="m 30,67 h 40 c 0,0 8.5,0.68551 8.5,-10.375 0,-8.292653 -6.122707,-9.002293 -8.5,-6.625 l -11.071429,11.071429"
            ></path>
          </svg>
        </div>
      </header>
    </>
  );
};

export default Header;
