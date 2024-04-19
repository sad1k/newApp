import { Button, Card, CardContent, Input, Paper } from "@mui/material";
import React, { useState } from "react";
import style from "./styles.module.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NavLink } from "react-router-dom";
import s from '../../App.module.css'
const Login = ({isRegistered}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copyPass, setCopyPass] = useState("");
  const [error, setError] = useState("")

  function register(e){
    e.preventDefault()
    if(copyPass !== password){
      setError('Пароли не равны')
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log(user)
      setEmail('')
      setPassword('')
      setCopyPass('')
    }).catch((error) => {
      console.log(error)
    })
  }

  function logIn(e){
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(user => {
      console.log(user)
      setEmail('')
      setPassword('')
      setCopyPass('')
    }).catch((error) => {
      console.log(error)
      setError("Мы не нашли ваш аккаунт")
    })
  }

  return (
    <div>
      <Card>
        <CardContent>
          <form  className={style.loginForm}>
            <h1>{isRegistered ? "Log in account" : "Create account"}</h1>
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
            {isRegistered ? (
             ''
            ) : (
              <Input
                value={copyPass}
                onChange={(e) => setCopyPass(e.target.value)}
                type="password"
                placeholder="Password again"
              />
            )}
            <Button onClick={isRegistered ? logIn : register}>{isRegistered ? "Login" : "Register"}</Button>
            {
              isRegistered ?   
              <div>
              <NavLink 
               to="/register"
               style={{textDecoration: 'none', color:"pink"}}
              >
                Зарегистрируйтесь
              </NavLink>, если вы еще этого не сделали!
            </div> : 
              ''
            
            }
            {error ? <p style={{color:'red'}}>{error}</p> : false}
          </form>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
