export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
  correctAnswer: string; // The text of the correct answer
}

export interface QuizResult {
  questionId: number;
  selectedOption: string;
  isCorrect: boolean;
}
