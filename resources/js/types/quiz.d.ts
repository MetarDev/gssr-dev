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
  browserSupportData?: {
		isSupported: boolean,
		subjectType: string,
		featureShortName: string,
		featureFullName: string,
	},
	featureSupportData?: {
		isSupported: boolean,
		subjectType: string,
		browserName: string,
		browserVersion: string,
		browserYear: number,
	},
	globalUsageData?: {
		isMostUsed: boolean,
		subjectType: string,
		fullFeatureName: string,
	},
}

export interface AnswerInterface {
	id: number,
	title: string,
	titleLong: string,
	description?: string,
	isCorrect: boolean,
	globalUsageData?: {
		globalUsage: number,
	}
}

export interface QuizSummaryInterface {
  questions: QuestionSummaryInterface[],
  score: number;
  maxScore: number,
  correctQuestions: number,
  totalQuestions: number,
  timeSpent: number,
  timeTotal: number,
  avgTimePerQuestion?: number|null,
}

export interface QuestionSummaryInterface {
  timeSpent: number;
  score: number;
  answerId: number|null;
  answeredCorrectly: boolean;
  question: QuestionInterface;
}

export type RealBrowserType = 'desktop' | 'mobile';
