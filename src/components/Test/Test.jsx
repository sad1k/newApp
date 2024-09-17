import React, { useState } from "react";
import { Button, styled } from "@mui/material";
import { green, red } from "@mui/material/colors";
import "./styles.css";

export const Test = () => {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [result1, setResult1] = useState(null);
  const [result2, setResult2] = useState(null);

  const correctAnswers = ["база данных", "Система управления базами данных"];

  const handleCheckAnswers = () => {
    setResult1(answer1.toLowerCase() === correctAnswers[0].toLowerCase());
    setResult2(answer2.toLowerCase() === correctAnswers[1].toLowerCase());
  };

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
      <RedButton onClick={handleCheckAnswers}>Выход</RedButton>
      <h1>Вставьте пропущенные слова</h1>
      <p>
        Закончите предложение: "В ________(1) хранятся организованные данные,
        позволяющие эффективно их извлекать, обрабатывать и управлять ими. Она
        представляет собой структурированную коллекцию информации, доступную
        для различных пользователей и приложений. _______(2) обеспечивает
        целостность данных, а также контролирует доступ к ним, предотвращая
        несанкционированные изменения."
      </p>
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

      <GreenButton onClick={handleCheckAnswers}>Подтвердить</GreenButton>
    </div>
  );
};
