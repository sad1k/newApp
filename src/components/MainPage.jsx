import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from './Header';
import FilterBar from './FilterBar';
import { Card, CardActions, CardContent, CardHeader, IconButton, Pagination, Typography } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ArticleCard from './ArticleCard';
import MOCK_DATA from './../MOCK_DATA1.json'


const filterTitles = (searchText, titleList) => {
    if(!searchText){
        return titleList
    }
    return titleList.filter((elem) => elem.title.toLowerCase().includes(searchText.toLowerCase()))
}


const MainPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [data, setData] = useState(() => MOCK_DATA)

    const [pageData, setPageData] = useState(() => data.slice((currentPage - 1) * 10, currentPage * 10))

    const [searchTerm, setSearchTerm] = useState('')



    useEffect(() => {
        console.log(currentPage)
        const slicedData = data.slice((currentPage-1) * 10, (currentPage) * 10)
        console.log(slicedData)
        setPageData(slicedData)
    }, [currentPage, data])

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredData = filterTitles(searchTerm, MOCK_DATA)
            setData(filteredData)
        }, 100)
        return () => clearTimeout(Debounce)
    }, [searchTerm])


    return (
        <div style={{display:'flex', flexDirection:'column', rowGap:'10px', justifyContent:'center'}}>
         
            <FilterBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div style={{ textAlign:'center'}}>
                <Typography variant='h2'>
                Уроки по теории графов
                </Typography>
            </div>
            
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center',  columnGap:'20px', rowGap:'10px' }}>
               {pageData.map((elem) => {
                return (
                <ArticleCard key={elem.id} title={elem.title} description={elem.description} date={elem.date} url={elem.img} />
                )
                 }
                 )
                }
              
            </div>
            <Pagination onChange={(e) => {setCurrentPage(() => e.target.ariaLabel.at(-1))}
                } page={+currentPage}  style={{alignSelf:'center'}} count={Math.ceil(data.length/10)} color="secondary" />
        </div>
    );
};

export default MainPage;