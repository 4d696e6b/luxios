<p align="center">
  <img src="icons/luxios-icon.png" width="128" alt="Luxios crown code mark">
</p>

# Luxios

> Code in luxury.

Luxios is a dark VS Code theme built around deep navy surfaces, restrained champagne-gold interaction cues, and clear syntax for TypeScript, React, and Python.

Every control keeps a muted-gold frame. Selected controls gain a warmer surface, and keyboard focus moves to bright champagne gold—Luxios's glow-like treatment within the colors VS Code exposes.

## Prototype status

This repository currently contains the `0.1.0` theme-family prototype.

- **Luxios** — balanced dark navy and champagne-gold accents for everyday work.
- **Luxios Midnight** — deeper surfaces and softer gold for late sessions.
- **Luxios OLED** — black primary surfaces with carefully separated controls.
- **Luxios Royale** — a richer gold presentation that keeps syntax and status colors conventional.

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
