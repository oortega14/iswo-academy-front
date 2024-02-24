import React, { SetStateAction } from "react"
import { Evaluation, Exam } from "./sidebar";

export interface EvaluationQuestionProps {
  exam:               Exam;
  setApproved:        React.Dispatch<SetStateAction<boolean>>;
  setIsFinished:      React.Dispatch<SetStateAction<boolean>>;
  evaluation:         Evaluation;
}
