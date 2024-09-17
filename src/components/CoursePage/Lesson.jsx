import React from 'react';
import s from './styles.module.css'

const Lesson = ({ title, completed, onClick }) => {
  return (
    <div className={`${s.lesson} ${completed ? s.completed : ''}`} onClick={onClick}>
      {title}
    </div>
  );
};

export default Lesson;

