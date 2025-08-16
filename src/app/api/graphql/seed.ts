import marketsJson from "../../../data/sfdc/Market__cs.json";
import reservationsJson from "../../../data/sfdc/Reservation__cs.json";
import spacesJson from "../../../data/sfdc/Space__cs.json";
import contactsJson from "../../../data/sfdc/Contacts.json";
import leadsJson from "../../../data/sfdc/Leads.json";

export type SeedMarket = { id: string; name: string; totalDailyBookingRate?: number };
export type SeedReservation = { id: string; startDate: string; endDate: string; status: string; marketId: string; spaceId: string; customerId: string };
export type SeedSpace = { id: string; name: string; type: string[]; category?: string; minCapacity?: number; maxCapacity?: number; predictedBookingRate?: number; dailyBookingRate?: number; marketId: string };
export type SeedCustomer = { id: string; name: string; email?: string; city?: string; state?: string; status?: string; type: "Contact" | "Lead" };

type MarketRecord = {
  attributes: { type: string; referenceId: string };
  Name: string;
};

type ReservationRecord = {
  attributes: { type: string; referenceId: string };
  Contact__c?: string;
  Lead__c?: string;
  Market__c: string;
  Start_Date__c: string;
  End_Date__c: string;
  Status__c: string;
};

type SpaceRecord = {
  attributes: { type: string; referenceId: string };
  Name: string;
  Category__c?: string;
  Type__c?: string;
  Minimum_Capacity__c?: number;
  Maximum_Capacity__c?: number;
  Predicted_Booking_Rate__c?: number;
  Daily_Booking_Rate__c?: number;
  Market__c: string;
};

type ContactRecord = {
  attributes: { type: string; referenceId: string };
  Email?: string;
  FirstName?: string;
  LastName?: string;
  MailingCity?: string;
  MailingState?: string;
  Reservation_Status__c?: string;
};

type LeadRecord = {
  attributes: { type: string; referenceId: string };
  Email?: string;
  FirstName?: string;
  LastName?: string;
  City?: string;
  State?: string;
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

export function seedSpaces(): SeedSpace[] {
  const records = (spacesJson as any).records as SpaceRecord[];
  return records.map((s) => ({
    id: refToId(s.attributes.referenceId),
    name: s.Name,
    type: (s.Type__c ? s.Type__c.split(";").map((t) => t.trim()).filter(Boolean) : []),
    category: s.Category__c,
    minCapacity: s.Minimum_Capacity__c,
    maxCapacity: s.Maximum_Capacity__c,
    predictedBookingRate: s.Predicted_Booking_Rate__c,
    dailyBookingRate: s.Daily_Booking_Rate__c,
    marketId: refToId(s.Market__c)
  }));
}

export function seedCustomers(): SeedCustomer[] {
  const contacts = (contactsJson as any).records as ContactRecord[];
  const leads = (leadsJson as any).records as LeadRecord[];

  const contactCustomers: SeedCustomer[] = contacts.map((c) => ({
    id: refToId(c.attributes.referenceId),
    name: [c.FirstName, c.LastName].filter(Boolean).join(" ").trim() || "Contact",
    email: c.Email,
    city: c.MailingCity,
    state: c.MailingState,
    status: c.Reservation_Status__c,
    type: "Contact"
  }));

  const leadCustomers: SeedCustomer[] = leads.map((l) => ({
    id: refToId(l.attributes.referenceId),
    name: [l.FirstName, l.LastName].filter(Boolean).join(" ").trim() || "Lead",
    email: l.Email,
    city: l.City,
    state: l.State,
    type: "Lead"
  }));

  return [...contactCustomers, ...leadCustomers];
}

export function seedReservations(spaces: SeedSpace[], customers: SeedCustomer[]): SeedReservation[] {
  const records = (reservationsJson as any).records as ReservationRecord[];
  return records.map((r) => {
    const marketId = refToId(r.Market__c);
    const rawRef = r.Contact__c ?? r.Lead__c;
    const customerId = rawRef ? refToId(rawRef) : (customers[0]?.id ?? "contact-1");
    const marketSpaces = spaces.filter((s) => s.marketId === marketId);
    const spaceId = marketSpaces[0]?.id ?? spaces[0]?.id ?? "space-1";
    return {
      id: refToId(r.attributes.referenceId),
      startDate: r.Start_Date__c,
      endDate: r.End_Date__c,
      status: "Open",
      marketId,
      spaceId,
      customerId
    };
  });
}

export const seededMarkets = seedMarkets();
export const seededSpaces = seedSpaces();
export const seededCustomers = seedCustomers();
export const seededReservations = seedReservations(seededSpaces, seededCustomers);
