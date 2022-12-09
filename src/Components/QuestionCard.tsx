import React from "react"
import {AnswerObject} from '../App'

type Props = {
    question: string;
    answers: string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>) =>void;
    userAnswer: AnswerObject | undefined ;
    questonNo: number;
    totalQuestions: number;
}

export default function QuestionCard({ question, answers, callBack, userAnswer, questonNo, totalQuestions }: Props) {
    return (
        <div>
            <p className="number">
                Question: {questonNo} / {totalQuestions}
            </p>

            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button disabled={!!userAnswer} value={answer} onClick={callBack}>
                            <span dangerouslySetInnerHTML={{ __html: answer}}></span>
                        </button>
                    </div>
                    ))}
            </div>
        </div>
    )
}