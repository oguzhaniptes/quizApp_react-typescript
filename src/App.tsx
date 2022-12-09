import React, { useState } from 'react';
import QuestionCard from './Components/QuestionCard';
import { fetchQuizQuestions } from './API';
import { QuestionState, Difficulty } from './API';

const TotalQuestion = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswer, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)


  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TotalQuestion,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      if (correct) {
        setScore(prev => prev + 1)
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers((prev) => [...prev, answerObject])
    }
  }
  const nextQuestion = () => {
    const nextQuestion = number + 1
    if (nextQuestion === TotalQuestion) {
      setGameOver(true);
    } else { setNumber(nextQuestion) }
  }




  return (
    <div>
      <h1>Quiz App</h1>
      {gameOver || userAnswer.length === TotalQuestion
        ? (<button className='start' onClick={startTrivia}>Start</button>)
        : null}


      {!gameOver ? (<p className='score'>Score: {score} </p>) : null}
      {loading ? (<p>Loading Questions ...</p>) : null}
      {!gameOver && !loading
        ? <QuestionCard
          questonNo={number + 1}
          totalQuestions={TotalQuestion}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callBack={checkAnswer}
        ></QuestionCard>
        : null}
      {!gameOver && !loading && userAnswer.length === number + 1 && number !== TotalQuestion - 1
        ? (
          <button className='next' onClick={nextQuestion}>Next Questions</button>
        ) : null
      }

    </div>
  );
}

export default App;
