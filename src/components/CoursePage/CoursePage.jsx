import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
// Подключите функцию для получения курса
import { useParams } from "react-router-dom";
import Module from "./Module";
import { fetchCourseById } from "../../http/courseApi";

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const handleLessonClick = (id) => {
    localStorage.setItem(`lesson-${id}`, true);
    setCourse({ ...course });
  };

  const handleTestClick = (id) => {
    localStorage.setItem(`test-${id}`, true);
    setCourse({ ...course });
  };

  useEffect(() => {
    // Функция для получения данных о курсе
    const getCourse = async () => {
      try {
        const data = await fetchCourseById(id); // Предполагаем, что fetchCourse получает курс по ID
        setCourse(data);
      } catch (error) {
        console.error("Ошибка запроса курса", error);
      }
    };

    getCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>; // Можно добавить индикатор загрузки
  }

  return (
    <div className={s.coursePage}>
      <div className={s.headerCourse}>
        <span>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
        </span>
        <span>
          <img
            src={"http://localhost:5000/" + course.img} // Предполагается, что курс имеет поле image
            alt={course.title}
            className={s.imageCourse}
          />
        </span>
      </div>
      <div className={s.content}>
        {course.modules.map((module, index) => (
          <Module
            key={module.id}
            number={index + 1}
            onClickLesson={handleLessonClick}
            onClickTest={handleTestClick}
            name={module.name}
            lessons={module.lessons}
            tests={module.tests}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
