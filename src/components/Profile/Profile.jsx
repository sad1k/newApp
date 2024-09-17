import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import ProfileImage from "../PersonalPage/ProfileImage";
import { useAuthContext } from "../../contexts/authContext/authContextProvider";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileContributeBar from "./ProfileContributeBar";
import dji from "./dji.json";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import StarIcon from "@mui/icons-material/Star";
import { useParams } from "react-router-dom";
import { getProfile } from "../../http/userAPI";
import { fetchCourses } from "../../http/courseApi";

function getClassName(role){
  if(!role){
    return ''
  }
  if(role === 'ADMIN'){
    return s.adminRole
  }

  if(role === 'creator'){
    return s.creatorRole
  }

  if(role === 'user'){
    return s.userRole
  }
}


const Profile = (props) => {
  const { id } = useParams();
  const { user, toggleSetUser } = useAuthContext();
  const [extendedUser, setExtendedUser] = useState(null)
  const [courses, setCourses] = useState([]);
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
    }
    getProfile(id).then((data) => {
      setExtendedUser(data.user)
    })

  }, []);


  useEffect(() => {
    fetchCourses().then(data => setCourses(data))
  }, [])


  return (
    <div className={s.profileGrid}>
      <div className={s.profileGridItem1 + " " + s.gridItem}>
        <ProfileImage avatar={avatar} />
        Ваша роль
        <div className={getClassName(user.role)}>
          {user && user?.role && 'user'}
        </div>
        <Button startIcon={<EditIcon />} variant="contained" color="success">
          Изменить настройки
        </Button>
        <div className={s.innerProfileGridItem}>Обо мне:</div>
        <div className={s.innerProfileGridItem}>
          <StarIcon />
          Репутация: 0
        </div>
        <div className={s.innerProfileGridItem}>
          <ChatBubbleIcon color="secondary" />
          Комментариев: {0 && extendedUser && extendedUser.comments.length}
        </div>
        <div className={s.innerProfileGridItem}>
          <VisibilityIcon variant="outlined" color="primary" />
          Просмотры: 0
        </div>
      </div>
      <div className={s.profileGridItem2 + " " + s.gridItem }>
        <h1>Nickname: {user && user.email}</h1>
      </div>
      <div className={s.profileGridItem3 + " " + s.gridItem}>
        <h2>Твой прогресс: <span style={{color:'lightgreen'}}>A+</span></h2>
      </div>
      <div className={s.profileGridItem4 + " " + s.gridItem + " " + s.center}>
        <h2>Активность за последний год</h2>
        {user && <ProfileContributeBar  id={id}/>}
      </div>
      <div className={s.profileGridItem5 + " " + s.gridItem}>
        <h2>Пройденные курсы</h2>
        <div>
          {courses && courses.map((course) => (
            <h1 key={course.id}>{course.title}</h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
