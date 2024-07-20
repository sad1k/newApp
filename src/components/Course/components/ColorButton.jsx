import { Button, styled } from "@mui/material";

export const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText('#ff5722'),
  backgroundColor: '#ff5722',
  padding: '10px',
  '&:hover': {
    backgroundColor: '#ff9800',
    boxShadow: `0px 0px 50px -6px rgba(255,153,0,1)`
  },
}));