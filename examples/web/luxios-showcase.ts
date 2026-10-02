export type ThemeName = "Luxios" | "Luxios Midnight" | "Luxios OLED" | "Luxios Royale";

export enum ThemeState {
  Draft = "draft",
  Ready = "ready"
}

export interface ThemeDefinition<TName extends ThemeName = ThemeName> {
  readonly name: TName;
  state: ThemeState;
  accents: Record<string, string>;
}

const contrastTarget = 4.5;

export async function activateTheme<TName extends ThemeName>(theme: ThemeDefinition<TName>): Promise<string> {
  const { name, accents } = theme;
  const isReady = theme.state === ThemeState.Ready && Boolean(accents.identity);

  await Promise.resolve(isReady);
  return `${name} ${isReady ? "is active" : "needs an identity accent"} (${contrastTarget}:1)`;
}
