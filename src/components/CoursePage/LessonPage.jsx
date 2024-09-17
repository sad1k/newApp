import React, { useState } from "react";
import "./lesson.css";
import Markdown from "react-markdown";

const CourseContent = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);

  const courseData = [
    {
      title: "Введение в базы данных",
      lessons: [
        {
          title: "Что такое базы данных?",
          content:
            "База данных — это организованная коллекция структурированной информации, или данных, которая обычно хранится в электронной форме в компьютерной системе. Базы данных позволяют хранить, извлекать и управлять данными для различных приложений и пользователей.",
        },
        {
          title: "Типы баз данных",
          content:
            "Существует несколько типов баз данных, включая реляционные базы данных, документно-ориентированные базы данных, графовые базы данных и базы данных на основе ключ-значения. Каждый тип базы данных имеет свои особенности и применяется в зависимости от требований к данным и приложениям.",
        },
      ],
    },
    {
      title: "SQL основы",
      lessons: [
        {
          title: "SELECT запрос",
          content:
            "Команда SELECT используется для извлечения данных из базы данных. Пример базового SELECT-запроса: `SELECT * FROM users;` — этот запрос извлекает все записи из таблицы 'users'.",
        },
        {
          title: "INSERT запрос",
          content:
            "Команда INSERT используется для добавления новых записей в таблицу. Пример INSERT-запроса: `INSERT INTO users (name, age) VALUES ('Иван', 30);` — этот запрос добавляет новую запись с именем 'Иван' и возрастом 30 в таблицу 'users'.",
        },
      ],
    },
  ];

  return (
    <div className="course-container">
      <div className="sidebar">
        <h2>Содержание</h2>
        <ul>
          {courseData.map((section, sectionIndex) => (
            <li key={sectionIndex}>
              <h3>{section.title}</h3>
              <ul>
                {section.lessons.map((lesson, lessonIndex) => (
                  <li
                    key={lessonIndex}
                    onClick={() => setSelectedLesson(lesson)}
                    className={selectedLesson === lesson ? "active" : ""}
                  >
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        {selectedLesson && (
          <>
            <h2>{selectedLesson.title}</h2>
            <Markdown>{selectedLesson.content}</Markdown>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseContent;
