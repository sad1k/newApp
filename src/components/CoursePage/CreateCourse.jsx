import React, { useState } from "react";
import Markdown from "react-markdown";
import "./coursecreator.css";
import rehypeRaw from "rehype-raw";
import {
  createCourse,
  createLessonApi,
  createModuleApi,
} from "../../http/courseApi";
import { ModuleSection } from "./ModuleSection";

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
      updatedModules[index].lessons.push({
        name: lessonName,
        content: courseContent,
      });
      return updatedModules;
    });
    setLessonName("");
    setCourseContent("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleCreateCourse = async () => {

    // Создание курса
    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("description", courseDescription);
    formData.append("img", image); // Добавляем картинку
    let courseResponse;

    courseResponse = await createCourse(formData);

    const courseData = courseResponse
    const courseId = courseData.id;

    // Создание модулей и уроков
    for (const module of modules) {
      try {
        const moduleResponse = await createModuleApi(courseId, module.name);
        const moduleData = moduleResponse;
        const moduleId = moduleData.id;

        for (const lesson of module.lessons) {
          await createLessonApi(moduleId, lesson.name, lesson.content);
        }
      } catch (error) {
        alert("Ошибка в создании модуля");
      }
    }

    alert("Курс успешно создан!");
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
          <ModuleSection key={index} index={index} module={module} createLesson={createLesson} handleLessonName={handleLessonName} handleContentChange={handleContentChange} />
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
