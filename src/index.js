import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppRoute from "./AppRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import Login from "./components/Login/Login";
import Header from "./components/Header";
import { AuthContextProvider } from "./contexts/authContext/authContextProvider";
import PersonalPage from "./components/PersonalPage/PersonalPage";
import Article from "./components/Article/Article";
import Profile from "./components/Profile/Profile";
import CourseCard from "./components/CourseCard/CourseCard";
import { MathJaxContext } from "better-react-mathjax";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'overlayscrollbars/overlayscrollbars.css';
import CourseTheory from "./components/Course/CourseTheory";
import CoursePage from "./components/CoursePage/CoursePage";
import { Test } from "./components/Test/Test";
import CourseCreator from "./components/CoursePage/CreateCourse";
import CourseContent from "./components/CoursePage/LessonPage";


const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <MathJaxContext>
      <ThemeProvider theme={darkTheme}>
      <GoogleOAuthProvider clientId={'621512198726-1skddn48t6160ta3atlg81rtfir7t7nf.apps.googleusercontent.com'}>
        <AuthContextProvider user={null} isAuth={false}>
          <Header />
          <Routes>
            <Route path="/euleriancycle" />
            <Route path="/course" element={<MainPage />} />
            <Route path="/create-course" element={<CourseCreator />} />
            <Route path="/" element={<App />} />
            <Route path="/login" element={<Login isRegister={false} />} />
            <Route path="/register" element={<Login isRegister={true} />} />
            <Route path="/account" element={<PersonalPage />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/coursecard" element={<CourseCard />} />
            <Route path="/graph-theory" element={<CourseTheory />} />
            <Route path="/course/:id" element={<CoursePage />} />
            <Route path="/test" element={<Test />} />
            <Route path="/lesson" element={<CourseContent />} />
          </Routes>
        </AuthContextProvider>
        </GoogleOAuthProvider>
      </ThemeProvider>
    </MathJaxContext>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
