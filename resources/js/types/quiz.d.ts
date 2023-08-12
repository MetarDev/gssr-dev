export interface Quiz {
  slug: string;
  timer: number;
  questions: number[];
}

export interface QuestionInterface {
  type: string,
  supports: string,
  hash: string,
  subject_id: number,
  correct_answer_id: number,
  answers: AnswerInterface[],
}

export interface AnswerInterface {
	id: string,
	title: string,
	description?: string,
	isCorrect: boolean,
	isHighlighted: boolean,
	globalUsageData?: {
		globalUsage: number,
	}
}
