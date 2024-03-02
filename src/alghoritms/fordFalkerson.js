import * as d3 from "d3"


function plug(){
    return new Promise(resolve => {
        resolve()
    })
}

function animateTransition(selection, duration, delay, style, color, ease) {
    return new Promise(resolve => {
        selection.transition()
            .duration(duration)
            .delay(delay)
            .ease(ease)
            .style(style, color)
            .on('end', resolve);
    });
}


export default async function fordFalkerson(graphData, setGraphData, setAlertInfo, setChangedLink, setCards){
    function getMaxVertex(k, V, S) {
        let m = 0; // наименьшее допустимое значение
        let v = -1;
        for (let i = 0; i < V[k].length; i++) {
            const w = V[k][i];
            if (S.has(i)) {
                continue;
            }
    
            if (w[2] === 1) { // движение по стрелке
                if (m < w[0]) {
                    m = w[0];
                    v = i;
                }
            } else { // движение против стрелки
                if (m < w[1]) {
                    m = w[1];
                    v = i;
                }
            }
        }
    
        return v;
    }
    
    function getMaxFlow(T) {
        const w = T.map(x => x[0]);
        return Math.min(...w);
    }
    
    async function updateV(V, T, f) {
        for (const t of T) {
            if (t[1] === -1) { // это исток
                continue;
            }
    
            const sgn = V[t[2]][t[1]][2]; // направление движения
           
            // меняем веса в таблице для (i,j) и (j,i)
            V[t[1]][t[2]][0] -= f * sgn;
            V[t[1]][t[2]][1] += f * sgn;
        
           
            V[t[2]][t[1]][0] -= f * sgn;
            V[t[2]][t[1]][1] += f * sgn;
            
            
            

            // setGraphData((prevData) => {
            //             return {...prevData,
            //             links: prevData.links.map((link) => ((+link.source === t[2]) ? { ...link, label: `${V[t[2]][t[1]][0]}/${V[t[2]][t[1]][1]}` } : link)
            //               )}
            //           })

        }
        const T1 = T.slice(0,T.length-1)
        const t0 = T1[0]
        console.log(t0)
        setGraphData((prevData) => ({...prevData,
            links: prevData.links.map((link) => ((+link.source === t0[2] && +link.target === t0[1]) ? { ...link, label: `${V[t0[2]][t0[1]][0]}/${V[t0[2]][t0[1]][1]}` } : link)
              )}
          ))
        
        const t1 = T1[1]
        setGraphData((prevData) => ({...prevData,
            links: prevData.links.map((link) => ((+link.source === t1[2] && +link.target === t1[1]) ? { ...link, label: `${V[t1[2]][t1[1]][0]}/${V[t1[2]][t1[1]][1]}` } : link)
              )}
          ))
        await plug()
    }
    
    const V = getV(graphData)
    console.log(V)
    const N = V.length; // число вершин в графе
    const init = 0; // вершина истока (нумерация с нуля)
    const end = 2; // вершина стока
    const Tinit = [Infinity, -1, init]; // первая метка маршрута (a, from, vertex)
    const f = []; // максимальные потоки найденных маршрутов
    
    let j = init;
    while (j !== -1) {
        let k = init; // стартовая вершина (нумерация с нуля)
        setCards(prevCards => ({
            cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:'Просмотрена вершина номер 0', cycle:undefined , action: undefined}
          ]
        }))
        
        const T = [Tinit]; // метки маршрута
        const S = new Set([init]); // множество просмотренных вершин
        if(j === init){
            await animateTransition(d3.select(String.raw`#\3${j}  > path`), 750, 0, 'fill', 'red', d3.easePoly.exponent(2))
            //d3.select(String.raw`#\3${j}  > path`).transition().delay(j*1000).style('fill', 'red').ease(d3.easePoly.exponent(2))
        }
        while (k !== end) { // пока не дошли до стока
            j = getMaxVertex(k, V, S); // выбираем вершину с наибольшей пропускной способностью
            setCards(prevCards => ({
                cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description: j !== -1 ? `Выбираем вершину с наибольшей пропускной способностью ${j}` : `Вершины либо просмотрены, либо их пропускная способность равна 0`, cycle:undefined , action: undefined}
              ]
            }))
            //d3.select(String.raw`#\3${j}  > path`).transition().delay(j*1000).style('fill', 'red').ease(d3.easePoly.exponent(2))

            if (j === -1) { // если следующих вершин нет
                if (k === init) { // и мы на истоке, то
                    
                    setCards(prevCards => ({
                        cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Завершаем поиск маршрута`, cycle:undefined , action: undefined}
                      ]
                    }))


                    

                    break; // завершаем поиск маршрутов
                } else { // иначе, переходим к предыдущей вершине
                    T.reverse().forEach(async (mark, index) => {
                        const selection =  d3.select(String.raw`#\3${mark[1]}  > path`)
                        await animateTransition(selection, 750,200 + 50*(index + 1),'fill', 'green', d3.easePolyOut.exponent(2))
                        //setTimeout(() => d3.select(String.raw`#\3${mark[1]}  > path`).transition().duration(750).style('fill', 'green').ease(d3.easePolyOut.exponent(2)), 1000*graphData.links.length-750 + (Math.abs(end-mark[1])*1000) + 2000)
                        console.log(mark)
                        if(mark[1] !== -1){
                            const id = String.raw`#\3${mark[2]} \,${mark[1]}`
                            const path1 = d3.select(id)
                            await animateTransition(path1, 750,200 + 50*(index + 1) + 50*(index+1), 'stroke','#d3d3d3', d3.easePolyOut.exponent(2))
                        }
                    });
                    k = T.pop()[2];
                    setCards(prevCards => ({
                        cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Переходим к вершине ${k}`, cycle:undefined , action: undefined}
                      ]
                    }))
                    continue;
                }
            }
    
            const c = V[k][j][2] === 1 ? V[k][j][0] : V[k][j][1];// определяем текущий поток
            T.push([c, j, k]); // добавляем метку маршрута
            setCards(prevCards => ({
                cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Составили метку ${[c, j, k]} для вершины ${j}`, cycle:undefined , action: undefined}
              ]
            }))
            const id = String.raw`#\3${k} \,${j}`
            const path = d3.select(id)
            const te =  d3.easePoly.exponent(3);
            await animateTransition(path, 350, 100 , 'stroke', '#4ddbff', te);
            await animateTransition(d3.select(String.raw`#\3${j}  > path`),750, 150, 'fill', 'red', d3.easePoly.exponent(2))
            setCards(prevCards => ({
                cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Запоминаем вершину ${j}`, cycle:undefined , action: undefined}
              ]
            }))
            S.add(j); // запоминаем вершину как просмотренную
            
            if (j === end) { // если дошди до стока
                await animateTransition(d3.select(String.raw`#\3${end}  > path`), 750, 200, 'fill', 'green', d3.easePolyOut.exponent(2))

                T.reverse().forEach(async (mark, index) => {
                    const selection =  d3.select(String.raw`#\3${mark[1]}  > path`)
                    await animateTransition(selection, 750,200 + 50*(index + 1),'fill', 'green', d3.easePolyOut.exponent(2))
                    //setTimeout(() => d3.select(String.raw`#\3${mark[1]}  > path`).transition().duration(750).style('fill', 'green').ease(d3.easePolyOut.exponent(2)), 1000*graphData.links.length-750 + (Math.abs(end-mark[1])*1000) + 2000)
                    console.log(mark)
                    if(mark[1] !== -1){
                        const id = String.raw`#\3${mark[2]} \,${mark[1]}`
                        const path1 = d3.select(id)
                        await animateTransition(path1, 750,200 + 50*(index + 1) + 50*(index+1), 'stroke','#d3d3d3', d3.easePolyOut.exponent(2))
                    }
                });

              

                // setTimeout(() => d3.select(String.raw`#\3${end}  > path`).transition().duration(750).style('fill', 'green').ease(d3.easePolyOut.exponent(2)), 1000*graphData.links.length-750  + 2000)
                f.push(getMaxFlow(T));
       
                 // находим максимальную пропускную способность маршрута
                setCards(prevCards => ({
                    cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Находим максимальную пропускную способность маршрута  f =${f}`, cycle:undefined , action: undefined}
                  ]
                }))
                updateV(V, T, f.at(-1))     // обновляем веса дуг
                setCards(prevCards => ({
                    cards:[...prevCards.cards, {title: `Дейcтвие №${prevCards.cards.length + 1}`, description:`Обновляем веса дуг А - f/B + f - если по стрелке
 A + f/B - f - если против стрелки`, cycle:undefined , action: undefined}
                  ]
                }))
                break;
            }
    
            k = j;
        }
    }
    
    const F = f.reduce((sum, current) => sum + current, 0);
    setAlertInfo(prevData => ({...prevData, show:true, propertyCheck:'success', data:`Максимальный поток равен ${F}!`}))
    
}



function getV(graphData){
    let V = []
    for (let i = 0; i < graphData.nodes.length; i++){
        let v = []
        for (let j = 0; j < graphData.nodes.length; j++){
            if(i === j){
                v.push([0,0,1])
            }else{
                v.push([0,0,1])
            }
        }
        V.push(v)
    }
        
    for (let node of graphData.nodes){
        let id = node.id
        let index = 0
        for (let link of graphData.links){
            if(link.source === id){
        
                V[id][+link.target] = [+link.label.split('/')[0], +link.label.split('/')[1], 1]
                V[+link.target][+link.source] = [+link.label.split('/')[0], +link.label.split('/')[1], -1]
            }
        }
    }
    return V
}