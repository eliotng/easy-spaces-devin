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
- Spaces are now seeded from Space__cs.json with mappings:
  - id from referenceId (e.g., Space__cRef2 -> space-2)
  - name from Name
  - type from semicolon-delimited Type__c
  - category from Category__c
  - minCapacity/maxCapacity from Minimum/Maximum_Capacity__c
  - predictedBookingRate from Predicted_Booking_Rate__c
  - dailyBookingRate from Daily_Booking_Rate__c
  - marketId from Market__c reference
- Customers currently use a small mock dataset. We can extend seeding to Contacts/Leads if desired.

The API uses an in-memory store by default. You can later seed it with additional data from the source repository.
