import React, { useRef, useEffect, useState } from "react";

import { useAuthContext } from "../../contexts/authContext/authContextProvider";
import ActivityCalendar from "react-activity-calendar";
import { getProfile } from "../../http/userAPI";
import { Tooltip } from "@mui/material";
import axios from "axios";

// TODO: ПРОБЛЕМА С ДНЯМИ их 364
function makeData(user) {
  try {
    let data = {};
    for (const comment of user.comments) {
      let date = new Date(comment.createdAt);
      if (data[date]) {
        data[date].count += 1;
        data[date].level = Math.ceil(data[date].count / 5);
      } else {
        data[date] = {
          date: `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(
            2,
            "0"
          )}-${(date.getDate() + 1 + "").padStart(2, "0")}`,
          count: 1,
          level: 1,
        };
      }
    }
    for (const likes of user.likes) {
      let date = new Date(likes.createdAt);
      if (data[date]) {
        data[date].count += 1;
        data[date].level = Math.ceil(data[date].count / 5);
      } else {
        data[date] = {
          date: `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(
            2,
            "0"
          )}-${(date.getDate() + 1 + "").padStart(2, "0")}`,
          count: 1,
          level: 1,
        };
      }
    }
    for (const articles of user.articles) {
      let date = new Date(articles.createdAt);
      if (data[date]) {
        data[date].count += 1;
        data[date].level = Math.ceil(data[date].count / 5);
      } else {
        data[date] = {
          date: `${date.getFullYear()}-${(date.getMonth() + 1 + "").padStart(
            2,
            "0"
          )}-${(date.getDate() + 1 + "").padStart(2, "0")}`,
          count: 1,
          level: 1,
        };
      }
    }
    let zeroDate = new Date();
    console.log(zeroDate);
    zeroDate.setMonth(0);
    zeroDate.setDate(0);
    let dataArray = [];
    for (let i = 0; i < 365; i++) {
      zeroDate.setDate(zeroDate.getDate() + 1);
      const formattedDate = `${zeroDate.getFullYear()}-${(
        zeroDate.getMonth() +
        1 +
        ""
      ).padStart(2, "0")}-${(zeroDate.getDate() + 1 + "").padStart(2, "0")}`;
      if (!data[formattedDate]) {
        data[formattedDate] = {
          date: formattedDate,
          count: 0,
          level: 0,
        };
      }
      dataArray.push(data[formattedDate]);
    }
    return dataArray;
  } catch (error) {
    console.error(error)
  }
}

const ProfileContributeBar = ({ id }) => {
  let [myData, setData] = useState(null);
  useEffect(() => {
    const resp = axios.get("https://github-contributions-api.jogruber.de/v4/sad1k?y=2024").then(resp => {
      setData(resp.data.contributions)
    })
  }, []);
  return (
    <>
      {!myData ? (
        <ActivityCalendar loading />
      ) : (
        <ActivityCalendar
          data={myData}
          renderBlock={(block, activity) => (
            <Tooltip
              title={`${activity.count} активностей на ${activity.date}`}
              arrow
            >
              {block}
            </Tooltip>
          )}
        />
      )}
    </>
  );
};

export default ProfileContributeBar;
