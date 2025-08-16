<<<<<<< HEAD
# easy-spaces-devin

Next.js port of the Easy Spaces LWC sample using Tailwind CSS and a GraphQL API.

## Stack

- Next.js 14 App Router (TypeScript)
- Tailwind CSS
- Apollo Client
- GraphQL Yoga (API route)

## Getting started

- npm install
- npm run dev
- Visit http://localhost:3000

## Scripts

- dev: start dev server
- build: build for production
- start: start production server
- lint: run ESLint
- type-check: run TypeScript

## Pages

- /customers: Select object type and browse customers
- /reservations: View and select open reservations with muting logic
- /designer: Filter related spaces by market and select one, then complete

## GraphQL

- Endpoint: /api/graphql
- Queries:
  - getCustomerList(sObjectType)
  - getOpenReservations
  - getRelatedSpaces(marketId)
- Mutations:
  - createReservation(input)
  - completeDesigner(input)

The API uses an in-memory store by default. You can later seed it with data from the source repository.
||||||| empty tree
=======
# easy-spaces-devin
>>>>>>> origin/main
