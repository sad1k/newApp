import React from "react";
import s from "./About.module.css";
import { MySwiper } from "./Swiper";
import { Button, styled } from "@mui/material";
import { orange, purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate()

  const OrangeButton = styled(Button)(({ theme }) => ({
    padding: "20px",
    width: "30%",
    color: "white",
    backgroundColor: purple.A400,
    "&:hover": {
      backgroundColor: purple.A200,
      boxShadow: "0px 0px 28px 2px rgba(214,51,214,1)",
    },
  }));

  return (
    <div>
      <header>
        <h1>Добро пожаловать на GraphAlgoVis!</h1>
        <div className={s.studyModule}>
          <p>
            Изучение курсов на нашем сайте предоставит вам уникальную
            возможность освоить теорию графов в удобном и интерактивном формате,
            также на нашем сайте имеются и другие курсы.
            <p>
              Начните сегодня и откройте для себя новые горизонты знаний и
              навыков, которые помогут вам в учебе и карьере.
            </p>
            <p>
              Зарегистрируйтесь сейчас и сделайте первый шаг к своему успеху!
            </p>
          </p>
          <OrangeButton variant="contained" onClick={() => navigate('/register')}>Начать обучение</OrangeButton>
        </div>
      </header>
      <div>
        <MySwiper />
      </div>
    </div>
  );
};

export default About;
