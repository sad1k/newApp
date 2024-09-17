import React from 'react';
import s from './styles.module.css'

const Lesson = ({ module, number, title, completed, onClick }) => {
  return (
    <div className={`${s.lesson} ${completed ? s.completed : ''}`} onClick={onClick}>
      {`Урок ${module ?? ''}.${number ?? ''}: ${title}`}
    </div>
  );
};

export default Lesson;

