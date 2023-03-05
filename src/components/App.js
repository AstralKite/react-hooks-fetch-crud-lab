import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionList, setQuestionList] = useState([]);

  useEffect( ()=>{
    fetch("http://localhost:4000/questions")
      .then( (r)=> r.json() )
      .then( (data)=> setQuestionList(data));
  }, []);


  function handleNewQuestion(newQuestion){
    setQuestionList([...questionList, newQuestion]);
  }

  //handle Delete
  function handleDeleteQuestion(deletedQ){
    const newList = questionList.filter( (question)=> deletedQ.id !== question.id)
    setQuestionList(newList);

    //DELTE from server
    fetch(`http://localhost:4000/questions/${deletedQ.id}`, {
      method: "DELETE",
    })
  }


  function onAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questionList.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestionList(updatedQuestions);
      });
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm setQuestionList={setQuestionList} handleNewQuestion={handleNewQuestion}/> : <QuestionList questionList={questionList} handleDelete={handleDeleteQuestion} onAnswerChange={onAnswerChange}/>}
    </main>
  );
}

export default App;
