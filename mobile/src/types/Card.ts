export type Mode = 'dsa' | 'sql' | 'system_design';
export type Difficulty = 'easy' | 'medium' | 'hard';

export type Card = {
  id: number;
  mode: Mode;
  problem: string;
  approach: string | null;
  timeComplexity: string | null;
  spaceComplexity: string | null;
  keyInsight: string | null;
  edgeCases: string | null;
  difficulty: Difficulty | null;
  patterns: string[];
  confidence: number;
  nextReviewAt: number | null;
  photoUri: string | null;
  createdAt: number;
};

export type NewCard = Omit<Card, 'id' | 'createdAt'>;
