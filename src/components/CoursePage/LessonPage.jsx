import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Для получения параметров из URL
import Markdown from "react-markdown"; // Для рендеринга контента в формате Markdown
import "./lesson.css"; // Подключение стилей
import { $authHost } from "../../http";
import { Button } from "@mui/material";

const LessonPage = () => {
  const { id } = useParams(); // Получаем lessonId из URL
  const [lesson, setLesson] = useState(null); // Состояние для хранения данных урока
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState(null); // Состояние ошибки
  const navigate = useNavigate()

  useEffect(() => {
    // Функция для получения данных о конкретном уроке
    const fetchLesson = async () => {
      try {
        const response = await $authHost.get(`/api/createCourse/lessons/${id}`);
        const data = response.data;
        setLesson(data); // Устанавливаем данные урока
      } catch (err) {
        setError(err.message); // Устанавливаем сообщение об ошибке
      } finally {
        setLoading(false); // Отключаем индикатор загрузки
      }
    };

    fetchLesson(); // Вызываем функцию для получения данных урока
  }, []); // Обновляем данные при изменении lessonId

  if (loading) {
    return <div>Загрузка урока...</div>; // Отображение индикатора загрузки
  }

  if (error) {
    return <div>Ошибка: {error}</div>; // Отображение сообщения об ошибке
  }

  return (
    <div className="course-container">
      <div className="content">
        {lesson && (
          <>
            <h2>{lesson.name}</h2> {/* Отображаем название урока */}
            <Markdown>{lesson.content}</Markdown> {/* Отображаем контент в формате Markdown */}
          </>
        )}
        <Button onClick={() => navigate(-1)}>Назад</Button>
      </div>
    </div>
  );
};

export default LessonPage;
