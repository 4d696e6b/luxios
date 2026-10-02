# Luxios release checklist

## Before publishing

- Marketplace publisher [`4d696e6b`](https://marketplace.visualstudio.com/publishers/4d696e6b) was created on 2026-10-02 with Owner access. Its public profile displays the supplied Luxios crown as its logo. Version 0.1.5 was uploaded on 2026-10-02 and is currently marked Public / Verifying by Marketplace.
- The public `4d696e6b/luxios` GitHub repository and its manifest links are live, with `main` as the default branch and `dev` for ongoing work. The current `engines.vscode` floor is `^1.96.0`, based on package installation against the locally available VS Code 1.96.2 build; newer native chat details are optional and require a newer build to verify visually.
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
