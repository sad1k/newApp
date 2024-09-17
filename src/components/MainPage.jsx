import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import FilterBar from "./FilterBar";
import { Button, Pagination, Skeleton, styled, Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { useAuthContext } from "../contexts/authContext/authContextProvider";
import { green } from "@mui/material/colors";
import { fetchCourses } from "../http/courseApi";

const filterTitles = (searchText, titleList) => {
  if (!searchText) {
    return titleList;
  }
  return titleList.filter((elem) =>
    elem.title.toLowerCase().includes(searchText.toLowerCase())
  );
};

const MainPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [rawCourses, setRawCourses] = useState([]);
  const [courses, setCourses] =  useState(rawCourses);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setCourses(filterTitles(searchTerm, rawCourses));
  }, [searchTerm])

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const data = await fetchCourses();
        setRawCourses(data);
        setCourses(data)
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке курсов", error);
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const GreenButton = styled(Button)(({ theme }) => ({
    padding: "20px",
    margin: '10px',
    width: "30%",
    color: "white",
    fontWeight: 700,
    backgroundColor: green.A700,
    "&:hover": {
      backgroundColor: green.A400,
      boxShadow: "0px 0px 28px 2px rgb(153, 255, 102)",
    },
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
        justifyContent: "center",
      }}
    >
      <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div style={{ textAlign: "center" }}>
        <Typography variant="h2">Курсы</Typography>
        <GreenButton onClick={() => navigate('/create-course')}>Создать курс</GreenButton>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          columnGap: "20px",
          rowGap: "10px",
        }}
      >
        {isLoading
          ? [0, 1, 2, 3, 4, 5].map((_) => (
              <Skeleton
                key={_}
                variant="rounded"
                width={Math.floor(window.innerWidth / 3) - 80}
                height={440}
              />
            ))
          : courses.map((course) => (
              <ArticleCard
                id={course.id}
                key={course.id}
                title={course.title}
                description={course.description}
                date={new Date(course.createdAt).toLocaleDateString()}
                url={"http://localhost:5000/" + course.img}
              />
            ))}
      </div>
      {/* <Pagination
        onChange={(e) => {
          setCurrentPage(() => e.target.ariaLabel.at(-1));
        }}
        page={+currentPage}
        style={{ alignSelf: "center" }}
        count={Math.ceil(courses.length / 10)}
        color="secondary"
      /> */}
    </div>
  );
};

export default MainPage;
