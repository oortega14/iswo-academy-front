import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import useGetEvaluation from '@/hooks/useGetEvaluation';
import { EvaluationFinished } from './EvaluationFinished';
import { EvaluationQuestions } from './EvaluationQuestions';
import { Exam } from '@/types/sidebar';

const EvaluationBody = ({exam} : { exam: Exam }) => {
  const { evaluationId } = useParams<{ evaluationId: string }>()
  const [loading, setLoading] = useState(false)
  const evaluation = useGetEvaluation({
    setLoadingCallback: setLoading,
    evaluationId: evaluationId
  })
  const [isFinished, setIsFinished] = useState(false)
  const [approved, setApproved] = useState(false)

  return (
    <>
      {isFinished &&
        <EvaluationFinished approved={approved}/>
      }
      {!isFinished && (evaluation?.questions !== undefined) &&
        <EvaluationQuestions
          setIsFinished={setIsFinished}
          exam={exam}
          setApproved={setApproved}
          evaluation={evaluation}
        />
      }
    </>
  );
};

export default EvaluationBody;
