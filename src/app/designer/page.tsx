"use client";

import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { Tile } from "@/components/Tile";
import { TileGrid } from "@/components/TileGrid";
import { PillFilters } from "@/components/PillFilters";
import { useApp } from "@/context/AppContext";

const GET_SPACES = gql`
  query GetRelatedSpaces($marketId: ID!) {
    getRelatedSpaces(marketId: $marketId) {
      id
      name
      type
      marketId
    }
  }
`;

const COMPLETE = gql`
  mutation CompleteDesigner($input: CompleteDesignerInput!) {
    completeDesigner(input: $input)
  }
`;

const PILLVALUES = [
  "Scheduled Activity",
  "Come-and-Go",
  "Large Groups",
  "Individuals or Small Groups",
  "Indoor",
  "Outdoor",
  "Conversation Starter",
  "Energizing",
  "Quiet",
  "Relaxing"
];

export default function DesignerPage() {
  const [marketId, setMarketId] = useState("market-1");
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState<string | null>(null);
  const { setLastFlowStatus } = useApp();

  const { data } = useQuery(GET_SPACES, { variables: { marketId } });
  const [completeDesigner, { loading: completing }] = useMutation(COMPLETE, {
    onCompleted: () => {
      setLastFlowStatus({ flowName: "spaceDesigner", status: "FINISHED" });
    }
  });

  const items = useMemo(() => {
    const recs = data?.getRelatedSpaces ?? [];
    return recs.map((r: any) => {
      const types: string[] = r.type ?? [];
      const muted = filters.some((f) => !types.includes(f));
      return { record: r, muted };
    });
  }, [data, filters]);

  useEffect(() => {
    setSelectedSpaceId(null);
  }, [marketId]);

  return (
    <main className="space-y-6">
      <div className="flex items-center gap-3">
        <label className="text-sm">Market</label>
        <select className="rounded border px-2 py-1 text-sm" value={marketId} onChange={(e) => setMarketId(e.target.value)}>
          <option value="market-1">Market 1</option>
          <option value="market-2">Market 2</option>
        </select>
      </div>

      <PillFilters options={PILLVALUES} selected={filters} onChange={setFilters} />

      <TileGrid>
        {items.map((it: any) => (
          <Tile
            key={it.record.id}
            title={it.record.name}
            subtitle={Array.isArray(it.record.type) ? it.record.type.join(", ") : ""}
            muted={it.muted}
            onClick={() => setSelectedSpaceId(it.record.id)}
          />
        ))}
      </TileGrid>

      <div className="flex gap-3">
        <button
          disabled={!selectedSpaceId || completing}
          onClick={() =>
            completeDesigner({ variables: { input: { marketId, selectedSpaceId, popTabOnFinish: false } } })
          }
          className="rounded bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Add
        </button>
        <button
          disabled={!selectedSpaceId || completing}
          onClick={() =>
            completeDesigner({ variables: { input: { marketId, selectedSpaceId, popTabOnFinish: true } } })
          }
          className="rounded border border-slate-300 bg-white px-4 py-2 text-sm disabled:opacity-50"
        >
          Add and Navigate
        </button>
      </div>
    </main>
  );
}
