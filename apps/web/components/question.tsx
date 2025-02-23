import React, { useState, useEffect } from 'react';
import { Card, PlayerData } from "@repo/types";
import { Card as UICard, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import DottedBackground from '@/components/dotted-background';
import { Volume2 } from 'lucide-react';
import speak  from "@/actions/speak";

export default function Question({
  question
}: {
  question: Card & { player: PlayerData }
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

  const handelSpeaker = (question: string) => {
    try{
      speak(question);
    }catch(e){
      console.log(e);      
  }

  return (
    <UICard className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <DottedBackground>
          <div className="flex flex-col space-y-6">
            <h2 className="text-xl font-bold text-center">
              {question.question}
            </h2>
            
            <div className="w-full">
              {question.questionType === "MCQ" && (
                <RadioGroup
                  value={option?.toString()}
                  onValueChange={handleOptionChange}
                  className="space-y-4"
                >
                  {question.options?.map((opt) => (
                    <div key={opt.Id} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={opt.Id.toString()}
                        id={opt.Id.toString()}
                      />
                      <Label
                        htmlFor={opt.Id.toString()}
                        className="text-base cursor-pointer"
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
                />
              )}
            </div>
            <div className='flex justify-end'>
              <Button className='w-1/6' onClick={() => handelSpeaker(question.question)}>
              <Volume2 className="" />
              </Button>
            </div>
          </div>

        </DottedBackground>
      </CardContent>
    </UICard>
  );
}
}