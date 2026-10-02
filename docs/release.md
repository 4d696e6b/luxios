# Luxios release checklist

## Before publishing

- Choose and verify the final Marketplace publisher ID. The current manifest's publisher is a development placeholder until ownership is confirmed.
- Confirm the final GitHub repository, homepage, bugs URL, author copyright name, and `engines.vscode` floor from actual tested builds.
- Complete the test record in `docs/testing.md` for every variant.
- Update `CHANGELOG.md`, version, README screenshots, and Marketplace metadata.
- Run `npm ci`, `npm run validate`, `npm run package`, and `npm run list-package`.
- Install the generated VSIX into a clean profile and select all four themes.

## Publishing

1. Freeze the reviewed commit and create a matching version tag.
2. Upload the reviewed VSIX through Marketplace publisher management, or use an established identity-based release workflow.
3. Install the Marketplace build in a fresh profile and verify version, icon, listing links, and all theme labels.
4. Attach the same VSIX to the GitHub release and publish concise release notes.

Do not publish from an unreviewed worktree or use global Azure DevOps PAT automation. Revisit the current official Marketplace authentication guidance before configuring CI publishing.
