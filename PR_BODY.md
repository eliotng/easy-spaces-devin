This PR scaffolds the Easy Spaces LWC port to a Next.js 14 app with Tailwind CSS and a co-located GraphQL API (graphql-yoga). It implements the core flows: Customers, Reservations (with “muted” selection behavior), and a Space Designer with pill filters and space selection.

What’s included
- Next.js 14 App Router + TypeScript
- Tailwind CSS setup
- Apollo Client for GraphQL on the client
- GraphQL Yoga API under /api/graphql with in-memory data store
- Pages:
  - /customers: switch between Contacts/Leads, select a customer
  - /reservations: list “Open” reservations, selecting one mutes others
  - /designer: related spaces by market with filterable pills and selection
- React Context replaces Salesforce LMS to coordinate selections and flow completion signals
- Lint/type-check/build pass locally

How to run
- npm install
- npm run dev (http://localhost:3000)
- npm run build to verify production build
- npm run lint and npm run type-check should pass (there’s a non-blocking react-hooks warning in the reservations page which can be tuned later)

GraphQL schema overview
- Query:
  - getCustomerList(sObjectType: String!): [Customer!]!
  - getOpenReservations: [Reservation!]!
  - getRelatedSpaces(marketId: ID!): [Space!]!
- Mutations:
  - createReservation(input: CreateReservationInput!): Reservation!
  - completeDesigner(input: CompleteDesignerInput!): Boolean!

Data store
- In-memory seed for customers, markets, spaces, reservations (mock data) to enable flows
- Next step could be to seed from the original easy-spaces-lwc/data JSON, or connect to a real backend

Parity notes vs LWC
- LMS replaced with React Context for app-wide selection and “flow finished” signals
- Muted reservation visuals implemented in React/Tailwind
- Designer pill filters mirror LWC behavior by matching space.type arrays
- Flow completion triggers refetch patterns to update lists

Link to Devin run
https://app.devin.ai/sessions/4c4c5124e8c54a88af74df49fb1736b7

Requested by
- Eliot Ng (@eliotng)
