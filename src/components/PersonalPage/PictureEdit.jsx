import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import Person2Icon from "@mui/icons-material/Person2";
import axios from "axios";
import { uploadAvatar } from "../../http/userAPI";
import { useAuthContext } from "../../contexts/authContext/authContextProvider";
import ProfileImage from "./ProfileImage";

const PictureEdit = () => {
  const [drag, setDrag] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      console.log(user);
      setAvatar(user.avatar);
    }
  }, [user]);

  function dragStartHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!drag) {
      setDrag(true);
    }
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    if (drag) {
      console.log("123");
      setDrag(false);
    }
  }

  function onDropHandler(e) {
    console.log("drop");
    e.preventDefault();
    let files = [...e.dataTransfer.files];

    const formData = new FormData();
    if (files.length) {
      formData.append("avatar", files[0]);
      uploadAvatar(formData).then((res) => {
        setAvatar(res.avatar);
      });
      setDrag(false);
    }
  }

  return (
    <div>
      <div className={s.bgWrapper}>
        <div className={s.background}></div>
      </div>
      <div className={s.container}>
        <div className={s.changeImageBox}>
          <div
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragStart={(e) => dragStartHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
            className={s.loadImage + (drag ? " " + s.dragging : "")}
          >
            <ProfileImage avatar={avatar} />
            <label for="profileImage">
              Загрузите картинку
              <input
                id="profileImage"
                type="file"
                className={s.loadImageInput}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PictureEdit;
