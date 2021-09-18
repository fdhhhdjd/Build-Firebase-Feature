import React, { useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation(); //! khi ta tự gõ địa chỉ qua trang thi css tự động nhay qua ô mà chúng ta chọn luôn
  const [search, setSearch] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, [location]);
  //! SEARCH
  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${search}`);
    setSearch("");
  };
  return (
    <>
      <div className="header">
        <p className="logo">Contact App</p>
        <div className="header-right">
          <form onSubmit={handleSubmit} style={{ display: "inline" }}>
            <input
              type="text"
              className="inputField"
              placeholder="Search Name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <Link to="/">
            <p
              className={`${activeTab === "Home" ? "active" : ""}`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </p>
          </Link>
          <Link to="/add">
            <p
              className={`${activeTab === "AddContact" ? "active" : ""}`}
              onClick={() => setActiveTab("AddContact")}
            >
              Add Contact
            </p>
          </Link>
          <Link to="/about">
            <p
              className={`${activeTab === "About" ? "active" : ""}`}
              onClick={() => setActiveTab("About")}
            >
              About
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
