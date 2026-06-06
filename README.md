# Interview Drill

A flashcard app for preparing for frontend technical interviews.

**Live:** https://interview-drill-kappa.vercel.app  
**API:** https://github.com/Bohdan-Diatliuk/interview-drill-server  
**Admin:** https://github.com/Bohdan-Diatliuk/interview-drill-admin

---

## Features

- **Flashcard mode** — flip cards to reveal answers, mark as known or still learning
- **List mode** — browse all questions and answers in an accordion list
- **Theory mode** — read questions with answers by category
- **Per-user progress** — tracked via a UUID stored in localStorage, no login required
- **Dynamic categories** — categories are fetched from the API, new ones appear automatically
- **Markdown answers** — supports `**bold**`, `` `inline code` ``, paragraphs

## Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Backend | NestJS, TypeORM, PostgreSQL |
| Deploy | Vercel (frontend), Railway (backend + DB) |
| Local dev | Docker Compose |

## Local development

Requires Docker.

```bash
# clone all three repos into the same parent folder
git clone https://github.com/Bohdan-Diatliuk/interview-drill
git clone https://github.com/Bohdan-Diatliuk/interview-drill-server
git clone https://github.com/Bohdan-Diatliuk/interview-drill-admin

# start everything (DB + backend + frontend + admin panel)
cd interview-drill-server
docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost |
| Admin panel | http://localhost:8080 |
| API | http://localhost:3001/api |

## Environment variables

`.env`

```env
VITE_API_URL=http://localhost:3001/api
```

## Project structure

```
interview-drill/        # this repo — React frontend
interview-drill-server/ # NestJS backend + PostgreSQL
interview-drill-admin/  # React admin panel (password protected)
```
