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
	isHighlighted: boolean,
	globalUsageData?: {
		globalUsage: number,
	}
}

export type RealBrowserType = 'desktop' | 'mobile';
