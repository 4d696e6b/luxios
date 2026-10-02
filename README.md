<p align="center">
  <img src="icons/luxios-icon.png" width="128" alt="Luxios crown code mark">
</p>

# Luxios

> Code in luxury.

Luxios is a dark VS Code theme built around deep navy surfaces, restrained champagne-gold interaction cues, and clear syntax for TypeScript, React, and Python.

Every control keeps a muted-gold frame. Selected controls gain a warmer surface, and keyboard focus moves to bright champagne gold—Luxios's glow-like treatment within the colors VS Code exposes.

The extension icon uses the original gold crown artwork in [`icons/source/luxios-crown-original.png`](icons/source/luxios-crown-original.png).

## Current build

Luxios `0.1.5` is a local release-preparation build. Its four variants are:

- **Luxios** — balanced dark navy and champagne-gold accents for everyday work.
- **Luxios Midnight** — deeper surfaces and softer gold for late sessions.
- **Luxios OLED** — black primary surfaces with carefully separated controls.
- **Luxios Royale** — a richer gold presentation that keeps syntax and status colors conventional.

To try a packaged build, run **Extensions: Install from VSIX…** in VS Code, choose the latest `luxios-*.vsix`, and then select a variant with **Preferences: Color Theme** (`⌘K ⌘T` on macOS).

VS Code themes control border colors but cannot change the thickness of the outer application border or create a blurred glow.

## Development

```sh
npm install
npm run validate
```

Open this folder in VS Code and run **Extension: Run Extension**. In the Extension Development Host, select **Luxios** from the Color Theme picker.

The fixtures in `examples/web` and `examples/python` are the initial syntax-review files. Use **Developer: Inspect Editor Tokens and Scopes** before expanding a token rule.

`npm run package` creates a local VSIX after validation. The [testing record](docs/testing.md) and [release checklist](docs/release.md) document the review required before any public release.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for focused scope and readability reports.

## License

[MIT](LICENSE)
