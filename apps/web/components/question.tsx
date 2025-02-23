import { Card, PlayerData } from "@repo/types";
import { useState } from "react";

export default function Question({
  question
}: {
  question: Card & { question: PlayerData }
}) {
  const [ whAnswer, setWHAnswer] = useState("");
  const [ option, setOption ] = useState<number | null>(null);
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-xl font-bold">{question.question}</div>
      <div className="flex flex-col">
        {
          question.questionType === "MCQ" && question.options?.map((option) => (
            <div key={option.Id} className="flex items-center">
              <input type="radio" name="question" id={option.Id.toString()} />
              <label htmlFor={option.Id.toString()}>{option.value}</label>
            </div>
          ))
        }
        {
          question.questionType === "WH" && <textarea>
            
          </textarea>
        }
      </div>
    </div>
  );
}