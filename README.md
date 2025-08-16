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

- Seeded from the original Easy Spaces LWC JSON under src/data/sfdc:
  - src/data/sfdc/Market__cs.json
  - src/data/sfdc/Space__cs.json
  - src/data/sfdc/Reservation__cs.json
  - src/data/sfdc/Contacts.json
  - src/data/sfdc/Leads.json
- Mappings:
  - Market: id derived from Salesforce referenceId (e.g., Market__cRef8 -> market-8), name from Name
  - Space: id from referenceId; name, type (semicolon-delimited Type__c), category, capacities, predicted/daily rates; marketId from Market__c
  - Customer (Contact/Lead): id from referenceId; name from FirstName + LastName; email/city/state from source; status from Reservation_Status__c (Contacts); type set to "Contact" or "Lead"
  - Reservation: id from referenceId; status normalized to "Open" for demo; dates from Start_Date__c / End_Date__c; marketId from Market__c; customerId resolved from Contact__c/Lead__c; spaceId chosen from a seeded Space in the same market
- The API uses an in-memory store by default.

## UI polish

- Professional app shell (sticky header, improved nav, footer)
- Card-based homepage tiles with hover/focus states
- Subtle backgrounds, borders, and spacing improvements using Tailwind
