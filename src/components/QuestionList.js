import React, {useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList( {questionList, handleDelete, onAnswerChange} ) {


  const questionDisplay = questionList.map( (question)=>{
    return <QuestionItem key={question.id} question={question} handleDelete={handleDelete} onAnswerChange={onAnswerChange}/>
  })


  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questionDisplay}
      </ul>
    </section>
  );
}

export default QuestionList;
