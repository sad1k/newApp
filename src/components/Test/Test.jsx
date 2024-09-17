import React, { useState, useEffect } from "react";
import { Button, styled } from "@mui/material";
import { green, red } from "@mui/material/colors";
import axios from "axios"; // Убедитесь, что axios установлен и подключен
import "./styles.css";
import { $authHost } from "../../http";
import { useNavigate, useParams } from "react-router-dom";

export const Test = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [result1, setResult1] = useState(false);
  const [result2, setResult2] = useState(false);

  const handleCheck = () => {
    if (question.answers.toLowerCase().includes(answer1.toLowerCase().trim())) {
      setResult1(true);
    }
    if (question.answers.toLowerCase().includes(answer2.toLowerCase().trim())) {
      setResult2(true);
    }

    if (result1 && result2) {
      navigate('/')
    }
  };

  useEffect(() => {

    const fetchTestData = async () => {
      try {
        const response = await $authHost.get("/api/createCourse/tests/" + id);
        const data = response.data;
        setQuestion(data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchTestData();
  }, []);

  const GreenButton = styled(Button)(({ theme }) => ({
    padding: "20px",
    margin: "10px",
    width: "30%",
    color: "white",
    fontWeight: 700,
    backgroundColor: green.A700,
  }));

  const RedButton = styled(Button)(({ theme }) => ({
    padding: "20px",
    margin: "10px",
    width: "30%",
    color: "white",
    fontWeight: 700,
    backgroundColor: red.A700,
  }));

  return (
    <div className="testPage">
      <RedButton onClick={() => (window.location.href = "/")}>Выход</RedButton>
      <h1>Вставьте пропущенные слова</h1>
      <p>{question.description}</p>
      <p>
        Поле для ответа 1:{" "}
        <input
          type="text"
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
        />
        {result1 !== null && (
          <span className={result1 ? "correct" : "incorrect"}>
            {result1 ? "Правильно" : "Неправильно"}
          </span>
        )}
      </p>
      <p>
        Поле для ответа 2:{" "}
        <input
          type="text"
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
        />
        {result2 !== null && (
          <span className={result2 ? "correct" : "incorrect"}>
            {result2 ? "Правильно" : "Неправильно"}
          </span>
        )}
      </p>

      <GreenButton onClick={handleCheck}>Подтвердить</GreenButton>
    </div>
  );
};
