import React from 'react';

const Circle = ({color}) => {
  return (
    <span>
                <svg
                  width="30"
                  height="30"
                  style={{ margin: "auto 0px", position: "relative" }}
                >
                  <g>
                    <circle cx="15" cy="15" r="10" fill={`${color}`}></circle>
                  </g>
                </svg>
              </span>
  );
};

export default Circle;