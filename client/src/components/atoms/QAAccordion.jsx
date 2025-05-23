import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QABadge from "./QABadge";
import dynamic from "next/dynamic";
const SafeHtml = dynamic(() => import("@atoms/SafeHtml"), { ssr: false });

const QAAccordion = ({ question, answer }) => {
  return (
    <Accordion
      className="bg-white rounded-xl shadow-[0_2px_8px_-3px_rgba(0,0,0,0.07),0_6px_16px_-8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_8px_24px_-4px_rgba(0,0,0,0.06)] transition-all duration-300 !border-none before:!hidden overflow-hidden"
      sx={{
        "&.MuiAccordion-root": {
          margin: "0.75rem 0",
          background: "transparent",
        },
        "&.Mui-expanded": {
          background: "white",
          transform: "scale(1.01)",
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon className="text-main/70 transform transition-transform duration-300" />
        }
        className="hover:bg-main/5 rounded-xl transition-colors duration-300"
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: "1.25rem 0",
          },
          "& .Mui-expanded": {
            "& .MuiSvgIcon-root": {
              transform: "rotate(180deg)",
              color: "var(--main-color)",
              opacity: "0.9",
            },
          },
        }}
      >
        <div className="flex items-center space-x-4">
          <QABadge />
          <h1 className="text-lg font-medium text-gray-900 group-open:text-main">
            <SafeHtml as="span" content={question} />
          </h1>
        </div>
      </AccordionSummary>
      <AccordionDetails className="px-8 pb-8 pt-2">
        <div className="flex gap-4">
          <div className="flex-1">
            <SafeHtml
              as="p"
              content={answer}
              className="text-gray-600 leading-relaxed"
            />
          </div>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default QAAccordion;
