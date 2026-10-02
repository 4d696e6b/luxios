# Luxios testing record

Use this document as the acceptance checklist for each release candidate. Record the date, VS Code build, operating system, language provider version, semantic-highlighting setting, theme variant, and result for every completed pass.

## Latest recorded build

After reloading the normal macOS VS Code 1.96.2 window on 2026-10-02, the installed extension details visibly showed the supplied crown in both the extension header and README, with identifier `4d696e6b.luxios` and version `0.1.5`. The TSX fixture opened under the active Luxios palette with gold workbench separators and readable main syntax roles. This window has unrelated extensions and an unresolved React import in the standalone fixture, so it does not replace the clean-profile visual review or a release screenshot.

On 2026-10-02, the `4d696e6b` Marketplace publisher profile was saved with a 128×128 export of the supplied crown artwork, and the logo was visually confirmed on the public publisher page. The extension itself has not been uploaded to Marketplace. Re-running `npm ci`, `npm run package`, and `npm run list-package` passed for `0.1.5`; the VSIX contains the expected 11 files and is 877.82 KB. The installed VS Code profile still reports `4d696e6b.luxios@0.1.5`.

In a clean macOS VS Code 1.96.2 profile containing only `4d696e6b.luxios@0.1.5`, the TSX fixture loaded with the default Luxios palette. The Color Theme picker displayed and loaded Luxios, Luxios OLED, Luxios Royale, and Luxios Midnight; the primary editor, Explorer edge, tab separators, buttons, and status bar retained the gold framing across the pass. No visual blocker was found. The standalone TSX file still reports five missing React-related problems because the fixture is intentionally not a full application.

On 2026-10-02, Luxios `0.1.5` replaced the packaged icon with the supplied original crown artwork. The PNG embedded in the VSIX matches that source byte for byte. `npm ci`, validation, packaging, and package-list inspection passed; the VSIX is 877.68 KB with only the intended runtime files. An isolated Visual Studio Code 1.96.2 profile installed it as `4d696e6b.luxios@0.1.5`. At 128 and 32 pixels, the crown and code motif remain visible; at 16 pixels, the crown remains recognizable while the code detail is too small to read.

On 2026-10-02, Luxios `0.1.4` was packaged with Node.js 22.12.0 on macOS 14.7.2. `npm ci`, `npm run validate`, `npm run package`, `npm run list-package`, and the Python fixture passed. The VSIX contains the manifest, license, README, changelog, crown PNG, and four theme JSON files. An isolated VS Code 1.96.2 profile installed it as `4d696e6b.luxios@0.1.4`. GitHub validation passed on both `main` and `dev` after the public repository was created.

The later [three-platform CI run](https://github.com/4d696e6b/luxios/actions/runs/36971317738) also passed `npm ci` and VSIX packaging on Ubuntu, macOS, and Windows. These CI jobs check package portability; they do not exercise the VS Code interface on those systems.

This records package and installation checks. The final screenshot set, current-build visual review of every variant, Windows smoke test, and physical OLED review are still pending; no result is inferred from the automated checks.

## Working-profile visual smoke check

On 2026-10-02, the TSX fixture was viewed in Luxios, Midnight, OLED, and Royale in an existing macOS VS Code profile; the Python fixture was viewed in Royale. The four variants appeared in the theme picker, gold Sidebar and tab separators remained visible, and OLED used a black editor surface. The checked palette came from the installed `0.1.3` build; the four theme JSON files are unchanged in `0.1.4`. This profile has unrelated extensions and user settings, and the standalone TSX fixture reports missing React dependencies, so this is not the clean-profile release review or the final screenshot set.

## Automated checks

- Run `npm ci` followed by `npm run validate`. It checks JSON structure, variant inheritance, and the declared text/control contrast targets across all four variants.
- Run `npm run package` and inspect `npm run list-package`.
- Confirm every included file belongs in the VSIX.
- Compile and run `examples/python/luxios_showcase.py`.
- Check the crown PNG at 16, 32, 48, 128, and 256 pixels.

## Visual baseline

- Load each variant in an Extension Development Host with a clean profile.
- Test focused and unfocused editor groups, active/inactive/dirty tabs, keyboard focus, selections, hover states, menus, inputs, and disabled controls.
- Confirm idle controls retain their muted-gold frame, while selected and keyboard-focused controls use the brighter focus border and warm selection surface. This is Luxios's supported glow treatment; VS Code does not expose a general blur or bloom token.
- Confirm the open Sidebar has the strongest gold outer edge and that activity-bar, tab-strip, editor-group, panel, status-bar, and tree-guide separators remain gold rather than gray.
- Confirm active panel titles remain readable without a gold selection outline; the brighter gold should be reserved for the outer application frame.
- Test the command palette, suggestion widget, hover, peek, find/replace, multiple editor groups, sidebar, panel, status bar, terminal, Source Control, Problems, diff, merge, debugging, notebooks, and settings.
- Test available native chat and inline-chat surfaces. Record the exact host and VS Code build; do not generalize an observed surface to all AI extensions.

## Language fixtures

- Review JavaScript, TypeScript, JSX, TSX, HTML, CSS, SCSS, JSON, JSONC, Markdown, and Python using the committed files in `examples/`.
- Inspect representative tokens with **Developer: Inspect Editor Tokens and Scopes**.
- Repeat TypeScript/React and Python checks with semantic highlighting both enabled and disabled.
- Add the smallest specific TextMate or semantic rule for an observed defect; avoid broad overrides.

## Display and platform matrix

- Complete a full pass on the primary development platform.
- Perform a release smoke test on macOS and Windows; test Linux when practical.
- Check laptop-LCD low brightness, normal brightness, a bright room, and a dark room.
- Check physical OLED hardware when available. Mark it untested rather than inferring it from a screenshot.

## Release blockers

- Unreadable enabled text, comments, selected text, or a missing cursor/focus state.
- Ambiguous error, warning, success, information, or Git state.
- A broken theme contribution, missing asset, unexpected package file, or an overbroad syntax rule that miscolors common code.
