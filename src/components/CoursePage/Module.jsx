import React from "react";
import s from "./styles.module.css";
import Lesson from "./Lesson";

const Module = ({ name, lessons }) => {
  return (
    <div>
      <div className={s.moduleHeader}>
        <h1>{name}</h1>
      </div>
      <div>
        {lessons.map((name) => (
          <Lesson name={name} />
        ))}
      </div>
    </div>
  );
};

export default Module;
