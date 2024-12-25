import React from "react";
import QAAccordion from "@atoms/QAAccordion";

const QAAccordions = ({ data }) => {
  return data.map((qaA, index) => (
    <QAAccordion
      key={qaA.id || index}
      question={qaA.question}
      answer={qaA.answer}
      index={index}
    />
  ));
};

export default QAAccordions;
