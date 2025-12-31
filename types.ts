
export interface CaseStudy {
  label: string;
  description: string;
}

export interface VStep {
  id: number;
  title: string;
  side: 'left' | 'right' | 'center';
  level: number;
  description: string;
  cases: CaseStudy[];
  color: string;
}

export interface VModelScenario {
  name: string;
  description: string;
  steps: VStep[];
}

export interface Connection {
  from: number;
  to: number;
  label: string;
}
