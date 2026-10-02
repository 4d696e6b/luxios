import { access, readFile } from "node:fs/promises";
import { visit } from "jsonc-parser";

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

const failures = [];
const parseJson = async (file) => {
  const source = await readFile(file, "utf8");
  const objects = [];
  visit(source, {
    onObjectBegin: () => objects.push(new Set()),
    onObjectProperty: (property, offset) => {
      const properties = objects.at(-1);
      if (properties.has(property)) failures.push(`${file}: duplicate key ${JSON.stringify(property)} at offset ${offset}.`);
      properties.add(property);
    },
    onObjectEnd: () => objects.pop(),
    onError: (error, offset) => failures.push(`${file}: invalid JSON at offset ${offset} (error ${error}).`)
  }, { disallowComments: true, allowTrailingComma: false });
  return JSON.parse(source);
};

const [manifest, ...themes] = await Promise.all(files.map(parseJson));
const lockfile = await parseJson("package-lock.json");
const theme = themes[0];

for (const file of ["README.md", "CHANGELOG.md", "LICENSE", manifest.icon, ...Object.values(themePaths)]) {
  try {
    await access(file);
  } catch {
    failures.push(`${file} must exist for the Luxios package.`);
  }
}

if (lockfile.version !== manifest.version || lockfile.packages?.[""]?.version !== manifest.version) {
  failures.push("package-lock.json must match the manifest version.");
}

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

const inheritedColor = (candidate, token) => candidate.colors[token] ?? theme.colors[token];

const contrastPairs = (candidate) => [
  ["primary editor text", inheritedColor(candidate, "editor.foreground"), inheritedColor(candidate, "editor.background"), 4.5],
  ["secondary interface text", "#A6ADBB", inheritedColor(candidate, "sideBar.background"), 4.5],
  ["comments", "#8B95A7", inheritedColor(candidate, "editor.background"), 4.5],
  ["comments on raised widgets", "#8B95A7", inheritedColor(candidate, "editorHoverWidget.background"), 4.5],
  ["comments on selected text", "#8B95A7", inheritedColor(candidate, "editor.selectionBackground"), 4.5],
  ["gold button text", inheritedColor(candidate, "button.foreground"), inheritedColor(candidate, "button.background"), 4.5]
];

const variantExpectations = {
  "Luxios Midnight": {
    "editor.background": "#080D17",
    "activityBar.background": "#050810",
    "statusBar.noFolderBackground": "#050810",
    "button.background": "#BFA46F"
  },
  "Luxios OLED": {
    "editor.background": "#000000",
    "activityBar.background": "#000000",
    "statusBar.noFolderBackground": "#000000",
    "panel.background": "#080C12"
  },
  "Luxios Royale": {
    "editor.background": "#0B1020",
    "activityBar.background": "#070A13",
    "statusBar.noFolderBackground": "#070A13",
    "button.background": "#DDB84A"
  }
};

const controlBorders = {
  "Luxios": "#A58A52",
  "Luxios Midnight": "#A58A52",
  "Luxios OLED": "#A58A52",
  "Luxios Royale": "#B29552"
};

const structuralFrames = {
  "Luxios": { sidebar: "#D6B56D", frame: "#A58A52" },
  "Luxios Midnight": { sidebar: "#BFA46F", frame: "#978057" },
  "Luxios OLED": { sidebar: "#D6B56D", frame: "#A58A52" },
  "Luxios Royale": { sidebar: "#DDB84A", frame: "#B29552" }
};

for (const candidate of themes.slice(1)) {
  for (const [token, expected] of Object.entries(variantExpectations[candidate.name])) {
    if (candidate.colors[token] !== expected) failures.push(`${candidate.name}: ${token} must be ${expected}.`);
  }
}

for (const candidate of themes) {
  const expected = controlBorders[candidate.name];
  for (const token of ["input.border", "checkbox.border", "dropdown.border"]) {
    if (inheritedColor(candidate, token) !== expected) failures.push(`${candidate.name}: ${token} must keep the persistent gold control frame.`);
  }
}

for (const candidate of themes) {
  const { sidebar, frame } = structuralFrames[candidate.name];
  if (inheritedColor(candidate, "sideBar.border") !== sidebar) failures.push(`${candidate.name}: the open Sidebar must keep its strong gold frame.`);
  for (const token of ["activityBar.border", "editorGroup.border", "editorGroupHeader.tabsBorder", "tab.border", "panel.border", "statusBar.border"]) {
    if (inheritedColor(candidate, token) !== frame) failures.push(`${candidate.name}: ${token} must keep a gold structural frame.`);
  }
}

for (const candidate of themes) {
  const panelBackground = inheritedColor(candidate, "panel.background");
  for (const token of ["panelTitle.border", "panelTitle.activeBorder"]) {
    if (inheritedColor(candidate, token) !== panelBackground) failures.push(`${candidate.name}: ${token} must not draw a panel-title selection box.`);
  }
}

const contrastResults = [];
for (const candidate of themes) {
  for (const [name, foreground, background, minimum] of contrastPairs(candidate)) {
    const ratio = contrast(foreground, background);
    contrastResults.push([candidate.name, name, ratio]);
    if (ratio < minimum) failures.push(`${candidate.name}: ${name} is ${ratio.toFixed(2)}:1; expected at least ${minimum}:1.`);
  }
}

for (const candidate of themes) {
  for (const token of ["string", "number", "keyword", "function", "type", "property", "enumMember"]) {
    const ratio = contrast(theme.semanticTokenColors[token], inheritedColor(candidate, "editor.background"));
    if (ratio < 7) failures.push(`${candidate.name}: ${token} syntax contrast is ${ratio.toFixed(2)}:1; expected at least 7:1.`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log("Luxios validation passed.");
  for (const [variant, name, ratio] of contrastResults) console.log(`${variant} — ${name}: ${ratio.toFixed(2)}:1`);
}
