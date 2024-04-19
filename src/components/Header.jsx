import React from "react";
import { NavLink } from "react-router-dom";
import s from "../App.module.css";
import AuthDetails from "./Login/AuthDetails";

const Header = () => {
  return (
    <div className={s.header}>
      <div className={s.Navbar}>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? s.pending : isActive ? s.active : s.link
          }
        >
          Main Page
        </NavLink>
        <NavLink
          to="/course"
          className={({ isActive, isPending }) =>
            isPending ? s.pending : isActive ? s.active : s.link
          }
        >
          course
        </NavLink>
        <AuthDetails />
      </div>
    </div>
  );
};

export default Header;
