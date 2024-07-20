import React, { useEffect, useState } from "react";
import s from "./styles.module.css";
import {
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import ChangeInfoTable from "./ChangeInfoTable";
import PictureEdit from "./PictureEdit";

const PersonalPage = () => {
  const [page, setPage] = useState("image");

  return (
    <div>
      <PictureEdit />
      <div className={s.page}>
      <div className={s.sidebar}>
          <div>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setPage("settings")}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile & password settings" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setPage("image")}>
                    <ListItemIcon>
                      <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile image" />
                  </ListItemButton>
                </ListItem>
              </List>
            </nav>
          </div>
        </div>
        <ChangeInfoTable />
      </div>
    </div>
  );
};

export default PersonalPage;
