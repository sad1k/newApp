import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form"
import SearchIcon from '@mui/icons-material/Search';

const FilterBar = ({searchTerm, setSearchTerm}) => {
    // const {register, handleSubmit} = useForm()
    // const onSubmit = (data) => console.log(data)

   
    

    return (
        <div>
            <div style={{display:'flex', justifyContent:'center', columnGap:'10px'}} >
                <TextField value={searchTerm} onChange={(e) =>  {
                    console.log(e.target.value)
                    setSearchTerm(e.target.value)
                }
                } id="outlined-basic" label="Искать курсы" variant="outlined" />
                <Button startIcon={<SearchIcon />} >Поиск</Button>
            </div>
            
        </div>
    );
};

export default FilterBar;