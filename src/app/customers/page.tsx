"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Tile } from "@/components/Tile";
import { TileGrid } from "@/components/TileGrid";
import { useApp } from "@/context/AppContext";

const GET_CUSTOMERS = gql`
  query GetCustomers($sObjectType: String!) {
    getCustomerList(sObjectType: $sObjectType) {
      id
      name
      email
      city
      state
      status
    }
  }
`;

export default function CustomersPage() {
  const [sObjectType, setSObjectType] = useState("Contact");
  const { data, refetch } = useQuery(GET_CUSTOMERS, { variables: { sObjectType } });
  const { setSelectedCustomer, lastFlowStatus } = useApp();

  useEffect(() => {
    if (lastFlowStatus && lastFlowStatus.flowName === "createReservation" && lastFlowStatus.status === "FINISHED") {
      if (lastFlowStatus.state?.sobjecttype === sObjectType) {
        refetch();
      }
    }
  }, [lastFlowStatus, sObjectType, refetch]);

  const customers = data?.getCustomerList ?? [];

  return (
    <main className="space-y-4">
      <div className="flex items-center gap-3">
        <label className="text-sm">Object</label>
        <select
          value={sObjectType}
          onChange={(e) => setSObjectType(e.target.value)}
          className="rounded border px-2 py-1 text-sm"
        >
          <option>Contact</option>
          <option>Lead</option>
        </select>
      </div>

      <TileGrid>
        {customers.map((c: any) => (
          <Tile key={c.id} title={c.name} subtitle={`${c.city ?? ""} ${c.state ?? ""}`} onClick={() => setSelectedCustomer(c)} />
        ))}
      </TileGrid>
    </main>
  );
}
