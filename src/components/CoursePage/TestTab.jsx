import React from 'react';
import './styles2.css'

const TestTab = ({completed, title, onClick}) => {
  console.log(title)
  return (
    <div className={`test ${completed ? 'completed' : ''}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default TestTab;