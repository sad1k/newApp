import React from 'react';
import s from './styles.module.css'
import PersonIcon from '@mui/icons-material/Person';

const ProfileImage = ({avatar}) => {
    return (
        <div className={s.profileImage}>
        <figure>
          {avatar !== null ? (
            <img
              src={`${process.env.REACT_APP_API_URL}${avatar}`}
              alt="Your profile"
            />
          ) : (
            <PersonIcon  sx={{ fontSize: 100 }}/>
          )}
        </figure>
      </div>
    );
};

export default ProfileImage;