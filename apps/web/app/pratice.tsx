import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useGameStore } from "@/store/game"
import { Question } from "@repo/types"

const questios = 

interface WrongAnswersProps {
  questions: Question[]
  onStartGame: (questions: Question[]) => void
}

export default function WrongAnswers({ questions, onStartGame }: WrongAnswersProps) {
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Review Incorrect Answers</span>
          <Button 
            onClick={() => onStartGame(questions)}
            variant="default"
            className="ml-4"
          >
            Practice These Questions
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {questions.map((question, index) => (
            <Card key={question.cardId} className="mb-4 p-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Question {index + 1}</h3>
                <p className="text-muted-foreground">{question.question}</p>
                
                {question.questionType === "MCQ" ? (
                  <div className="pl-4 space-y-2">
                    <p className="text-red-500">Your answer: {
                      question.options.find(opt => opt.id === question.userAnswer)?.value
                    }</p>
                    <p className="text-green-500">Correct answer: {question.answer.value}</p>
                  </div>
                ) : (
                  <div className="pl-4 space-y-2">
                    <p className="text-red-500">Your answer: {question.userAnswer}</p>
                    <p className="text-green-500">Correct answer: {question.answer.value}</p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}