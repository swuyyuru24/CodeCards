import { getDb } from './index';
import type { Card, NewCard } from '../types/Card';

type Row = {
  id: number;
  mode: string;
  problem: string;
  approach: string | null;
  time_complexity: string | null;
  space_complexity: string | null;
  key_insight: string | null;
  edge_cases: string | null;
  difficulty: string | null;
  patterns: string;
  confidence: number;
  next_review_at: number | null;
  photo_uri: string | null;
  created_at: number;
};

function rowToCard(row: Row): Card {
  return {
    id: row.id,
    mode: row.mode as Card['mode'],
    problem: row.problem,
    approach: row.approach,
    timeComplexity: row.time_complexity,
    spaceComplexity: row.space_complexity,
    keyInsight: row.key_insight,
    edgeCases: row.edge_cases,
    difficulty: row.difficulty as Card['difficulty'],
    patterns: JSON.parse(row.patterns) as string[],
    confidence: row.confidence,
    nextReviewAt: row.next_review_at,
    photoUri: row.photo_uri,
    createdAt: row.created_at,
  };
}

export async function listCards(): Promise<Card[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<Row>(
    'SELECT * FROM cards ORDER BY created_at DESC',
  );
  return rows.map(rowToCard);
}

export async function insertCard(card: NewCard): Promise<number> {
  const db = await getDb();
  const result = await db.runAsync(
    `INSERT INTO cards (
      mode, problem, approach, time_complexity, space_complexity,
      key_insight, edge_cases, difficulty, patterns, confidence,
      next_review_at, photo_uri, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    card.mode,
    card.problem,
    card.approach,
    card.timeComplexity,
    card.spaceComplexity,
    card.keyInsight,
    card.edgeCases,
    card.difficulty,
    JSON.stringify(card.patterns),
    card.confidence,
    card.nextReviewAt,
    card.photoUri,
    Date.now(),
  );
  return result.lastInsertRowId;
}

export async function updateConfidence(
  id: number,
  confidence: number,
): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'UPDATE cards SET confidence = ? WHERE id = ?',
    confidence,
    id,
  );
}

export async function countCards(): Promise<number> {
  const db = await getDb();
  const row = await db.getFirstAsync<{ n: number }>(
    'SELECT COUNT(*) AS n FROM cards',
  );
  return row?.n ?? 0;
}
