# SnapCards

Snap a photo of anything — code, notes, textbook, whiteboard — and get auto-generated flashcards. Review on the go with spaced repetition and audio mode.

## The Problem

You learn something, understand it in the moment, forget it by next week. Writing flashcards manually is tedious. Sitting at a laptop to review defeats the purpose.

## How It Works

1. **Snap** — take a photo of code, handwritten notes, a textbook page, or a whiteboard
2. **Analyze** — OCR extracts the content, ML generates structured flashcards and auto-categorizes them
3. **Review** — swipe through cards on the go, listen in audio mode while commuting/lifting
4. **Retain** — spaced repetition surfaces cards right before you forget them

## Use Cases

- **Coding** — snap a LeetCode solution, get a card with pattern, approach, complexity, edge cases
- **Studying** — photograph a textbook page, get key concept cards
- **Lectures** — snap a whiteboard before it's erased, get organized notes as cards
- **Reading** — highlight a passage in a book, snap it, get a summary card
- **Work** — photograph architecture diagrams, meeting notes, system designs

## Features

### Core
- **Photo → Flashcards** — snap anything, get structured cards
- **Auto-Categorization** — ML detects the subject and tags cards automatically
- **Spaced Repetition** — SM-2 algorithm, surfaces weak cards before you forget
- **Audio Mode** — text-to-speech reads cards aloud for hands-free review

### Organization
- **Smart Decks** — auto-grouped by subject/topic
- **Custom Tags** — add your own labels
- **Confidence Tracking** — swipe easy/hard after each review
- **Weak Spots Dashboard** — shows what needs more work

### Input Methods
- Camera snap (photo)
- Paste text / code
- Import URL (articles, docs, LeetCode)
- Manual card creation

### Nice to Have
- **Offline Mode** — everything works without internet
- **Share Decks** — export/import card sets
- **Multi-card Generation** — one photo can produce multiple cards
- **Search** — full-text search across all cards

## Architecture

```
┌──────────────────────────────────────────────────┐
│                React Native App (Expo)            │
│  ┌──────────┐ ┌──────────┐ ┌───────────────────┐ │
│  │  Camera  │ │  Deck    │ │  Review Session   │ │
│  │  Capture │ │  Browser │ │  (Spaced Rep)     │ │
│  └────┬─────┘ └──────────┘ └───────────────────┘ │
│       │                                           │
│  ┌────▼──────────────────────────────────────────┐│
│  │           Local SQLite Database               ││
│  │  cards, decks, review_history, tags           ││
│  └───────────────────────────────────────────────┘│
└──────────────────────┬───────────────────────────┘
                       │ API (card generation only)
              ┌────────▼────────┐
              │  FastAPI Backend │
              │                  │
              │  OCR Engine      │  Extracts text from images
              │       ↓          │
              │  Content         │  Detects type: code, notes,
              │  Classifier      │  textbook, diagram, etc.
              │       ↓          │
              │  Card Generator  │  Produces structured flashcards
              │       ↓          │
              │  Auto-Tagger     │  Categorizes by subject/topic
              │                  │
              │  PostgreSQL      │
              └──────────────────┘
```

## Tech Stack

| Layer | Tech |
|-------|------|
| Mobile App | React Native (Expo) |
| Backend | Python, FastAPI |
| Database (mobile) | SQLite (local-first, offline) |
| Database (server) | PostgreSQL |
| OCR | Google Cloud Vision / Tesseract |
| Content Classifier | Fine-tuned DistilBERT |
| Card Generation | NLP extraction pipeline |
| Audio | Expo Speech (text-to-speech) |
| Spaced Repetition | SM-2 algorithm (client-side) |

## Implementation Plan

### Phase 1 — Backend + ML (Week 1-2)
- [ ] FastAPI backend setup
- [ ] OCR pipeline (image → text)
- [ ] Content type classifier (code vs notes vs textbook vs diagram)
- [ ] Flashcard generation pipeline (text → structured cards)
- [ ] Auto-tagging by subject/topic
- [ ] API endpoints
- [ ] Docker setup

### Phase 2 — Mobile App (Week 2-3)
- [ ] React Native (Expo) project
- [ ] Camera capture screen
- [ ] Card display + flip animation
- [ ] Local SQLite storage
- [ ] Deck organization
- [ ] Spaced repetition engine (SM-2)
- [ ] Audio mode

### Phase 3 — Polish + Ship (Week 3-4)
- [ ] Confidence tracking + weak spots dashboard
- [ ] URL import
- [ ] Offline mode
- [ ] Search across cards
- [ ] App Store / Play Store submission

## Running Locally

```bash
# Backend
cd backend && docker-compose up --build

# Mobile
cd mobile && npx expo start
```
