import React, { useState } from 'react';
import { Card, PlayerData } from "@repo/types";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DottedBackground from '@/components/dotted-background';
import { Volume2 } from 'lucide-react';
import speak from "@/actions/speak";
import toast from 'react-hot-toast';

export default function Question({
  question,
  disabled = false,
}: {
  question: Card & { player: PlayerData },
  disabled?: boolean
}) {
  const [whAnswer, setWHAnswer] = useState("");
  const [option, setOption] = useState<number | null>(null);

  const handleWhAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value;
    setWHAnswer(newAnswer);
  };

  const handleOptionChange = (value: string) => {
    const optionNumber = parseInt(value);
    setOption(optionNumber);
  };

  const handleSpeaker = (qs: string) => {
    try {
      speak(qs);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <UICard className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <DottedBackground>
          <div className="flex flex-col space-y-6">
            {/* Display a message if it's not the user's turn */}
            {disabled && (
              <div className="text-center text-lg font-semibold text-gray-600">
                It's not your turn yet, but you can see the question.
              </div>
            )}

            <h2 className="text-xl font-bold text-center">
              {question.question}
            </h2>

            <div className="w-full">
              {question.questionType === "MCQ" && (
                <RadioGroup
                  value={option?.toString()}
                  onValueChange={handleOptionChange}
                  className="space-y-4"
                  disabled={disabled} // Disable the RadioGroup if it's not the user's turn
                >
                  {question.options?.map((opt) => (
                    <div key={opt.Id} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={opt.Id.toString()}
                        id={opt.Id.toString()}
                        disabled={disabled} // Disable individual radio buttons
                      />
                      <Label
                        htmlFor={opt.Id.toString()}
                        className={`text-base ${disabled ? 'text-gray-400' : 'cursor-pointer'}`}
                      >
                        {opt.value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.questionType === "WH" && (
                <Textarea
                  value={whAnswer}
                  onChange={handleWhAnswerChange}
                  placeholder="Type your answer here..."
                  className="min-h-32"
                  disabled={disabled} // Disable the Textarea if it's not the user's turn
                />
              )}
            </div>

            <div className='flex justify-end gap-2'>
              <Button
                className='w-1/5'
                onClick={(e) => {
                  e.preventDefault();
                  // toast.error('It was the wrong answer');

                  const isCorrect = question.questionType === "WH" ? true : question.answer.Id === option;

                  if ( isCorrect ) {
                    toast.success('Correct answer!');
                  } else {
                    toast.error('It was the wrong answer');
                  }
                }}
                disabled={disabled} // Disable the Submit button if it's not the user's turn
              >
                Submit
              </Button>
              <Button
                className='w-1/6'
                onClick={() => handleSpeaker(`${question.question}\n${question.options?.map((opt, i) => `${i + 1}. ${opt.value}`).join('\n')}.`)}
              >
                <Volume2 className="" />
              </Button>
            </div>
          </div>
        </DottedBackground>
      </CardContent>
    </UICard>
  );
}