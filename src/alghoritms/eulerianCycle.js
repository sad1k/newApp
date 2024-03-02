const createCycle = (cycle) =>{
  const strCycle = cycle.map(edge => {
    if(edge.color === 'red'){
      return edge.id
    }else{
      return ''
    }
  });
  return strCycle.reverse(  ).join(' ')
}

export const eulerianCycle = (graph, setGraphData, setCards, setAlertInfo) => {
    // Функция для проверки наличия необработанных рёбер у вершины
    const hasUnvisitedEdges = (vertex,adjacencyList) => adjacencyList[vertex].some(edge => !edge.visited);
  
    // Функция для поиска следующего необработанного ребра у вершины
    const findUnvisitedEdge = (vertex,adjacencyList) => adjacencyList[vertex].find(edge => !edge.visited);
  
    // Функция для обхода эйлерова цикла
    const traverse = (startVertex, cycle) => {
      let currentVertex = startVertex;
  
      do {
        const unvisitedEdge = findUnvisitedEdge(currentVertex, adjacencyList);
       
        if (unvisitedEdge) {
          unvisitedEdge.visited = true;
          cycle.push(unvisitedEdge);
          console.log(cycle)
          setTimeout(() => {
            setGraphData(prevData => {
              const retObj = {
                ...prevData,
                nodes: [{...prevData.nodes[unvisitedEdge.from.charCodeAt(0) - '0'.charCodeAt(0)], color:'red'}, ...prevData.nodes.filter(elem => Number(elem.id) !== unvisitedEdge.from.charCodeAt(0) - '0'.charCodeAt(0))],
              }
              setCards(prevCards => ({
                cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:'123', cycle:createCycle(retObj.nodes) , action: retObj}
              ]
            }))
              return retObj
            }
              );  
         
          }, 1000 * (unvisitedEdge.from.charCodeAt(0) - '0'.charCodeAt(0) + 1))
        
          currentVertex = unvisitedEdge.to;
        } else {
          break;
        }
      } while (hasUnvisitedEdges(currentVertex,adjacencyList));
      setTimeout((cycle) => {
        setAlertInfo(prevData => {
          console.log()
          return {data: `${createCycle(cycle)}`, propertyCheck:'success', show:true}
          })
        },
        1000*cycle.length, cycle
      )
      return cycle;
    };
  
    // Инициализация графа
    const adjacencyList = {};
  
    graph.nodes.forEach(node => {
      adjacencyList[node.id] = [];
    });
  
    graph.links.forEach(link => {
      adjacencyList[link.source].push({ from: link.source, to: link.target, visited: false });
    });
  
    // Начальная вершина для обхода (можно выбрать любую)
    const startVertex = graph.nodes[0].id;
  
    // Начальный цикл
    const initialCycle = [{ from: startVertex, to: startVertex, visited: true }];
  
    return traverse(startVertex, initialCycle);
  };
 