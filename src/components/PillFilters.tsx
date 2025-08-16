"use client";

type Props = {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
};

export function PillFilters({ options, selected, onChange }: Props) {
  const toggle = (o: string) => {
    const s = new Set(selected);
    if (s.has(o)) s.delete(o);
    else s.add(o);
    onChange(Array.from(s));
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => toggle(o)}
          className={`rounded-full border px-3 py-1 text-sm ${selected.includes(o) ? "bg-slate-900 text-white" : "bg-white text-slate-800"}`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
