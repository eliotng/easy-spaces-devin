"use client";

import { gql, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Tile } from "@/components/Tile";
import { TileGrid } from "@/components/TileGrid";
import { useApp } from "@/context/AppContext";

const GET_OPEN_RES = gql`
  query GetOpenReservations {
    getOpenReservations {
      id
      status
      startDate
      endDate
      spaceId
      marketId
      customerId
    }
  }
`;

export default function ReservationsPage() {
  const { data, refetch } = useQuery(GET_OPEN_RES);
  const { setSelectedReservation, lastFlowStatus } = useApp();
  const [selectedRecId, setSelectedRecId] = useState<string | null>(null);

  useEffect(() => {
    if (lastFlowStatus && lastFlowStatus.flowName === "spaceDesigner" && lastFlowStatus.status === "FINISHED") {
      refetch();
    }
  }, [lastFlowStatus, refetch]);

  const records = useMemo(() => data?.getOpenReservations ?? [], [data]);
  const reservations = useMemo(() => {
    return records.map((r: any) => {
      const muted = selectedRecId ? r.id !== selectedRecId : false;
      return { record: r, muted };
    });
  }, [records, selectedRecId]);

  return (
    <main className="space-y-4">
      <TileGrid>
        {reservations.map((r: any) => (
          <Tile
            key={r.record.id}
            title={`Reservation ${r.record.id}`}
            subtitle={`${r.record.startDate} → ${r.record.endDate}`}
            muted={r.muted}
            onClick={() => {
              setSelectedRecId(r.record.id);
              setSelectedReservation(r.record);
            }}
          />
        ))}
      </TileGrid>
      {records.length === 0 ? <div className="text-sm text-slate-600">No reservations.</div> : null}
    </main>
  );
}
