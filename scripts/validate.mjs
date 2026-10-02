import { readFile } from "node:fs/promises";

const themePaths = {
  "Luxios": "themes/luxios-color-theme.json",
  "Luxios Midnight": "themes/luxios-midnight-color-theme.json",
  "Luxios OLED": "themes/luxios-oled-color-theme.json",
  "Luxios Royale": "themes/luxios-royale-color-theme.json"
};
const files = ["package.json", ...Object.values(themePaths)];
const hex = /^#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?$/;

const relativeLuminance = (hexValue) => {
  const values = [1, 3, 5].map((offset) => Number.parseInt(hexValue.slice(offset, offset + 2), 16) / 255);
  const linear = values.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
};

const contrast = (first, second) => {
  const [dark, light] = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => a - b);
  return (light + 0.05) / (dark + 0.05);
};

const [manifest, ...themes] = await Promise.all(files.map(async (file) => JSON.parse(await readFile(file, "utf8"))));
const theme = themes[0];
const failures = [];

if (manifest.contributes?.themes?.length !== 4 || manifest.contributes.themes.some(({ label, path }) => themePaths[label] !== path.replace(/^\.\//, ""))) {
  failures.push("package.json must contribute all four Luxios theme variants.");
}

if (theme.name !== "Luxios" || theme.type !== "dark" || theme.semanticHighlighting !== true) {
  failures.push("Theme metadata must identify Luxios as a dark semantic-highlighting theme.");
}

for (const [index, [name, path]] of Object.entries(themePaths).entries()) {
  const candidate = themes[index];
  if (candidate.name !== name || candidate.type !== "dark") failures.push(`${path} must identify ${name} as a dark theme.`);
  if (index > 0 && candidate.include !== "./luxios-color-theme.json") failures.push(`${path} must inherit the default Luxios token system.`);
}

for (const [token, color] of Object.entries(theme.colors)) {
  if (!hex.test(color)) failures.push(`${token} must use a six- or eight-digit hexadecimal color.`);
}

for (const candidate of themes.slice(1)) {
  for (const [token, color] of Object.entries(candidate.colors)) {
    if (!hex.test(color)) failures.push(`${candidate.name}: ${token} must use a six- or eight-digit hexadecimal color.`);
  }
}

const pairs = [
  ["primary editor text", "#E8ECF3", "#0B1120", 4.5],
  ["secondary editor text", "#A6ADBB", "#0B1120", 4.5],
  ["comments", "#8B95A7", "#0B1120", 4.5],
  ["comment text on raised widgets", "#8B95A7", "#151D2E", 4.5],
  ["gold button text", "#0B1120", "#D6B56D", 4.5]
];

for (const [name, foreground, background, minimum] of pairs) {
  const ratio = contrast(foreground, background);
  if (ratio < minimum) failures.push(`${name} is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1.`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Luxios validation passed.");
  for (const [name, foreground, background] of pairs) console.log(`${name}: ${contrast(foreground, background).toFixed(2)}:1`);
}
