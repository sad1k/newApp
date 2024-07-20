import React from 'react';
import s from './styles.module.css'

const Lesson = ({name}) => {
  return (
    <div className={s.lesson}>
      <h1>
        {name}
      </h1>
    </div>
  );
};

export default Lesson;