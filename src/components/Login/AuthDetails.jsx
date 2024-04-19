import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import s from '../../App.module.css'


const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)
    useEffect(() => {
        const listen  = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            }
        })
        return () => {
            listen()
        }
    },[])

    function useSignOut(e){
        signOut(auth)
        .then(() => console.log('success'))
    }

    return (
        <div>
            {authUser ? 
            <div>
                {`Signed in as ${authUser.email}`}
                <Button onClick={useSignOut}>Sign Out</Button>
               
            </div> 
            :
            <NavLink
            to="/login"
            className={({ isActive, isPending }) =>
              isPending ? s.pending : isActive ? s.active : s.link
            }
          >
            Login
          </NavLink>
            }
        </div>
    );
};

export default AuthDetails;