import { createYoga, createSchema } from "graphql-yoga";

type Customer = { id: string; name: string; email?: string; city?: string; state?: string; status?: string; type: "Contact" | "Lead" };
type Market = { id: string; name: string; totalDailyBookingRate?: number };
type Space = { id: string; name: string; type: string[]; category?: string; minCapacity?: number; maxCapacity?: number; predictedBookingRate?: number; dailyBookingRate?: number; marketId: string };
type Reservation = { id: string; startDate: string; endDate: string; status: string; marketId: string; spaceId: string; customerId: string };

const customers: Customer[] = [
  { id: "c-1", name: "Ada Lovelace", email: "ada@example.com", city: "London", state: "", status: "Prospect", type: "Contact" },
  { id: "l-1", name: "Grace Hopper", email: "grace@example.com", city: "Arlington", state: "VA", status: "New", type: "Lead" }
];

const markets: Market[] = [
  { id: "market-1", name: "Downtown" },
  { id: "market-2", name: "Uptown" }
];

const spaces: Space[] = [
  { id: "space-1", name: "Cafe Corner", type: ["Indoor", "Conversation Starter"], category: "Cafe", minCapacity: 2, maxCapacity: 10, marketId: "market-1" },
  { id: "space-2", name: "Rooftop Lounge", type: ["Outdoor", "Relaxing"], category: "Lounge", minCapacity: 5, maxCapacity: 30, marketId: "market-1" },
  { id: "space-3", name: "Game Room", type: ["Energizing", "Large Groups", "Indoor"], category: "Games", minCapacity: 4, maxCapacity: 20, marketId: "market-2" }
];

const reservations: Reservation[] = [
  { id: "r-1", startDate: "2025-08-20", endDate: "2025-08-21", status: "Open", marketId: "market-1", spaceId: "space-1", customerId: "c-1" }
];

const typeDefs = /* GraphQL */ `
  type Query {
    getCustomerList(sObjectType: String!): [Customer!]!
    getOpenReservations: [Reservation!]!
    getRelatedSpaces(marketId: ID!): [Space!]!
  }

  type Mutation {
    createReservation(input: CreateReservationInput!): Reservation!
    completeDesigner(input: CompleteDesignerInput!): Boolean!
  }

  type Customer {
    id: ID!
    name: String!
    email: String
    city: String
    state: String
    status: String
  }

  type Reservation {
    id: ID!
    startDate: String!
    endDate: String!
    status: String!
    marketId: ID!
    spaceId: ID!
    customerId: ID!
  }

  type Space {
    id: ID!
    name: String!
    type: [String!]!
    category: String
    minCapacity: Int
    maxCapacity: Int
    predictedBookingRate: Float
    dailyBookingRate: Float
    marketId: ID!
  }

  type Market {
    id: ID!
    name: String!
    totalDailyBookingRate: Float
  }

  input CreateReservationInput {
    marketId: ID!
    spaceId: ID!
    customerId: ID!
    startDate: String!
    endDate: String!
  }

  input CompleteDesignerInput {
    marketId: ID!
    selectedSpaceId: ID!
    popTabOnFinish: Boolean
  }
`;

const resolvers = {
  Query: {
    getCustomerList: (_: unknown, args: { sObjectType: string }) => {
      return customers.filter((c) => c.type.toLowerCase() === args.sObjectType.toLowerCase());
    },
    getOpenReservations: () => {
      return reservations.filter((r) => r.status === "Open");
    },
    getRelatedSpaces: (_: unknown, args: { marketId: string }) => {
      return spaces.filter((s) => s.marketId === args.marketId);
    }
  },
  Mutation: {
    createReservation: (_: unknown, args: { input: { marketId: string; spaceId: string; customerId: string; startDate: string; endDate: string } }) => {
      const id = `r-${reservations.length + 1}`;
      const res: Reservation = { id, status: "Open", ...args.input };
      reservations.push(res);
      return res;
    },
    completeDesigner: (_: unknown, _args: { input: { marketId: string; selectedSpaceId: string; popTabOnFinish?: boolean } }) => {
      return true;
    }
  }
};

const schema = createSchema({ typeDefs, resolvers });

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/api/graphql",
  fetchAPI: { Request, Response }
});

export function GET(request: Request) {
  return yoga(request);
}
export function POST(request: Request) {
  return yoga(request);
}
export function OPTIONS(request: Request) {
  return yoga(request);
}
