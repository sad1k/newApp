import React from 'react';

const Line = () => {
  return (
    <span>
                <svg width="30" height="30" style={{ margin: "auto 0px" }}>
                  <g>
                    <line
                      x1="5"
                      y1="25"
                      x2="25"
                      y2="5"
                      stroke="#888"
                      strokeWidth="2px"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></line>
                  </g>
                </svg>
              </span>
  );
};

export default Line;