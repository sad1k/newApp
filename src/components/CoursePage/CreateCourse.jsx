import React, { useState } from "react";
import Markdown from "react-markdown";
import "./coursecreator.css";
import rehypeRaw from "rehype-raw";

const Lesson = ({ title, content }) => (
  <div className="lesson">
    <h4>{title}</h4>
  </div>
);

const CourseCreator = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseContent, setCourseContent] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [modules, setModules] = useState([]);
  const [image, setImage] = useState("");

  const handleTitleChange = (event) => {
    setCourseTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setCourseDescription(event.target.value);
  };

  const handleContentChange = (event) => {
    setCourseContent(event.target.value);
  };

  const handleLessonName = (e) => {
    setLessonName(e.target.value);
  };

  const handleModuleName = (e) => {
    setModuleName(e.target.value);
  };

  const createModule = () => {
    setModules((prev) => [...prev, { name: moduleName, lessons: [] }]);
    setModuleName("");
  };

  const createLesson = (index) => {
    setModules((prev) => {
      const updatedModules = [...prev];
      updatedModules[index].lessons.push({ name: lessonName, content: courseContent });
      return updatedModules;
    });
    setLessonName("");
    setCourseContent("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result); // Здесь сохраняем файл для последующей отправки
    }
  };

  const handleCreateCourse = async () => {
    const url = "http://localhost:5000"
    try {
      // Создание курса
      const formData = new FormData();
      formData.append("title", courseTitle);
      formData.append("description", courseDescription);
      formData.append("img", image); // Добавляем картинку

      const courseResponse = await fetch(url + "/api/createCourse/courses", {
        method: "POST",
        body: formData,
      });

      if (!courseResponse.ok) {
        throw new Error("Не удалось создать курс");
      }

      const courseData = await courseResponse.json();
      const courseId = courseData.id;

      // Создание модулей и уроков
      for (const module of modules) {
        // Создаем модуль
        const moduleResponse = await fetch(`${url}/api/courses/${courseId}/modules`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: module.name }),
        });

        if (!moduleResponse.ok) {
          throw new Error("Не удалось создать модуль");
        }

        const moduleData = await moduleResponse.json();
        const moduleId = moduleData.id;

        // Создаем уроки для каждого модуля
        for (const lesson of module.lessons) {
          await fetch(`${url}/api/modules/${moduleId}/lessons`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: lesson.name, content: lesson.content }),
          });
        }
      }

      alert("Курс успешно создан!");

    } catch (error) {
      console.error(error);
      alert("Ошибка при создании курса");
    }
  };

  return (
    <div className="course-creator">
      <h2>Создание курса</h2>
      <div className="form-group">
        <label htmlFor="course-image">Картинка курса:</label>
        <input onChange={handleImageChange} type="file" id="course-image" />
        <label htmlFor="course-title">Название курса:</label>
        <input
          type="text"
          id="course-title"
          value={courseTitle}
          onChange={handleTitleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="course-description">Описание курса:</label>
        <input
          type="text"
          id="course-description"
          value={courseDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="module-name">Название модуля:</label>
        <input
          type="text"
          id="module-name"
          value={moduleName}
          onChange={handleModuleName}
        />
        <button onClick={createModule}>Создать модуль</button>
      </div>
      <div className="course-content">
        {modules.map((module, index) => (
          <div key={index} className="module">
            <h3>{module.name}</h3>
            <div className="form-group">
              <label htmlFor={`lesson-title-${index}`}>Название урока:</label>
              <input
                type="text"
                id={`lesson-title-${index}`}
                value={lessonName}
                onChange={handleLessonName}
              />
              <textarea
                className="lesson-content"
                id={`lesson-content-${index}`}
                value={courseContent}
                onChange={handleContentChange}
              />
              <button onClick={() => createLesson(index)}>Создать урок</button>
            </div>
            <div className="lessons">
              {module.lessons.map((lesson, lessonIndex) => (
                <Lesson key={lessonIndex} title={lesson.name} content={lesson.content} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <h2>Предпросмотр</h2>
      <div className="preview">
        <Markdown rehypePlugins={[rehypeRaw]}>{courseContent}</Markdown>
      </div>
      <button onClick={handleCreateCourse}>Создать курс</button>
    </div>
  );
};

export default CourseCreator;
