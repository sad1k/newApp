import logo from './logo.svg';
import s from './App.module.css';
import { NavLink, BrowserRouter } from "react-router-dom";
import Graphs from './components/Graph';
import Navbar from './components/Navbar';
import About from './components/About';
import { Container, ThemeProvider, createTheme } from '@mui/material';
import { useCallback, useEffect } from 'react';
import {useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import settings from './particles.json'

const App = ()=> {

  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };
  const options = useMemo(() => (settings))
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (

    
    <BrowserRouter>
    {
    (init) ? 
    <Particles id="tsparticles"particlesLoaded={particlesLoaded}
    options={options}/>
      :
      ''
      
    }
    <ThemeProvider theme={darkTheme}>
     <div className={s.header}>
            <div className={s.Navbar}>
            <NavLink
    to="/euleriancycle"
    className={({ isActive, isPending }) =>
      isPending ? s.pending : isActive ? s.active : s.link

    }
  >
    Eulerian cycle
  </NavLink>
            </div>
          </div>
    <Container maxWidth="xl">

      <div className={s.container}>
        <div className={s.App} >
         
          <div className="body">
            <About />
         
            <Graphs/>
          </div>
          
        </div>
      </div>
      </Container>
    </ThemeProvider>
  </BrowserRouter>

  );
}

export default App;
