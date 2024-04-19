import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Icon, IconButton, Input, InputLabel, MenuItem, Select, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyAccordion from './MyAccordion';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const Navbar = ({handlerCheckbox, startBfs, resetBfs}) => {
  
 
  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: purple[700],
    '&:hover': {
      backgroundColor: purple[900],
    },
  }));

  const PinkButton = styled(Button)(({ theme }) => ({ 
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    '&:hover': {
      backgroundColor: pink[700],
      boxShadow: '0px 0px 28px 2px rgba(214,51,214,1)',
    },
  }));



  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center',}}>
 <div  style={{ borderColor:'gray',border:'solid 2px', marginBottom:'10px', backgroundColor:'rgb(102, 102, 153)', borderRadius:'55px', padding:'20px', display:'flex', alignItems:'center', columnGap:'20px',
 boxShadow: '0px 0px 19px 0px rgba(0,0,0,0.75)'
}}>
    <Input name='addLink' type={'checkbox'} onClick={(e) => {
      console.log(e.target.checked)
      handlerCheckbox(e)
    }} />
    <label for='addLink'>Добавить ребро</label>
    <ColorButton sx={{maxWidth:'300px'}} onClick={() => {
      startBfs()
    }} 
  variant="contained" endIcon={<Icon>play_arrow</Icon>}>Начать</ColorButton>
  <PinkButton onClick={() => {
    resetBfs()
  }} sx={{maxWidth:'300px'}} startIcon={<RestartAltIcon/>} >
    Reset
  </PinkButton>
  </div>
    </div>
   
  );
};

export default Navbar;