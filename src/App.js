import s from "./App.module.css";
import About from "./components/About";
import { Container } from "@mui/material";
import GraphCytoscape from "./components/GraphCytoscape";

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
