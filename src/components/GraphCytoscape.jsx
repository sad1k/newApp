import React, { useCallback, useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import cytoscapeEdgehandles from 'cytoscape-edgehandles';
import { Button, Icon, Input } from '@mui/material';
import styled from '@emotion/styled';
import { pink, purple } from '@mui/material/colors';
import Navbar from './Navbar';




cytoscape.use(cytoscapeEdgehandles);

const GraphCytoscape = () => {
 
  const [isAddingLink, setIsAddingLink] = useState(false)
  
  const [ehState, setEhState] = useState({})

  const [cyState, setCyState] = useState({})

  const cyRef = useRef(null) 
  useEffect(() => {
    let cy =cytoscape({
      container: cyRef.current,
      elements:[
        { group: 'nodes', data: { id: '0' }, position: { x: 100, y: 100 } },
        { group: 'nodes', data: { id: '1' }, position: { x: 200, y: 200 } },
        { group: 'edges', data: { id: 'e0', source: '0', target: '1' } }
      ],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'green',
          },
        },
        {
          selector: 'edge',
          style: {
            'label': 'data(label)',
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        },
        {
          selector: '.eh-handle',
          style: {
            'background-color': 'red',
            'width': 12,
            'height': 12,
            'shape': 'ellipse',
            'overlay-opacity': 0,
            'border-width': 12, // makes the handle easier to hit
            'border-opacity': 0
          }
        },

        {
          selector: '.eh-hover',
          style: {
            'background-color': 'red'
          }
        },

        {
          selector: '.eh-source',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },

        {
          selector: '.eh-target',
          style: {
            'border-width': 2,
            'border-color': 'red'
          }
        },

        {
          selector: '.eh-preview, .eh-ghost-edge',
          style: {
            'background-color': 'red',
            'line-color': 'red',
            'target-arrow-color': 'red',
            'source-arrow-color': 'red'
          }
        },

        {
          selector: '.eh-ghost-edge.eh-preview-active',
          style: {
            'opacity': 0
          }
        },
        {
          selector: '.highlighted',
          style: {
          
            'background-color': '#61bffc',
            'line-color': '#61bffc',
            'target-arrow-color': '#61bffc',
            'transition-property': 'background-color, line-color, target-arrow-color',
            'transition-duration': '0.5s'
          
          }
        }
      ],
      layout: { name: 'grid' } // Adjust the layout as needed
    });
    let defaults = {
      hoverDelay: 150, // time spent hovering over a target node before it is considered selected
      snap: false, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
      snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
      snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
      noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
      disableBrowserGestures: true // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
    };
    setCyState(cy)
    let eh = cy.edgehandles( defaults );
    setEhState(eh)
    eh.enable();
    
    const handlerGraph = (event) => {
      if(event.target === event.cy){
        event.cy.add({
          group:'nodes',
          data:{id: `${event.cy.nodes().length}`},
          position: event.position
        })
          // Use cy.add to add the node to the Cytoscape instance
      }
    }
    cy.on('tap', handlerGraph);
    return () => {
      cy.removeListener('tap')
    }
  }, [])
 
  const resetBfs = () => {
    cyState.elements().removeClass('highlighted')
  }


  const startBfs = () => {
  let bfs = cyState.elements().bfs('#0', function(){}, true);
  let i = 0;
  const highlightNextEle = function(){
    if( i < bfs.path.length ){
      bfs.path[i].addClass('highlighted');
  
      i++;
      setTimeout(highlightNextEle, 1000);
    }
    // if( i < bfs.path.length ){
    //   bfs.path[i].addClass('highlighted');
  
    //   i++;
    //   setTimeout(highlightNextEle, 1000);
    // }
  
  };
  highlightNextEle()
  }
 
  

  const handlerCheckbox = (event) => {
    if(event.target.checked){
      ehState.enableDrawMode();
    }else{
      ehState.disableDrawMode();
    }
  }



  
  
  return (
    <div>
      <Navbar startBfs={() => startBfs()} resetBfs={() => resetBfs()} handlerCheckbox={handlerCheckbox} />
      <div ref={cyRef} style={{ height: '600px', backgroundColor: 'white', borderRadius: '55px' }} />

    </div>
  );
};

export default GraphCytoscape;
