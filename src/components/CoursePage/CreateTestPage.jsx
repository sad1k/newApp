// src/pages/CreateTestPage.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { fetchCourseById, fetchCourses } from "../../http/courseApi";
import { $authHost } from "../../http";

const CreateTestPage = () => {
  const [courses, setCourses] = useState([]);
  const [modules, setModules] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [testTitle, setTestTitle] = useState("");
  const [answers, setAnswers] = useState("");
  const [testQuestions, setTestQuestions] = useState("");

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error("Ошибка при получении курсов", error);
      }
    };

    fetchAllCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedModule){
      return
    }
    try {
      await $authHost.post(`/api/createCourse/modules/${selectedModule}/tests`, {name: testTitle, description: testQuestions, answers: answers});
      alert("Тест создан!");
    } catch (error) {
      console.error("Ошибка при создании теста", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Создать тест</h1>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <InputLabel id="course-select-label">Курс</InputLabel>
          <Select
            labelId="course-select-label"
            value={selectedCourse}
            onChange={(e) => {
              fetchCourseById(e.target.value).then(data => {
                setModules(data.modules);
              });
              setSelectedCourse(e.target.value);
            }}
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="module-select-label">Модуль</InputLabel>
          <Select
            labelId="module-select-label"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            disabled={!selectedCourse}
          >
            {modules.map((module) => (
              <MenuItem key={module.id} value={module.id}>
                {module.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Название теста"
          value={testTitle}
          onChange={(e) => setTestTitle(e.target.value)}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Вопрос теста"
          value={testQuestions}
          onChange={(e) => setTestQuestions(e.target.value)}
          multiline
          rows={4}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Ответы"
          value={answers}
          onChange={(e) => setAnswers(e.target.value)}
          multiline
          rows={4}
        />
        <Button type="submit" variant="contained" color="primary">
          Создать тест
        </Button>
      </form>
    </div>
  );
};

export default CreateTestPage;
