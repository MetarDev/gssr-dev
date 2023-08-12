export interface Quiz {
  slug: string;
  timer: number;
  questions: number[];
}

export interface Question {
  type: string,
  supports: string,
  hash: string,
  subject_id: number,
  correct_answer_id: number,
}
