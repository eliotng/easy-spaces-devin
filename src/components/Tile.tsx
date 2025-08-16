"use client";

type Props = {
  title: string;
  subtitle?: string;
  muted?: boolean;
  onClick?: () => void;
};

export function Tile({ title, subtitle, muted, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border p-4 text-left transition ${muted ? "opacity-50" : "opacity-100"} hover:bg-slate-50`}
    >
      <div className="text-sm font-medium">{title}</div>
      {subtitle ? <div className="text-xs text-slate-600">{subtitle}</div> : null}
    </button>
  );
}
