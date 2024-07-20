const baseOption = { elements: {
  nodes: [
    {
      data: {
        id: "0",
      },
      position: {
        x: 0,
        y: 10,
      },
    },
    {
      data: {
        id: "1",
      },
      position: {
        x: 0,
        y: 100,
      },
    },
    {
      data: {
        id: "2",
      },
      position: {
        x: 100,
        y: 0,
      },
    },
  ],
  edges: [
    {
      data: { id: "01", source: "0", target: "1" },
    },
    {
      data: { id: "02", source: "0", target: "2" },
    },
    {
      data: { id: "12", source: "1", target: "2" },
    },
  ],
},
style: [
  {
    selector: "#0",
    style: {
      "background-color": "red",
    },
  },
  {
    selector: "#1",
    style: {
      "background-color": "orange",
    },
    
  },
  {
    selector: "#2",
    style: {
      "background-color": "blue",
    },
  },
],
};

export const options = (page) => {
  switch(page){
    case 1:
    case 2:
      return baseOption
    case 4:
    case 5:
    case 3:
    case 8:
    case 6:
    case 7:
      return {
        ...baseOption,
        style: [
          {
            selector: "node",
            style:{
              "label": function(ele) {return ele.degree() },
              "text-halign": "center",
              "text-valign": "center",
            }
          },
          {
            selector: "#0",
            style: {
              "background-color": "red",
              
            },
          },
          {
            selector: "#1",
            style: {
              "background-color": "orange",
            },
            
          },
          {
            selector: "#2",
            style: {
              "background-color": "blue",
            },
          },
        ],
      }
    case 9:
      return {
        ...baseOption,
        style:[
          {
            selector: "node",
            style:{
              "label": function(ele) {return ele.degree() },
              "text-halign": "center",
              "text-valign": "center",
            }
          },
          {
            selector: '.orange',
            style: {
              "background-color":"rgb(255, 87, 51)",
            }
          },
          {
            selector: '.green',
            style: {
              "background-color":"rgb(138, 255, 51)",
            }
          },
        ],

        elements: {
          nodes: [
            {
              data: {
                id: "0",
              },
              position: {
                x: 0,
                y: 10,
              },
            },
            {
              data: {
                id: "1",
              },
              position: {
                x: 0,
                y: 100,
              },
            },
            {
              data: {
                id: "2",
              },
              position: {
                x: 100,
                y: 0,
              },
            },
          ],
          edges: [
            {
              data: { id: "01", source: "0", target: "1" },
            },
            {
              data: { id: "02", source: "1", target: "2" },
            },
          ],
        },
      }
    case 10:
      return {
        ...baseOption,
        style:[
          {
            selector: "node",
            style:{
              "label": function(ele) {return ele.degree() },
              "text-halign": "center",
              "text-valign": "center",
            }
          },
          {
            selector: '.orange',
            style: {
              "background-color":"rgb(255, 87, 51)",
            }
          },
          {
            selector: '.green',
            style: {
              "background-color":"rgb(138, 255, 51)",
            }
          },
        ],
        elements: {
          nodes: [
            {
              data: {
                id: "0",
              },
              position: {
                x: 0,
                y: 10,
              },
            },
            {
              data: {
                id: "1",
              },
              position: {
                x: 0,
                y: 100,
              },
            },
            {
              data: {
                id: "2",
              },
              position: {
                x: 100,
                y: 0,
              },
            },
            {
              data: {
                id: "3",
              },
              position: {
                x: 0,
                y: 10,
              },
            },
            {
              data: {
                id: "4",
              },
              position: {
                x: 0,
                y: 100,
              },
            },
            {
              data: {
                id: "5",
              },
              position: {
                x: 100,
                y: 0,
              },
            },
          ],
          edges: [
            {
              data: { id: "03", source: "0", target: "3" },
            },
            {
              data: { id: "04", source: "0", target: "4" },
            },
            {
              data: { id: "05", source: "0", target: "5" },
            },
            {
              data: { id: "13", source: "1", target: "3" },
            },
            {
              data: { id: "14", source: "1", target: "4" },
            },
            {
              data: { id: "15", source: "1", target: "5" },
            },
            {
              data: { id: "23", source: "2", target: "3" },
            },
            {
              data: { id: "24", source: "2", target: "4" },
            },
            {
              data: { id: "25", source: "2", target: "5" },
            },
          ],
        },
      }
    case 11:{
      return {
        ...baseOption,
        style:[
          ...baseOption.style,
          {
            selector: "#0",
            style: {
              "background-color": "red",
              "label": function(ele) {return 'Корень' },
            },
          }
        ],
        elements: {
          nodes: [
            {
              data: {
                id: "0",
              },
              position: {
                x: 0,
                y: 10,
              },
            },
            {
              data: {
                id: "1",
              },
              position: {
                x: 0,
                y: 100,
              },
            },
            {
              data: {
                id: "2",
              },
              position: {
                x: 100,
                y: 0,
              },
            },
          ],
          edges: [
            {
              data: { id: "01", source: "0", target: "1" },
            },
            {
              data: { id: "02", source: "0", target: "2" },
            },
          ],
        },
      }
    }
    default:
      return null
  }
}
