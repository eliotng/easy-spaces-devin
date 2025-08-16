import { createYoga, createSchema } from "graphql-yoga";
import { seededMarkets as seededMarketsRaw, seededReservations as seededReservationsRaw, seededSpaces as seededSpacesRaw, seededCustomers as seededCustomersRaw } from "./seed";

type Customer = { id: string; name: string; email?: string; city?: string; state?: string; status?: string; type: "Contact" | "Lead" };
type Market = { id: string; name: string; totalDailyBookingRate?: number };
type Space = { id: string; name: string; type: string[]; category?: string; minCapacity?: number; maxCapacity?: number; predictedBookingRate?: number; dailyBookingRate?: number; marketId: string };
type Reservation = { id: string; startDate: string; endDate: string; status: string; marketId: string; spaceId: string; customerId: string };

const customers: Customer[] = seededCustomersRaw.map(c => ({ ...c }));

const markets: Market[] = seededMarketsRaw.map(m => ({ id: m.id, name: m.name }));

const spaces: Space[] = seededSpacesRaw.map(s => ({ ...s }));

const reservations: Reservation[] = seededReservationsRaw.map(r => ({ ...r }));

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
