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
		browserType: RealBrowserType,
		featureShortName: string,
		featureFullName: string,
	},
	featureSupportData?: {
		isSupported: boolean,
		featureType: string,
		browserName: string,
		browserVersion: string,
		browserYear: number,
	},
	globalUsageData?: {
		isMostUsed: boolean,
		featureType: string,
		fullFeatureName: string,
	},
}

export interface AnswerInterface {
	id: number,
	title: string,
	description?: string,
	isCorrect: boolean,
	isHighlighted: boolean,
	globalUsageData?: {
		globalUsage: number,
	}
}

export type RealBrowserType = 'desktop' | 'mobile';
