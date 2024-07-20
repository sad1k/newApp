import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import { fetchArticles } from "../../http/articleAPI";
import { useParams } from "react-router-dom";
import Module from "./Module";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(() => {
    fetchArticles().then((data) => {
      console.log(data, id)
      setCourse(() => ({ ...(data.filter((course) => +course.id === +id)[0])}));
    });
  }, [id]);

  const modules = [{name: 'Что такое база данных?', lessons: ['Основные понятия', 'Типы баз данных']}, 
 {name: 'Знакомство с реляционными базами данных', lessons: ['Реляционная модель данных', 'Основные принципы нормализации']},
 {name: 'Установка и настройка PostgreSQL', lessons: ['Установка PostgreSQL на различных платформах (Windows, macOS, Linux)', 'Первоначальная настройка и запуск сервера']},
 {name: 'Инструменты для работы с PostgreSQL', lessons: ['Командная строка psql', 'GUI-интерфейсы (pgAdmin, DBeaver)']}

]

  return (
    <>
      {course ? (
        <div >
          <div className={s.headerCourse}>
            <span>
              <h1>{course.title}</h1>
              <p>{course.description}</p>
            </span>
            <span>
              <img
                src={
                  "data:image/png;base64,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"
                }
                alt=""
                className={s.imageCourse}
              />
            </span>
          </div>
          <div className={s.content}>
          {
            modules.map((module) => <Module name={module.name} lessons={module.lessons} />)
          }
          </div>
        </div>
      ) : (
        false
      )}
    </>
  );
};

export default CoursePage;
