import logo from "./logo.svg";
import s from "./App.module.css";
import { NavLink, BrowserRouter } from "react-router-dom";
import Graphs from "./components/Graph";
import Navbar from "./components/Navbar";
import About from "./components/About";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { useCallback, useEffect, useRef } from "react";
import { useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import settings from "./particles.json";
import GraphCytoscape from "./components/GraphCytoscape";
import Header from "./components/Header";

const App = () => {
 
  return (
    <div>
        <Container maxWidth="xl">
          <div className={s.container}>
            <div className={s.App}>
              <div className="body">
                <About />
                <GraphCytoscape />
              </div>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default App;
