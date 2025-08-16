import marketsJson from "../../../data/sfdc/Market__cs.json";
import reservationsJson from "../../../data/sfdc/Reservation__cs.json";

export type SeedMarket = { id: string; name: string; totalDailyBookingRate?: number };
export type SeedReservation = { id: string; startDate: string; endDate: string; status: string; marketId: string; spaceId: string; customerId: string };

type MarketRecord = {
  attributes: { type: string; referenceId: string };
  Name: string;
};

type ReservationRecord = {
  attributes: { type: string; referenceId: string };
  Contact__c?: string;
  Market__c: string;
  Start_Date__c: string;
  End_Date__c: string;
  Status__c: string;
};

function refToId(ref: string) {
  const m = ref.match(/@?([A-Za-z_]+Ref)(\d+)/);
  if (!m) return ref.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  const base = m[1].replace(/__cRef$/i, "").replace(/Ref$/i, "").toLowerCase();
  const num = m[2];
  return `${base}-${num}`;
}

export function seedMarkets(): SeedMarket[] {
  const records = (marketsJson as any).records as MarketRecord[];
  return records.map((r) => ({
    id: refToId(r.attributes.referenceId),
    name: r.Name
  }));
}

export function seedReservations(): SeedReservation[] {
  const records = (reservationsJson as any).records as ReservationRecord[];
  return records.map((r) => ({
    id: refToId(r.attributes.referenceId),
    startDate: r.Start_Date__c,
    endDate: r.End_Date__c,
    status: "Open",
    marketId: refToId(r.Market__c),
    spaceId: "space-1",
    customerId: "c-1"
  }));
}

export const seededMarkets = seedMarkets();
export const seededReservations = seedReservations();
