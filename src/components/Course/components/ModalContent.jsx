import React from "react";
import { ColorButton } from "./ColorButton";
import { Box, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MyModal = ({setCurrentPage}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <ColorButton onClick={handleOpen}>Содержание</ColorButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Содержание
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, '& li':{ padding: '10px', fontSize: '1.5rem', cursor:'pointer'} }}>
            <ol>
              <li onClick={() => setCurrentPage(1)}>Вершины и ребра</li>
              <li onClick={() => setCurrentPage(2)}>Степень и размер графа</li>
              <li onClick={() => setCurrentPage(3)}>Степень вершины</li>
              <li onClick={() => setCurrentPage(4)}>Последовательность степеней</li>
              <li onClick={() => setCurrentPage(5)}>Графическая последовательность</li>
              <li onClick={() => setCurrentPage(6)}>Принцип Дирихле</li>
              <li onClick={() => setCurrentPage(7)}>Регулярный граф</li>
              <li onClick={() => setCurrentPage(8)}>Полный граф</li>
              <li onClick={() => setCurrentPage(9)}>Двудольный граф</li>
              <li onClick={() => setCurrentPage(10)}>Полный двудольный граф</li>
              <li onClick={() => setCurrentPage(11)}>Деревья</li>
            </ol>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default MyModal;
