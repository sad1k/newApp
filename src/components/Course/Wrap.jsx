import { Button, styled } from '@mui/material';
import React, { useState } from 'react';
import s from "./styles.module.css";
import CoursePage from './CoursePage';

const Wrap = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const prevClickHandler = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => (prev -= 1));
    }
  };
  const nextClickHandler = () => {
    if (currentPage <= 12) {
      setCurrentPage((prev) => (prev += 1));
    }
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#ff5722"),
    backgroundColor: "#ff5722",
    "&:hover": {
      backgroundColor: "#ff9800",
      boxShadow: `0px 0px 50px -6px rgba(255,153,0,1)`,
    },
  }));

  return (
    <div className={s.container}>
      <div className={s.ButtonsBar}>
        <ColorButton onClick={prevClickHandler}>Пред.</ColorButton>
        <ColorButton onClick={nextClickHandler}>След.</ColorButton>
      </div>
      <CoursePage currentPage={currentPage} />
    </div>
  );
};

export default Wrap;