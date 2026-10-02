import { type CSSProperties, useMemo, useState } from "react";

export interface ThemeCardProps<T extends string> {
  name: T;
  accent?: string;
  active?: boolean;
}

const defaultAccent = "#D6B56D";

export function ThemeCard<T extends string>({ name, accent = defaultAccent, active = true }: ThemeCardProps<T>) {
  const [enabled, setEnabled] = useState(active);
  const style = useMemo<CSSProperties>(() => ({ borderColor: accent }), [accent]);

  return (
    <article className="theme-card" style={style} aria-live="polite">
      <h2>{name}</h2>
      <p>{enabled ? "Ready for a focused session." : "Theme preview paused."}</p>
      <button type="button" onClick={() => setEnabled((value) => !value)}>
        {enabled ? "Pause preview" : "Resume preview"}
      </button>
    </article>
  );
}
