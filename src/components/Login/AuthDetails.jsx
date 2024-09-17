import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { Button, Skeleton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import s from "../../App.module.css";
import { useAuthContext } from "../../contexts/authContext/authContextProvider";
import { check } from "../../http/userAPI";

const AuthDetails = () => {
  const { isAuth, user, toggleSetUser, toggleIsAuth } = useAuthContext();

  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const logOut = () => {
    toggleSetUser({});
    toggleIsAuth(false);
  };

  useEffect(() => {
    check()
      .then((data) => {
        toggleIsAuth(true);
        toggleSetUser(data);
      })
      .catch((error) => {
        toggleIsAuth(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Skeleton variant="circular" width={40} height={40} />;
  }

  console.log(user, isAuth)

  return (
    <div>
      {isAuth ? (
        <div>
          <Button onClick={() => navigate(`/profile/${user.id}`)}>
            Мой профиль
          </Button>
          <Button onClick={() => navigate("/account")}>Настройки</Button>
          {`${user.email.slice(0, 10)}...`}
          <Button onClick={logOut}>Sign Out</Button>
        </div>
      ) : (
        <NavLink
          to="/login"
          className={({ isActive, isPending }) =>
            isPending ? s.pending : isActive ? s.active : s.link
          }
        >
          Login
        </NavLink>
      )}
    </div>
  );
};

export default AuthDetails;
