import { Alert, Fade } from '@mui/material';
import React from 'react';

const MyAlert = ({alertInfo, setAlertInfo}) => {

    setTimeout(() => {
        setAlertInfo(prevData => ({...prevData, show:false}))
    }, 10000)
    console.log(alertInfo.propertyCheck)
    return (
        <div>
            <Fade in={alertInfo.show}>
            <Alert
            style={{ position: "fixed", left: "20px", bottom: "20px" }}
            variant="filled"
            severity={alertInfo.propertyCheck}
            >
                {alertInfo.data}
            </Alert>
            </Fade>
        </div>
    );
};

export default MyAlert;