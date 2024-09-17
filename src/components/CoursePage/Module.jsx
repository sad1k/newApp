import React from "react";
import s from "./styles.module.css";
import Lesson from "./Lesson";
import TestTab from "./TestTab";

const Module = ({ name, lessons, tests, onClickTest, onClickLesson }) => {

  
  return (
    <div>
      <div className={s.moduleHeader}>
        <h1>{name}</h1>
      </div>
      <div>
        <>
          {lessons.map((lesson) => (
            <Lesson   key={lesson.id}
            title={lesson.title}
            completed={lesson.completed}
            onClick={() => onClickLesson(lesson.id)} />
          ))}
        </>
        <>
          {tests.map((test) => (
            <TestTab
              onClick={() => onClickTest(test.id)}
              title={test.title}
              completed={test.completed}
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Module;
