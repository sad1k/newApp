import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { eulerianCycle } from "../alghoritms/eulerianCycle";
import fordFalkerson from "../alghoritms/fordFalkerson";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  ListItemButton,
  ThemeProvider,
  Typography,
  responsiveFontSizes,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import MyAlert from "./MyAlert";
import MyAccordion from "./MyAccordion";
import GraphCytoscape from "./GraphCytoscape";


const Graphs = () => {
  const [graphData, setGraphData] = useState({
    nodes: [
      { id: "0", x: 200, y: 200, color: "green" },
      { id: "1", x: 300, y: 300, color: "green" },
      { id: "2", x: 400, y: 400, color: "green" },
      { id: "3", x: 400, y: 200, color: "green" },
    ],
    links: [
      { source: "0", target: "1", label: "50/0" },
      { source: "1", target: "2", label: "20/0" }
    ],
  });



  const [isAdding, setIsAdding] = useState(false);


  const graphRef = useRef(null);

  const [changedLink, setChangedLink] = useState({ link: "" });
  const [copyGraphData, setCopyGraphData] = useState({
    copy: {},
    copied: false,
  });

  const startFordFalkerson = () => {
    setCards(() => ({ cards: [] }));
    setCopyGraphData(() => ({
      copy: structuredClone(graphData),
      copied: true,
    }));

    fordFalkerson(
      graphData,
      setGraphData,
      setAlertInfo,
      setChangedLink,
      setCards
    );
  };

  const updateLinkLabel = (source, target, newLabel) => {
    setGraphData((prevData) => ({
      ...prevData,
      links: prevData.links.map((link) =>
        link.source === source && link.target === target
          ? { ...link, label: newLabel }
          : link
      ),
    }));
  };

  const isEulerian = (graphData) => {
    let result = {};
    graphData.links.forEach((element) => {
      if (element.source in result) {
        result[element.source]++;
      } else {
        result[element.source] = 1;
      }
      if (element.target in result) {
        result[element.target]--;
      } else {
        result[element.target] = -1;
      }
    });
  
    for (let value of Object.values(result)) {
      if (value % 2 !== 0 || value < 0) {
        return false;
      }
    }
    
    return true;
  };

  const [cards, setCards] = useState({ cards: [] });
  const [alertInfo, setAlertInfo] = useState({
    data: "",
    propertyCheck: '',
    show: false,
  });

  const startEulerianCycle = () => {
    if (isEulerian(graphData)) {
      const myGraphData = {
        nodes: [
          { id: "0", x: 200, y: 200, color: "green" },
          { id: "1", x: 300, y: 300, color: "green" },
          { id: "2", x: 400, y: 400, color: "green" },
          { id: "3", x: 400, y: 200, color: "green" },
        ],
        links: [
          { source: "0", target: "1", label: "50/0" },
          { source: "1", target: "2", label: "20/0" }
        ],
      }
      setCopyGraphData(() => ({
        copy: structuredClone(myGraphData),
        copied: true,
      }));
      eulerianCycle(graphData, setGraphData, setCards, setAlertInfo)
    } else {
      setAlertInfo(() => ({
        data: "Данный граф не является эйлеровым графом, либо содержит эйлеров путь",
        propertyCheck: 'error',
        show: true,
      }));
    }
  };

  const [isAddingNode, setIsAddingNode] = useState(false);

  const [isAddingLink, setIsAddingLink] = useState(false);
  const [hint, setHint] = useState("");
  const [newNode, setNewNode] = useState("");
  const [newEdgeSource, setNewEdgeSource] = useState("");
  const [newEdgeTarget, setNewEdgeTarget] = useState("");

  const handleClickNode = (nodeId) => {
    if (isAddingLink) {
      if (!newEdgeSource) {
        setNewEdgeSource(nodeId);
        setIsAddingLink(true);
        setAlertInfo({
          propertyCheck:'info',
          show: true,
          data: "Выберите вторую вершину в которую будет идти ребро",
        });
      } else {
        setGraphData((prevData) => ({
          ...prevData,
          links: [...prevData.links, { source: newEdgeSource, target: nodeId }],
        }));
        setNewEdgeSource("");
        setIsAddingLink(false);
      }
    }
  };
  const [open, setOpen] = useState(false);
  
  const handleClickLink = (source, target) => {
    setOpen(true)
    let newLabel = null
    if (newLabel !== null) {
      updateLinkLabel(source, target, newLabel);
    }
  };

  const myConfig = {
    directed: true, // Включить ориентированные ребра
    node: {
      size: 600,
      colorProperty: "color", // Используем атрибут 'color' для определения цвета
    },
    link: {
      highlightColor: "lightblue",
      distance: 150,
      labelProperty: "label",
      renderLabel: true,
      fontSize: 15,
      highlightFontSize: 30,
      fontWeight: 700,
      strokeWidth: 3,
      // Измените расстояние между узлами по вашему выбору
    },

    onClickNode: handleClickNode,
    onClickLink: handleClickLink,
    zoomDepth: 0.8, // Устанавливаем уровень масштабирования
    zoomDistance: 400,
    panAndZoom: false,
    staticGraph: true,
    automaticRearrangeAfterDropNode: true,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    nodeHoverOpacity: 0.5,
    nodeHoverOthersOpacity: 0.1
  };

  const handleResetGraph = () => {
    if (copyGraphData.copied) {
      console.log(copyGraphData.copy);
      setGraphData(copyGraphData.copy);
    }
  };

  const handleClickGraph = (event) => {
    if (isAddingNode) {
      if (graphData.nodes[0].color == "red") {
        graphData.nodes.forEach((node) => {
          if (node.color == "red") {
            setGraphData((prevData) => ({
              ...prevData,
              nodes: [
                ...prevData.nodes.slice(0, Number(node.id)),
                { ...prevData.nodes[node.id], color: "green" },
                ...prevData.nodes.slice(
                  Number(node.id) + 1,
                  prevData.nodes.length
                ),
              ],
            }));
          }
        });
      }

      const elem = event.target;

      const svgElement = document.getElementsByTagName("g")[0];

      const { x, y } = elem.getBoundingClientRect();
      const transformMatrix = svgElement?.transform?.baseVal?.consolidate()
        ?.matrix || [1, 0, 0, 1, 0, 0];
      const tx = transformMatrix.e === undefined ? 0 : transformMatrix.e;
      const ty = transformMatrix.f === undefined ? 0 : transformMatrix.f;
      const transA = transformMatrix.a === undefined ? 1 : transformMatrix.a;
      const newNode = {
        id: graphData.nodes.length.toString(),

        x: (event.clientX - tx - x) / transA, // установите нужные координаты X
        y: (event.clientY - ty - y) / transA, // установите нужные координаты Y
        color: "green",
      };
      console.log(newNode);
      setGraphData((prevData) => ({
        ...prevData,
        nodes: [...prevData.nodes, newNode],
      }));
      setIsAddingNode(false); // Остановка добавления вершин после одного клика
    }
  };

  

  let darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  darkTheme = responsiveFontSizes(darkTheme);

  return (
    <div>

      <Navbar
        startFordFalkerson={startFordFalkerson}
        startEulerianCycle={startEulerianCycle}
        setIsAddingNode={setIsAddingNode}
        setIsAddingLink={setIsAddingLink}
        setAlertInfo={setAlertInfo}
        handleResetGraph={handleResetGraph}
      />
      <div>{hint}</div>
      <div
        id="1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            border: "5px solid lightgray",
            backgroundColor: "gray",
            margin: "5px",
            display: "inline",
          }}
        >
        </div>
      </div>
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{ maxHeight: "350px", minWidth: "800px", overflowY: "auto" }}
        >
          <ThemeProvider theme={darkTheme}>
            <MyAccordion
              title={'Действия алгоритма'}
              children={cards.cards[0] !== undefined ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  {cards.cards?.map((card) => (
                    <ListItemButton>
                      <Card sx={{ padding: "0px" }} variant="outlined">
                        <CardContent>
                          <Typography sx={{ fontSize: 15 }}>
                            {card.title}
                          </Typography>
                          <Typography sx={{ fontSize: 15 }}>
                            <div>Описание: {card.description}</div>
                            {card.cycle !== undefined ? (
                              <div>Цикл: {card.cycle}</div>
                            ) : (
                              ""
                            )}
                          </Typography>
                        </CardContent>
                      </Card>
                    </ListItemButton>
                  ))}
                </Box>
              ) : (
                "Действий нет"
              )}


              onChange={(event, expanded) =>
                expanded ? window.scrollBy(0, 350) : ""
              }
            >
          
            </MyAccordion>
          </ThemeProvider>
        </div>
      </Container>
      {alertInfo.propertyCheck !== '' ?
        <MyAlert
        alertInfo={alertInfo}
        setAlertInfo={setAlertInfo}
        />
        :
        ''    
      }
       
      <div
        style={{ padding: "20px", margin: "30px", textAlign: "center" }}
      ></div>
      <div>
      
        <Button onClick={() => setIsAddingLink(true)}>
          Добавить ребро
        </Button>
      </div>
    </div>
  );
};

export default Graphs;
