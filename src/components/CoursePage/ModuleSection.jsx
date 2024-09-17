import { useState } from "react";
import Lesson from "./Lesson";

export const ModuleSection = ({ index, createLesson, module, handleLessonName, handleContentChange }) => {
  const [lessonName, setLessonName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="module">
      <h3>{module.name}</h3>
      <div className="form-group">
        <label htmlFor={`lesson-title-${index}`}>Название урока:</label>
        <input
          type="text"
          id={`lesson-title-${index}`}
          value={lessonName}
          onChange={(e) => {
            handleLessonName(e);
            setLessonName(e.target.value);
          }}
        />
        <textarea
          className="lesson-content"
          id={`lesson-content-${index}`}
          value={content}
          onChange={(e) => {
            handleContentChange(e);
            setContent(e.target.value);
          }}
        />
        <button onClick={() => createLesson(index)}>Создать урок</button>
      </div>
      <div className="lessons">
        {module.lessons.map((lesson, lessonIndex) => (
          <Lesson
            key={lessonIndex}
            title={lesson.name}
            content={lesson.content}
          />
        ))}
      </div>
    </div>
  );
};
