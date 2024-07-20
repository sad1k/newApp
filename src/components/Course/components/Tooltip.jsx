import { autoUpdate, useFloating } from "@floating-ui/react";
import { MathJax } from "better-react-mathjax";
import React, { useEffect, useRef, useState } from "react";

const Tooltip = ({ node, cy }) => {
  const [isOpen, setIsOpen] = useState(false);
  node.on("mouseover", () => setIsOpen(true));
  node.on("mouseout", () => setIsOpen(false));
  const [computedWidth, setComputedWidth] = useState(0);
  let tip = useRef(null);
  useEffect(() => {
    
    if (isOpen) {
      console.log(tip);
      setComputedWidth(() => parseInt(getComputedStyle(tip.current).width)/2);
    }
  }, [tip, isOpen]);

  return (
    <>
      {isOpen && (
        <div
          ref={tip}
          style={{
            position: "absolute",
            backgroundColor: "#b23c17",
            padding: "10px",
            borderRadius: "55px",
            left: `${cy.width() / 2 - computedWidth}px`,
            top: `10px`,
            opacity: '0.5'
          }}
        >Вы навелись на вершину <MathJax inline>{`\\(\\ v_{${node.data('id')}} \\)`}</MathJax></div>
      )}
    </>
  );
};

export default Tooltip;
