import "./navbar.scss";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
        <span>Admin Dashboard</span>
      </div>

      <div className="icons">
        {/* <img src="/search.svg" alt="" className="icon" />
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />

        <div className="notification">
            <img src="/notifications.svg" alt="" />
            <span>2</span>
        </div> */}

        <div className="user">
            <img src="/a1.png" alt="" />
            <span>NABD</span>
        </div>

        <img src="/settings.svg" alt="" className="icon" />
      </div>
    </div>
  );
};

export default Navbar;
