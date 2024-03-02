import styled from '@emotion/styled';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, Icon, IconButton, InputLabel, MenuItem, Select, Stack, ThemeProvider, Typography, createTheme } from '@mui/material';
import { purple } from '@mui/material/colors';
import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MyAccordion from './MyAccordion';

const Navbar = ({ setIsAddingNode, setIsAddingLink, setAlertInfo, startEulerianCycle, startFordFalkerson, handleResetGraph }) => {
  
  let [algorithm, setAlgorithm] = useState('')
  
  const handleChange = (event) => {
    setAlgorithm(event.target.value)
  } 

  const onClickNode = () => {
    setIsAddingNode(true);
    setAlertInfo({show:true, data:'Нажмите на поле, чтобы добавить вершину', propertyCheck:'info'});
  };

  const onClickLink = () => {
    setIsAddingLink(true);
    setAlertInfo({show:true,data:'Выберите вершину, от которой вы хотите провести ребро', propertyCheck:'info'});
  };


  const ColorButton = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: purple[700],
    '&:hover': {
      backgroundColor: purple[900],
    },
  }));



  return (
    <div>
       
      <div style={{ display:'flex', justifyContent:'center', alignItems:'center', columnGap:'10px'}}>

      <Button variant='contained' onClick={onClickNode}>Добавить вершину</Button>
      <Button variant='contained' onClick={onClickLink}>Добавить ребро</Button>
      </div>
     
      <div>
    
 

      <FormControl variant="filled" sx={{ m: 1, minWidth: 120, display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', rowGap: '10px' }}>
      <Select
      
          sx={{maxWidth:'300px', width:'100%'}}
          id="demo-simple-select-filled"
          value={algorithm}
          onChange={handleChange}
         displayEmpty
        >
        <MenuItem value="">
            <em>Алгоритм</em>
          </MenuItem>
          <MenuItem value={'EulerianCycle'}>Поиск Эйлерова цикла</MenuItem>
          <MenuItem value={'FordFalkerson'}>Поиск максимального потока</MenuItem>
        </Select>  


        <MyAccordion title={'Шаги алгоритма'} children={
          <Typography>
          {
            algorithm === 'EulerianCycle' ? 
            <section>
            <p> 1. Инициализация графа: Создаются списки смежности для каждой вершины. В этих списках хранится информация о ребрах, связывающих вершины.</p>
            <p>2.Выбор начальной вершины: Выбирается начальная вершина для обхода. В вашем коде начальная вершина берется как первая вершина в графе</p>
            
            <p>3. Формирование начального цикла: Создается начальный цикл, состоящий из одного ребра, и это ребро соединяет начальную вершину с самой собой.</p>
            
            <p>4. Обход графа: Производится обход графа. На каждом шаге алгоритма выбирается следующее необработанное ребро из списка смежности текущей вершины. Ребро помечается как посещенное, и его добавляется к циклу.</p>
            
            <p>5. Обновление состояния графа и отображение действий: Ваш код включает в себя обновление состояния графа, изменяя цвет вершин на 'red' для отображения пройденного пути. Также, каждое действие (посещение вершины и изменение цвета) добавляется в массив cards, который, вероятно, используется для отображения шагов алгоритма.</p>
            
            <p>6. Завершение работы алгоритма: Алгоритм завершается, когда все рёбра графа посещены.</p>
            
            <p>7. Завершение и возврат цикла: После завершения алгоритма цикл, представляющий эйлеров цикл, возвращается.</p>
            <p>
            8. Установка флага завершения и сброс флага: В конце выполнения алгоритма устанавливается флаг isSuccess в true с сообщением об успешном завершении. Затем через некоторое время флаг сбрасывается, чтобы подготовить систему к возможному следующему запуску.
            </p>
            </section>
          :''
          }
          {
            algorithm === 'FordFalkerson' ? 
            <section>
            <p> Если в рассматриваемом ненасыщенном маршруте встречается противоположная по направлению дуга, то величину ее потока уменьшаем. Для остальных дуг - значения потока увеличиваем.</p>
            
            <p> Шаг 1. Выбираем вершину-исток как текущую (k = 1).</p>

            <p> Шаг 2. Формируем множество вершин, с которыми имеются положительные остаточные веса дуг. Если множество пустое, то переходим к шагу 4.</p>
            
            <p> Шаг 3. Во множестве S находим вершину, к которой идет дуга с наибольшим остаточным весом. Формируем для нее метку в формате, где - значение остаточного потока к этой вершине рассматриваемой k-й вершины. Выбираем найденную вершину как текущую. Если она не является стоком, то переходим к шагу 2. Если она является конечной (стоком), то переходим к шагу 5.</p>
            
            <p> Шаг 4.  Если следующих вершин нет и мы на стоке оканчиваем алгоритм, иначе переходим к предыдущей вершине</p>
            
            <p> Шаг 5.  Для найденого маршрута выполняем пересчет остаточных величин потоков. Убираем все метки у вершин, кроме истока и возвращаемся к шагу 1.</p>
            
            <p> Обновляем веса дуг. Если поток движется по направлению стрелки, то величина f высчитывается из значения перед дробью и прибавляется к значению после дроби. А если против стрелки, то все наоборот.</p>
            <p> А - f/B + f - если по стрелке</p>
            <p> A + f/B - f - если против стрелки            
            </p>
            </section>
          : ''
          }
          {
            !algorithm ? 'Вы не выбрали алгоритм' : ''
          }
          </Typography>
        } />
       
          <div>
          <ColorButton sx={{maxWidth:'300px'}} onClick={() => {
        if(algorithm === 'EulerianCycle'){
          startEulerianCycle()
        }else if(algorithm === 'FordFalkerson'){
          startFordFalkerson()
        }
      }} 
      variant="contained" endIcon={<Icon>play_arrow</Icon>}>Начать</ColorButton>

      <IconButton color="primary" onClick={(e) => handleResetGraph(e)} size="large">
        <Icon>restart_alt</Icon>
      </IconButton>
          </div>
     

      </FormControl>
      </div>
    
    </div>
  );
};

export default Navbar;