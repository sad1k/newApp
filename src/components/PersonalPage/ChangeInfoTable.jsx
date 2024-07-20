import React, { useState } from "react";
import s from "./styles.module.css";
import { Button, MenuItem, TextField, styled } from "@mui/material";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#29293d",
    borderRadius: "15px",
    margin: "0px",
  },
});

const countryCodes = [
  {
    value: "7",
    label: "+7",
    country: "Russia",
  },
  {
    value: "30",
    label: "+30",
    country: "Africa",
  },
  {
    value: "308",
    label: "+308",
    country: "Mongolia",
  },
  {
    value: "93",
    label: "+93",
    country: "Germany",
  },
];

const ChangeInfoTable = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={s.section}>
      <div className={s.title}>Basic Info</div>
      <div>
        <div className={s.rowWrapper}>
          <div className={s.content}>
            <div className={s.rowTitle}>Name</div>
            {isEdit ? (
              <div>
                <CssTextField placeholder="Name" label="Name" />
                <div>
                  <button>Save</button>
                  <button>Cancel</button>
                </div>
              </div>
            ) : (
              <div className={s.desc}>Heavisde</div>
            )}
            <div className={s.rightWrapper}>
              <button className={s.editButton}>Edit</button>
            </div>
          </div>
        </div>

        <div>
          <CssTextField placeholder="Surname" label="Last Name" fullWidth />
        </div>
        <div>
          <CssTextField placeholder="Usename" label="Username" fullWidth />
        </div>
        <div>
          <CssTextField
            placeholder="mail@example.com"
            label="Email"
            fullWidth
          />
        </div>
        {/* <div className={s.profile}>
        </div> */}
        <div>
          <h1>Personal profile info</h1>
        </div>
        <div className={s.phoneInput}>
          <CssTextField select>
            {countryCodes.map((code) => (
              <MenuItem key={code.value} value={code.value}>
                {code.label}
              </MenuItem>
            ))}
          </CssTextField>
          <CssTextField
            placeholder="Personal phone number"
            label="Phone number"
          />
        </div>
        <div className={s.phoneInput}>
          <CssTextField select>
            {countryCodes.map((code) => (
              <MenuItem key={code.value} value={code.value}>
                {code.label}
              </MenuItem>
            ))}
          </CssTextField>
          <CssTextField
            placeholder="Work phone number"
            label="Work Phone number"
          />
        </div>
        <div style={{ width: "100%" }}>
          <CssTextField placeholder="" label="Country, city" fullWidth />
        </div>
        <div style={{ width: "100%" }}>
          <CssTextField placeholder="" label="Organization" fullWidth />
        </div>

        {/* <div className={s.profile + ' ' + s.personalInfo}>
        </div> */}
        <div>
          <h1>Password</h1>
        </div>
        <div>
          <CssTextField
            type="password"
            placeholder=""
            label="Old password"
            fullWidth
          />
        </div>
        <div>
          <CssTextField
            type="password"
            placeholder=""
            label="New password"
            fullWidth
          />
        </div>
        <div>
          <CssTextField
            type="password"
            placeholder=""
            label="Confirm new password"
            fullWidth
          />
        </div>
        <div>
          <Button variant="outlined" fullWidth>
            Correct. Save info!
          </Button>
        </div>
        {/* <div className={s.password}>
        </div> */}
      </div>
    </div>
  );
};

export default ChangeInfoTable;
