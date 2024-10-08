import React from "react";

const InterfaceInfo = () => {
  return (
    <p>
      Интерфейс приложения:
      <ul>
        <li>Чтобы добавить вершину, щелкните левой кнопкой мыши на белом пространстве.</li>
        <li>Чтобы добавить ребро, зажмите левую кнопку мыши на одной вершине и перетащите ее на другую.</li>
        <li>Чтобы удалить вершину/ребро, щелкните на ней правой кнопкой мыши.</li>
        <li>Чтобы увидеть название вершины/ребро, просто наведите на нее курсор.</li>
      </ul>
    </p>
  );
};

export default InterfaceInfo;
