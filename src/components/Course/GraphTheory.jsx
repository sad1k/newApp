import React, { useEffect, useRef, useState } from "react";
import cytoscape from "cytoscape";
import { MathJax } from "better-react-mathjax";
import cytoscapeEdgehandles from "cytoscape-edgehandles";
import cola from "cytoscape-cola";
import cytoscapePopper from "cytoscape-popper";
import tippy from "tippy.js";
import {computePosition, useFloating} from '@floating-ui/react';
import Tooltip from "./components/Tooltip";

cytoscape.use(cytoscapeEdgehandles);

cytoscape.use(cola);

const tipsOptions = {
  name: "cola",

  animate: true, // whether to show the layout as it's running
  refresh: 1, // number of ticks per frame; higher is faster but more jerky
  maxSimulationTime: 4000, // max length in ms to run the layout
  ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
  fit: true, // on every layout reposition of nodes, fit the viewport
  padding: 30, // padding around the simulation
  boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
  nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node

  // layout event callbacks
  ready: function () {}, // on layoutready
  stop: function () {}, // on layoutstop

  // positioning options
  randomize: false, // use random node positions at beginning of layout
  avoidOverlap: true, // if true, prevents overlap of node bounding boxes
  handleDisconnected: true, // if true, avoids disconnected components from overlapping
  convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
  nodeSpacing: function (node) {
    return 10;
  }, // extra spacing around nodes
  flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
  alignment: undefined, // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
  gapInequalities: undefined, // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
  centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

  // different methods of specifying edge length
  // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
  edgeLength: undefined, // sets edge length directly in simulation
  edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
  edgeJaccardLength: undefined, // jaccard edge length in simulation

  // iterations of cola algorithm; uses default values on undefined
  unconstrIter: undefined, // unconstrained initial layout iterations
  userConstIter: undefined, // initial layout iterations with user-specified constraints
  allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
};


const Graph = ({options, setCy, setCyNodes, setCyEdges, interactiveElement}) => {
  const cyRef = useRef(null);
  let [toolTips, setTooltips] = useState([])

  useEffect(() => {
    let graph = cytoscape({
      // very commonly used options
      container: cyRef.current,
      elements: {
        ...options.elements
      },
      style: [
        ...options.style,
        {
          selector: ".eh-handle",
          style: {
            width: 12,
            height: 12,
            shape: "ellipse",
            "overlay-opacity": 0,
            "border-width": 12, // makes the handle easier to hit
            "border-opacity": 0,
            opacity: 0.5,
          },
        },

        {
          selector: ".eh-hover",
          style: {
            opacity: 0.5,
          },
        },

        {
          selector: ".eh-source",
          style: {
            "border-width": 2,
            "border-color": "#8acced",
          },
        },

        {
          selector: ".eh-target",
          style: {
            "border-width": 2,
            "border-color": "#8acced",
          },
        },

        {
          selector: ".eh-ghost-edge",
          style: {
            "background-color": "gray",
            "line-color": "gray",
          },
        },

        {
          selector: ".eh-ghost-edge.eh-preview-active",
          style: {
            opacity: 0,
          },
        },
      ],
      layout: tipsOptions,
      minZoom: 1e-50,
      maxZoom: 1e50,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: true,
      selectionType: "single",
      touchTapThreshold: 8,
      desktopTapThreshold: 4,
      autounselectify: false,
      multiClickDebounceTime: 250,
      wheelSensitivity: 0.2,

      motionBlur: true,
      motionBlurOpacity: 0.2,
    });

    let defaults = {
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
    };
    let eh = graph.edgehandles(defaults);
    eh.enable();
    eh.enableDrawMode();
    let myTooltip = []
    for (let node of graph.nodes()) {
      myTooltip.push(<Tooltip key={node.data('id')} cy={graph} node={node} />)
    }
    let maxId = 3
    setTooltips(myTooltip)
    const handlerGraph = (event) => {
      event.preventDefault();
      if (event.target === event.cy) {
        if (event.cy.nodes().length <= 10) {
          console.log(+event.cy.nodes().last().data('id') + 1)
          const randColor = (Math.random().toString(16) + "000000")
            .substring(2, 8)
            .toUpperCase();
          event.cy.add({
            group: "nodes",
            data: { id: `${maxId + 1}` },
            position: event.position,
          });
          maxId += 1
          let lastNode = event.cy.nodes().last()
          setTooltips((prevToolTips) => [...prevToolTips, <Tooltip key={lastNode.data('id')} cy={graph} node={lastNode} />])

          event.cy
            .style()
            .selector(`#${lastNode.data('id')}`)
            .style("background-color", `#${randColor}`)
            .update();
          setCyNodes(event.cy.nodes());
        }
      }
    };

    const rightClickHandler = (e) => {
      if(e.target === graph){
        return
      }
      if(e.target?.isNode()){
        setCyNodes((prev) => prev.filter((el) => el.data('id') !== e.target.data('id')));
        let ides = graph.nodes().edgesWith(e.target).map((edge) => edge.data('id'))
        setCyEdges((prev) => prev.filter((el) => !ides.includes(el.data('id'))))
        graph.remove(e.target)
      }
      if(e.target?.isEdge()){
        graph.remove(e.target)
        setCyEdges((prev) => prev.filter((el) => el.data('id') !== e.target.data('id')));
      }
    }
    graph.on("tap", handlerGraph);
    graph.on("cxttap", rightClickHandler);
    graph.on("ehcomplete", (event, sourceNode, targetNode, link) => {
      setCyEdges((prev) => [...prev, link]);
      event.cy.layout(tipsOptions).run();
    });
    graph.zoom({
      level: 0.9,
    });
    graph.center();
    setCy(graph);
    setCyNodes(graph.nodes());
    setCyEdges(graph.edges());
  }, [options]);

  return (
    <div style={{position:'relative'}}>
      <div
        style={{
          height: "80vh",
          backgroundColor: "white",
          borderRadius: "55px",
        }}
      >
        <div
          style={{
            height: "60vh",
          }}
          ref={cyRef}
        />
        {interactiveElement()}
      </div>
      {
        toolTips.map((toolTip) => toolTip)
      }
    </div>
  );
};

export default Graph;
