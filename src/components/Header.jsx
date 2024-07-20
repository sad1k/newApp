import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import s from "../App.module.css";
import AuthDetails from "./Login/AuthDetails";
import TimelineIcon from '@mui/icons-material/Timeline';
import { useAuthContext } from "../contexts/authContext/authContextProvider";
import { Skeleton } from "@mui/material";
import { check } from "../http/userAPI";

const Header = () => {

  return (
    <div className={s.header}>
      <div className={s.Navbar}>
     
        <NavLink
          to="/"
          className={({ isActive, isPending }) => (isPending ? s.pending : isActive ? s.active : s.link) + ` ${s.main}`
           }
        >
          <TimelineIcon /> 
          Основная страница
        </NavLink>
        <NavLink
          to="/course"
          className={({ isActive, isPending }) =>
            isPending ? s.pending : isActive ? s.active : s.link
          }
        >
          Курсы
        </NavLink>
        {
          <AuthDetails />
        }
      </div>
    </div>
  );
};

export default Header;
