# CodeCards

Snap your code → get interview-ready flashcards. Auto-generates cards from LeetCode solutions, SQL queries, and system design notes with multi-pattern tagging, spaced repetition, and audio review.

## The Problem

You solve a LeetCode problem, understand it, forget the pattern by next week. You study SQL joins and system design tradeoffs but can't recall them in interviews. Writing flashcards manually is tedious. Reviewing at a laptop defeats the purpose.

## How It Works

1. **Snap** — photo your code, SQL query, system design diagram, or handwritten notes
2. **Analyze** — OCR extracts content, ML classifies patterns and generates a structured flashcard
3. **Tag** — auto-categorized by pattern (sliding window, window functions, caching, etc.) — supports multiple patterns per card
4. **Review** — swipe through cards on the go, listen in audio mode while commuting or at the gym
5. **Retain** — spaced repetition surfaces your weak patterns right before you forget

## Three Modes

### DSA
Snap a LeetCode solution → card with pattern, approach, time/space complexity, key insight, edge cases

### SQL
Snap a query → card with what it does, join types explained, optimization tips, common pitfalls

### System Design
Snap a diagram or notes → card with components, tradeoffs, scalability decisions, bottlenecks

## What a Card Looks Like

```
┌─────────────────────────────────────┐
│  Mode: DSA                          │
│  Patterns: Sliding Window, HashMap  │
│  Difficulty: Medium                 │
├─────────────────────────────────────┤
│                                     │
│  Problem: Longest Substring Without │
│           Repeating Characters      │
│                                     │
│  Approach:                          │
│  Use a hashmap to track last seen   │
│  index. Expand right pointer each   │
│  step, shrink left on duplicate.    │
│                                     │
│  Time: O(n)  Space: O(min(n, m))   │
│                                     │
│  Key Insight:                       │
│  Window only shrinks from left —    │
│  no need to re-check characters     │
│  already in the window.             │
│                                     │
│  Edge Cases:                        │
│  Empty string, all same chars,      │
│  all unique chars                   │
│                                     │
├─────────────────────────────────────┤
│  Confidence: ███░░ 3/5              │
└─────────────────────────────────────┘
```

## Features

### Core
- **Photo → Flashcard** — snap code, SQL, or diagrams
- **Multi-Pattern Tagging** — one card can belong to multiple patterns
- **Spaced Repetition** — SM-2 algorithm targets weak patterns
- **Audio Mode** — TTS reads cards aloud, hands-free review
- **Confidence Tracking** — swipe easy/hard, see your weak spots

### Organization
- **Pattern Decks** — auto-grouped by DSA pattern, SQL concept, or system design topic
- **Mode Filter** — DSA / SQL / System Design
- **Difficulty Filter** — Easy / Medium / Hard
- **Weak Spots Dashboard** — shows which patterns need work

### Input Methods
- Camera snap
- Paste code / text
- LeetCode URL import
- Manual card creation

## Patterns (Auto-Classified)

**DSA:** Arrays & Hashing, Two Pointers, Sliding Window, Stack, Binary Search, Linked List, Trees, Graphs, Dynamic Programming, Greedy, Backtracking, Heap, Trie, Union Find, Intervals, Bit Manipulation

**SQL:** Joins, Subqueries, Window Functions, Aggregation, Indexing, Normalization, CTEs, Query Optimization, Transactions, Constraints

**System Design:** Load Balancing, Caching, Sharding, Replication, Message Queues, Rate Limiting, CAP Theorem, Microservices, Database Selection, API Design

## Architecture

```
┌──────────────────────────────────────────┐
│          React Native App (Expo)          │
│                                           │
│  Camera → Card Browser → Review Session  │
│                  │                         │
│          SQLite (local-first)             │
└──────────────┬───────────────────────────┘
               │ API (card generation only)
       ┌───────▼───────┐
       │ FastAPI Backend │
       │                 │
       │  OCR Engine     │ image → text
       │       ↓         │
       │  Mode Detector  │ code vs SQL vs diagram
       │       ↓         │
       │  Pattern        │ fine-tuned classifier
       │  Classifier     │ (multi-label)
       │       ↓         │
       │  Card Generator │ structured extraction
       │                 │
       │  PostgreSQL     │
       └─────────────────┘
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Mobile | React Native (Expo) |
| Backend | Python, FastAPI |
| DB (mobile) | SQLite, local-first |
| DB (server) | PostgreSQL |
| OCR | Google Cloud Vision |
| Classifier | Fine-tuned CodeBERT (multi-label) |
| Card Gen | NLP extraction pipeline |
| Audio | Expo Speech API |
| Spaced Rep | SM-2 (client-side) |

## Implementation Plan

### Phase 1 — Backend + ML (Week 1-2)
- [ ] FastAPI project setup
- [ ] OCR pipeline (image → code/text)
- [ ] Mode detector (DSA vs SQL vs System Design)
- [ ] Pattern classifier (multi-label, trained on labeled solutions)
- [ ] Card generation pipeline
- [ ] API endpoints
- [ ] Docker setup

### Phase 2 — Mobile App (Week 2-3)
- [ ] Expo project setup
- [ ] Camera capture screen
- [ ] Card component with flip animation
- [ ] SQLite local storage
- [ ] Deck browser by pattern
- [ ] Spaced repetition engine
- [ ] Audio mode

### Phase 3 — Ship (Week 3-4)
- [ ] Confidence tracking + weak spots dashboard
- [ ] LeetCode URL import
- [ ] Offline mode
- [ ] Polish UI
- [ ] TestFlight (iOS) / Play Store internal testing
- [ ] App store submission

## Running on Your Phone

With **Expo Go**, you can run the app on your iPhone immediately during development — no App Store needed. Just scan the QR code.

For sharing with others before App Store approval, use **TestFlight** (iOS) or **Internal Testing** (Android).

## Running Locally

```bash
# Backend
cd backend && docker-compose up --build

# Mobile
cd mobile && npx expo start
# Scan QR with Expo Go on your phone
```
