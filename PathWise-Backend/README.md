# PathWise-AI Backend

This repository powers the backend API for the PathWise-AI platform.
It provides authentication, authorization, email verification, token management, and the data API used by the React frontend.

## What this backend handles

- User registration, login, password reset, and email verification
- JWT access and refresh token issuance
- Auth-protected endpoints using Nest guards and Passport
- Database access using Prisma ORM
- SMTP email delivery for verification and password workflows
- Health check endpoint for readiness monitoring

## Core technologies

- NestJS
- Prisma
- PostgreSQL/MySQL-compatible database via `DATABASE_URL`
- `@nestjs/jwt` and `passport-jwt`
- `@nestjs-modules/mailer` and `nodemailer`
- `class-validator` and `class-transformer`
- Joi-based environment validation
- Jest and Supertest for tests

## Repository structure

- `src/main.ts` — application bootstrap and server start logic
- `src/app.module.ts` — root module composing feature modules
- `src/auth/` — auth controller, service, JWT strategy, guard, DTO definitions, and utility functions
- `src/config/` — config factories, env validation, database settings, mail settings, and Swagger setup
- `src/prisma/` — Prisma service and module wrapper for database injection
- `src/health/` — health endpoint for uptime/readiness
- `prisma/schema.prisma` — data model and database schema definitions
- `prisma/migrations/` — generated migration history

## Setup

### Install dependencies

```bash
cd PathWise-Backend
npm install
```

### Environment variables

Copy `.env.example` or create `.env` with the following required values:

```env
PORT=3000
NODE_ENV=development
APP_NAME=PathWise-AI
DATABASE_URL="postgresql://user:password@localhost:5432/pathwise"
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_SECRET_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your@email.com
MAIL_PASS=your_email_password
```

> Env validation is enforced in `src/config/env.validation.ts`.

### Prisma and database

Generate Prisma client and apply migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

For local development, you can use:

```bash
npx prisma migrate dev
```

Inspect data with Prisma Studio:

```bash
npx prisma studio
```

## Running locally

```bash
npm run start:dev
```

Available scripts:

- `npm run start` — start the server once
- `npm run start:dev` — watch mode with hot reload
- `npm run start:prod` — run built output from `dist/`
- `npm run lint` — run ESLint and fix auto-fixable issues
- `npm run format` — format source files with Prettier
- `npm run test` — run Jest unit tests
- `npm run test:e2e` — run end-to-end tests
- `npm run test:cov` — generate coverage report

## Key developer notes

- Auth flows are implemented in `src/auth/auth.service.ts` and exposed through `src/auth/auth.controller.ts`.
- JWT validation is defined in `src/auth/strategies/jwt.strategy.ts` and applied via `src/auth/guards/jwt-auth.guard.ts`.
- Request payloads are shaped by DTO classes in `src/auth/dto/`.
- The Prisma client is provided by `src/prisma/prisma.service.ts` and injected where needed.
- App config values are composed in `src/config/app.config.ts`, `src/config/jwt.config.ts`, and `src/config/mail.config.ts`.
- Health checks are exposed via `src/health/health.controller.ts`.

## Testing

```bash
npm run test
npm run test:e2e
```

Tests are configured using Jest and `ts-jest` with the Jest config in `package.json` and `test/jest-e2e.json`.

## How to contribute

- Keep endpoint contracts stable and documented in the controller methods.
- Add new DTOs for request validation when endpoint payloads change.
- Update `prisma/schema.prisma` for new database models, then run `npx prisma generate`.
- Keep business logic in services and keep controllers thin.
- Use modules to separate features and keep the dependency graph clean.

## Useful commands

```bash
npm run lint
npm run format
npx prisma generate
npx prisma studio
```
