import type { Card } from "@repo/types";

export function convertToTypedDeck(mockData: any): Card[] {
  // Extract MCQ questions and add type
  const mcqQuestions = mockData.questions.questions.map(question => ({
    ...question,
    cardId: question.uuid,
    questionType: "MCQ" as const
  }));

  // Extract WH questions and add type
  const whQuestions = mockData.whquestions.questions.map(question => ({
    cardId: question.uuid,
    question: question.question,
    questionType: "WH" as const,
    // Convert answers to match the Card type structure
    answer: {
      Id: question.answers[0].id,
      value: question.answers[0].value
    }
  }));

  // Combine both types of questions
  const allCards = [...mcqQuestions, ...whQuestions];

  // Fisher-Yates shuffle algorithm
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }

  return allCards;
}