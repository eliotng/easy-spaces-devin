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

## Data seeding

- Markets and Reservations are seeded from the original Easy Spaces LWC JSON under src/data/sfdc:
  - src/data/sfdc/Market__cs.json
  - src/data/sfdc/Reservation__cs.json
- Mappings:
  - Market: id derived from Salesforce referenceId (e.g. Market__cRef8 -> market-8), name from Name
  - Reservation: id from referenceId, status normalized to "Open" for demo visibility, dates from Start_Date__c / End_Date__c, marketId from Market__c reference
- Spaces and Customers currently use small mock datasets. We can extend the seeding to include Space__cs.json and Contacts/Leads in a follow-up.

The API uses an in-memory store by default. You can later seed it with additional data from the source repository.
