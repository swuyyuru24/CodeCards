import { countCards, insertCard } from './cards';
import type { NewCard } from '../types/Card';

const SAMPLE_CARDS: NewCard[] = [
  {
    mode: 'dsa',
    problem: 'Longest Substring Without Repeating Characters',
    approach:
      'Use a hashmap to track last seen index. Expand right pointer each step, shrink left on duplicate.',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(min(n, m))',
    keyInsight:
      'Window only shrinks from left — no need to re-check characters already in the window.',
    edgeCases: 'Empty string, all same chars, all unique chars',
    difficulty: 'medium',
    patterns: ['Sliding Window', 'Hash Map'],
    confidence: 3,
    nextReviewAt: null,
    photoUri: null,
  },
  {
    mode: 'sql',
    problem: 'Top 3 salaries per department',
    approach:
      'Use DENSE_RANK() window function partitioned by department, ordered by salary desc.',
    timeComplexity: null,
    spaceComplexity: null,
    keyInsight:
      'DENSE_RANK handles ties — RANK would skip numbers, ROW_NUMBER would break ties arbitrarily.',
    edgeCases: 'Departments with fewer than 3 employees, ties at the cutoff',
    difficulty: 'medium',
    patterns: ['Window Functions'],
    confidence: 2,
    nextReviewAt: null,
    photoUri: null,
  },
  {
    mode: 'system_design',
    problem: 'Design a URL shortener',
    approach:
      'Base62 encode an auto-increment ID or use a hash truncation. Cache hot mappings in Redis, persist in a key-value store.',
    timeComplexity: null,
    spaceComplexity: null,
    keyInsight:
      'Reads dominate writes ~100:1 — design for cache hit rate, not write throughput.',
    edgeCases: 'Collisions in hash approach, custom aliases, expiration',
    difficulty: 'medium',
    patterns: ['Caching', 'Database Selection'],
    confidence: 4,
    nextReviewAt: null,
    photoUri: null,
  },
];

export async function seedIfEmpty(): Promise<void> {
  const n = await countCards();
  if (n > 0) return;
  for (const card of SAMPLE_CARDS) {
    await insertCard(card);
  }
}
