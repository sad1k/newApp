import React, { useCallback, useRef, useState } from "react";
import s from "./styles.module.css";
import GraphTheory from "./GraphTheory";
import { useScrollbar } from "../../hooks/useScrollbar";
import { renderContent, renderSubGraphContent } from "./CoursePages";
import { options } from "./options";
import { ColorButton } from "./components/ColorButton";
import MyModal from "./components/ModalContent";

const CourseTheory = () => {
  const content = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  useScrollbar(content, true);

  const [cy, setCy] = useState(null);
  const [cyNodes, setCyNodes] = useState([]);
  const [cyEdges, setCyEdges] = useState([]);
  const [graphOptions, setGraphOptions] = useState(options(currentPage));

  let renderSubGraphContentCb = useCallback(() => renderSubGraphContent(currentPage, cy, cyEdges, cyNodes), [currentPage, cy, cyEdges.length, cyNodes.length])

  
  
  const prevClickHandler = () => {
    if(currentPage > 0){
      setCurrentPage((prev) => prev -= 1) 
      setGraphOptions(() => ({ ...options(currentPage - 1)}))
    }
  }
  const nextClickHandler = (e) => {
    if(currentPage <= 11){
      setCurrentPage((prev) => prev += 1)
      setGraphOptions(() => ({ ...options(currentPage + 1)}))
    }
  }
  

  return (
    <div className={s.container}>
      <div className={s.ButtonsBar}>
      {currentPage > 1 ? <ColorButton onClick={prevClickHandler}>Пред.</ColorButton> : <ColorButton disabled onClick={prevClickHandler}>Пред.</ColorButton>}
      <MyModal setCurrentPage={setCurrentPage} /> 
      {currentPage < 11 ? <ColorButton onClick={nextClickHandler}>След.</ColorButton> : <ColorButton disabled onClick={nextClickHandler}>След.</ColorButton>}
      </div>
      <div className={s.GraphTheory} ref={content}>
        {renderContent(currentPage)}
      </div>
      <div className={s.InteractiveGraph}>
        <div>
          <GraphTheory
            options={graphOptions}
            setCy={setCy}
            setCyEdges={setCyEdges}
            setCyNodes={setCyNodes}
            interactiveElement={() => {
              return (
                <>
                  {" "}
                  <hr />
                {cy !== null && renderSubGraphContentCb(currentPage, cy, cyEdges, cyNodes)}
                </>
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseTheory;
