# Luxios testing record

Use this document as the acceptance checklist for each release candidate. Record the date, VS Code build, operating system, language provider version, semantic-highlighting setting, theme variant, and result for every completed pass.

## Automated checks

- Run `npm ci` followed by `npm run validate`. It checks JSON structure, variant inheritance, and the declared text/control contrast targets across all four variants.
- Run `npm run package` and inspect `npm run list-package`.
- Confirm every included file belongs in the VSIX.
- Compile and run `examples/python/luxios_showcase.py`.
- Check the crown PNG at 16, 32, 48, 128, and 256 pixels.

## Visual baseline

- Load each variant in an Extension Development Host with a clean profile.
- Test focused and unfocused editor groups, active/inactive/dirty tabs, keyboard focus, selections, hover states, menus, inputs, and disabled controls.
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
