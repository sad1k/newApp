import React from "react";
import s from "./styles.module.css";
import Lesson from "./Lesson";
import TestTab from "./TestTab";
import { useNavigate } from "react-router-dom";

const Module = ({
  number,
  name,
  lessons,
  tests,
  onClickTest,
  onClickLesson,
}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={s.moduleHeader}>
        <h1>{`Модуль ${number}: ${name}`}</h1>
      </div>
      <div>
        <>
          {lessons.map((lesson, index) => (
            <Lesson
              key={lesson.id}
              number={index + 1}
              module={number}
              title={lesson.name}
              completed={
                localStorage.getItem(`lesson-${lesson.id}`) ? true : false
              }
              onClick={() => {
                navigate("/lesson/"+ lesson.id);
                onClickLesson(lesson.id);
              }}
            />
          ))}
        </>
        <>
          {tests?.map((test, index) => (
            <TestTab
              onClick={() => {
                onClickTest(test.id);
                navigate("/tests/" + test.id);
              }}
              title={test.name}
              number={index + 1}
              module={number}
              completed={localStorage.getItem(`test-${test.id}`) ? true : false}
            />
          ))}
        </>
      </div>
    </div>
  );
};

export default Module;
