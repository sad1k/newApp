import React from 'react';
import './styles2.css'

const TestTab = ({module, number, completed, title, onClick}) => {
  console.log(completed)
  return (
    <div className={`test ${completed ? 'completed' : ''}`} onClick={onClick}>
      {`Тест ${module}.${number}: ${title}`}
    </div>
  );
};

export default TestTab;