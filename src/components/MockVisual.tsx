/**
 * Designed mock product frames. Drop a real PNG at `src` and set ready
 * to true — until then these look intentional, not empty.
 */
/* eslint-disable @next/next/no-img-element */

type Visual = "callin" | "condo" | "realead" | "sunria" | "portrait";

export default function MockVisual({
  kind,
  src,
  ready = false,
  aspect = "aspect-[16/10]",
  alt,
}: {
  kind: Visual;
  src: string;
  ready?: boolean;
  aspect?: string;
  alt: string;
}) {
  if (ready) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${aspect} w-full border-2 border-ink object-cover`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`${aspect} relative w-full overflow-hidden border-2 border-ink bg-paper`}
    >
      {kind === "callin" && <CallinMock />}
      {kind === "condo" && <CondoMock />}
      {kind === "realead" && <RealeadMock />}
      {kind === "sunria" && <SunriaMock />}
      {kind === "portrait" && <PortraitMock />}
    </div>
  );
}

function Chrome({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ink/20 bg-ink px-3 py-2 text-paper">
      <span className="h-1.5 w-1.5 bg-org" />
      <span className="font-mono text-[9px] font-bold uppercase tracking-widest">
        {title}
      </span>
    </div>
  );
}

function CallinMock() {
  return (
    <div className="flex h-full flex-col">
      <Chrome title="Callin.io live agent" />
      <div className="grid flex-1 grid-cols-[1fr_0.9fr]">
        <div className="space-y-2 border-r border-ink/15 p-3">
          <div className="font-mono text-[8px] uppercase text-steel">
            Active call · medical intake
          </div>
          <div className="space-y-1.5">
            <div className="border-l-2 border-org pl-2 text-[10px] leading-snug text-ink/80">
              Agent: I can book you Thursday at 2:40. Does that work?
            </div>
            <div className="ml-auto w-[85%] bg-ink px-2 py-1 text-[10px] text-paper">
              Caller: Yes, Thursday works.
            </div>
            <div className="border-l-2 border-org pl-2 text-[10px] leading-snug text-ink/80">
              Agent: Locked. Calendar invite sent.
            </div>
          </div>
          <div className="mt-2 flex gap-1">
            {["Greet", "Qualify", "Schedule"].map((s, i) => (
              <span
                key={s}
                className={`px-1.5 py-0.5 font-mono text-[7px] uppercase ${
                  i === 2 ? "bg-org text-paper" : "border border-ink/25 text-steel"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2 p-3">
          <div className="font-mono text-[8px] uppercase text-steel">Routing</div>
          {[
            ["Intent", "schedule"],
            ["Model", "light · cached"],
            ["TTFT", "380ms"],
            ["Carrier", "Telnyx"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between border-b border-ink/10 pb-1 font-mono text-[9px]"
            >
              <span className="text-steel">{k}</span>
              <span className="font-bold">{v}</span>
            </div>
          ))}
          <div className="mt-2 border border-ink bg-ink/5 p-2">
            <div className="font-mono text-[8px] text-org">COST THIS TURN</div>
            <div className="font-mono text-[16px] font-bold">$0.0041</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CondoMock() {
  return (
    <div className="flex h-full flex-col">
      <Chrome title="CondoMail inbox agents" />
      <div className="flex-1 space-y-1.5 p-3">
        {[
          ["Urgent", "Amazon seller · return dispute", "Draft ready", true],
          ["Promo", "Newsletter batch · 48 msgs", "Auto-archived", false],
          ["Lead", "Partnership inquiry", "Draft ready", true],
          ["Noise", "Receipts · 12", "Sorted", false],
        ].map(([tag, title, status, hot]) => (
          <div
            key={String(title)}
            className="flex items-center gap-2 border border-ink/20 px-2 py-1.5"
          >
            <span
              className={`shrink-0 px-1 font-mono text-[7px] font-bold uppercase ${
                hot ? "bg-org text-paper" : "border border-ink/20 text-steel"
              }`}
            >
              {tag}
            </span>
            <span className="flex-1 truncate text-[10px] font-medium">{title}</span>
            <span className="font-mono text-[7px] uppercase text-steel">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RealeadMock() {
  return (
    <div className="flex h-full flex-col">
      <Chrome title="Realead lead queue" />
      <div className="grid flex-1 grid-cols-2">
        <div className="space-y-2 border-r border-ink/15 p-3">
          <div className="font-mono text-[8px] uppercase text-steel">Today</div>
          {[
            ["42", "New leads"],
            ["28", "Calls placed"],
            ["11", "Qualified"],
            ["6", "Meetings booked"],
          ].map(([n, l]) => (
            <div key={l} className="border border-ink/15 p-2">
              <div className="font-mono text-[18px] font-bold">{n}</div>
              <div className="font-mono text-[7px] uppercase text-steel">{l}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center gap-2 p-3">
          <div className="font-mono text-[8px] uppercase text-org">Now calling</div>
          <div className="text-[13px] font-bold leading-tight">
            Jordan Hale
            <br />
            <span className="text-[10px] font-normal text-steel">
              Looking at 3BR · downtown
            </span>
          </div>
          <div className="mt-1 h-1.5 w-full border border-ink">
            <div className="h-full w-2/3 bg-org" />
          </div>
          <div className="font-mono text-[8px] text-steel">Qualification · 00:42</div>
        </div>
      </div>
    </div>
  );
}

function SunriaMock() {
  return (
    <div className="flex h-full flex-col">
      <Chrome title="Sunria · field → warehouse" />
      <div className="grid flex-1 grid-cols-3 gap-px bg-ink/15 p-px">
        {["Plot A12", "Plot B03", "Warehouse"].map((label, i) => (
          <div key={label} className="bg-paper p-2">
            <div className="font-mono text-[7px] uppercase text-steel">{label}</div>
            <div className="mt-2 font-mono text-[14px] font-bold">
              {i === 2 ? "84%" : `${62 + i * 11}%`}
            </div>
            <div className="mt-1 h-1 border border-ink/30">
              <div
                className="h-full bg-ink"
                style={{ width: i === 2 ? "84%" : `${62 + i * 11}%` }}
              />
            </div>
            <div className="mt-2 font-mono text-[7px] text-steel">
              {i === 2 ? "Inbound sync OK" : "Harvest logged"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PortraitMock() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-ink text-paper">
      <div className="flex h-28 w-28 items-center justify-center border-2 border-org font-mono text-4xl font-bold tracking-tighter text-org">
        HT
      </div>
    </div>
  );
}
