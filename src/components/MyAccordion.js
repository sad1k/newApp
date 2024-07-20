import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from 'react';

const MyAccordion = ({title, children, ...props}) => {
    return (
        <Accordion {...props}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                {title}
            </AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    );
};

export default MyAccordion;