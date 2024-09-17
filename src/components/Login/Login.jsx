import { Button, Card, CardContent, Input } from "@mui/material";
import React, { useState } from "react";
import style from "./styles.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  login,
  registration,
} from "../../http/userAPI";
import { useAuthContext } from "../../contexts/authContext/authContextProvider";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = ({ isRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPass, setCopyPass] = useState("");
  const [error, setError] = useState("");

  const { toggleSetUser, toggleIsAuth } = useAuthContext();
  const navigate = useNavigate();

  const click = async () => {
    try {
      let data;
      if (isRegister) {
        data = await registration(email, password);
      } else {
        data = await login(email, password);
      }
      toggleSetUser(data);
      toggleIsAuth(true);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div>
      <Card>
        <CardContent>
          <form className={style.loginForm}>
            <h1>{isRegister ? "Создать аккаунт" : "Войти в аккаунт"}</h1>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              type="email"
              placeholder="Email"
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              type="password"
              placeholder="Password"
            />
            {isRegister ? (
              <Input
                value={copyPass}
                onChange={(e) => setCopyPass(e.target.value)}
                type="password"
                placeholder="Password again"
              />
            ) : (
              ""
            )}
            <Button onClick={click}>{isRegister ? "Register" : "Login"}</Button>
            {isRegister ? (
              <div>
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "pink" }}
                >
                  Войдите в аккаунт!
                </NavLink>
              </div>
            ) : (
              <div>
                <NavLink
                  to="/register"
                  style={{ textDecoration: "none", color: "pink" }}
                >
                  Зарегистрируйтесь
                </NavLink>
                , если вы еще этого не сделали!
              </div>
            )}
            {error ? <p style={{ color: "red" }}>{error}</p> : false}
          </form>
          <div className={style.center}>
          <GoogleLogin
          theme="filled_black"
          text={isRegister ? 'signup_with' : 'signin_with'}
          onSuccess={async (credentialResponse) => {
            const data = jwtDecode(credentialResponse.credential)
            console.log(data)
            let regData
            if(isRegister){
              regData= await registration(data.email, 'google').catch(err => {
                console.log(err)
              }) 
            }else{
              regData = await login(data.email, 'google').catch(err => {
                console.log(err)
              }) 
            }
            toggleSetUser(regData);
            toggleIsAuth(true);
            navigate("/");
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        </div>
        </CardContent>
      
        
      </Card>
    </div>
  );
};

export default Login;
