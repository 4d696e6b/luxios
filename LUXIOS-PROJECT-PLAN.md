# Luxios — product, design, and release specification

**Planning baseline: 2 October 2026 · Target: Luxios v1.0.0**

**Code in luxury.**

This is a specification for future implementation. No extension, logo, or screenshots have been built. Palette values are recommended design decisions, with initial mathematical contrast checks; they are not a substitute for testing the rendered theme.

Capability labels used throughout:

- **Confirmed:** supported by the cited VS Code documentation or source. Availability in the chosen minimum VS Code version still needs verification.
- **Recommended:** a Luxios design or implementation decision.
- **Experimental:** an optional visual trial, not a release dependency.
- **Beyond a theme:** requires extension behavior or another system. Some workbench modifications are unsupported even for ordinary extensions.

**Navigation:** [Vision](#2-luxios-product-vision) · [Palette](#5-final-recommended-color-palette) · [Syntax](#6-syntax-highlighting-system) · [UI tokens](#7-vs-code-ui-mapping) · [Chat](#8-ai--chat-theme-strategy) · [Variants](#9-theme-variant-specifications) · [Logo](#10-crown-logo-design-brief) · [Accessibility](#11-accessibility-strategy) · [Architecture](#12-extension-architecture) · [Testing](#15-testing-strategy) · [Publishing](#16-marketplace-release-plan) · [Definition of done](#21-definition-of-done-for-luxios-v10) · [Agent handoff](#22-recommended-next-implementation-step)

## 1. Executive Summary

Build Luxios as one free, declarative VS Code color-theme extension with four variants: **Luxios**, **Luxios Midnight**, **Luxios OLED**, and **Luxios Royale**. Publish the source on GitHub and the installable extension on the Visual Studio Code Marketplace.

The strongest differentiator is disciplined contrast: a quiet navy interface, restrained champagne-gold interaction cues, and familiar multicolor syntax. Web development and Python receive equal testing and presentation weight.

Five decisions make the concept practical:

1. Use a softer gold, `#D6B56D`, as the default identity color. Keep the original `#DDB84A` for Royale. Gold should look like an accent material, not a yellow interface.
2. Raise comments from `#687083` to `#8B95A7`. Keep the darker shade for disabled or decorative elements only.
3. Approximate the preferred framed active tab with top and bottom gold edges and a distinct surface. A full active-only outline is not a portable color-theme feature.
4. Give supported chat elements a richer identity without promising a completely separate chat shell.
5. Finish and validate the default theme before deriving the other three variants. Ship all four together at v1.0.

V1 has no runtime code, network access, telemetry, mandatory language-extension dependencies, custom CSS injection, settings interface, or theme-switching logic. Small validation tooling in the repository is acceptable; it must not become a theme-generation platform.

## 2. Luxios Product Vision

**Product promise:** a premium workspace that stays clear during ordinary development, debugging, review, and terminal work.

Primary audience: developers working in React/TypeScript and Python who want a distinctive dark theme without giving up recognizable syntax. Secondary audience: developers using other languages with conventional TextMate scopes or semantic tokens.

Success means:

- A developer recognizes keywords, strings, functions, types, diagnostics, and Git changes without learning a proprietary color vocabulary.
- Gold identifies the current interaction or important action before it draws attention to decoration.
- A long file with comments, types, and errors remains readable.
- The same identity survives a crowded workspace with panels, splits, and terminals open.
- A maintainer can explain every theme rule and update all four variants without a build framework.

Do not claim universal language optimization, improved health, measured productivity gains, or OLED power savings. Those claims are outside the evidence available for this project.

## 3. Brand Identity

**Positioning:** cyber-luxury, with emphasis in this order: expensive, clean, futuristic.

**Design philosophy:** “Luxury in the interface. Clarity in the code.”

**Tagline:** “Code in luxury.”

**Recommended name story:** “Luxios brings together lux—light—and I/O, the language of computing. A refined workspace for everyday code.”

Let the final “s” complete the name. It does not need an acronym expansion; “system” or “style” can be an informal interpretation rather than official copy. Do not force the name to explain the entire product.

**Marketplace description:** “A refined dark theme for VS Code, pairing navy surfaces and champagne-gold accents with clear, familiar syntax. Four variants for web development and Python.”

Use “metallic-inspired” in extended copy. A flat color can suggest metal through surrounding contrast; it does not render a metallic material.

Tone: confident, short, specific. Avoid “ultimate,” “revolutionary,” and luxury claims repeated throughout the README. Use the theme itself as the evidence.

Before release, check Marketplace display-name collisions, the intended publisher ID, GitHub repository availability, and obvious competing brands. This plan does not establish name availability or trademark clearance.

## 4. Design Principles

1. **Gold has a job.** It marks focus, an active location, a primary action, or identity.
2. **Large surfaces stay quiet.** Never fill the entire status bar, sidebar, editor, or tab strip with gold.
3. **Syntax remains conventional.** Code has a separate palette from the brand accent.
4. **State is more important than ornament.** Errors stay red, warnings amber, success green, information blue.
5. **Use illumination cues.** A warm border against a cool surface can feel illuminated without blur or animation.
6. **Hierarchy must survive grayscale.** Position, outlines, labels, and existing icons supplement color.
7. **Respect user settings.** Font family, font size, cursor shape, line height, ligatures, layout, and animation preferences remain user choices.
8. **Prefer shared decisions.** Variants share syntax meaning, token coverage, diagnostics, and tests.

Apply this rule to every new accent: **“Does this make the important thing feel more premium, or does it simply add more gold?”**

Recommended visual budget: gold should occupy only a small fraction of an ordinary workspace. Judge this in real screenshots rather than enforcing a meaningless exact pixel percentage. Royale increases selected-state emphasis, not the number of gold-colored surfaces.

**Confirmed limitation:** a color theme supplies colors and supported token styles; it does not define arbitrary CSS gradients, bloom, blur radius, spacing, rounded corners, or animations. Existing VS Code effects may expose color controls, but the theme cannot create those effects wherever it chooses. [Color theme guide](https://code.visualstudio.com/api/extension-guides/color-theme)

## 5. Final Recommended Color Palette

These are the implementation baseline. Changes after visual testing must preserve the role system and be recorded in the design notes.

### Default surfaces

- **Canvas:** `#0B1120` — editor and primary reading surface.
- **Recessed:** `#070B14` — activity bar, sidebar, inactive tab strip, terminal base.
- **Surface:** `#111827` — panels, controls, active tab.
- **Raised:** `#151D2E` — menus, hovers, suggestions, richer chat elements.
- **Hover:** `#1B2638` — transient row and control hover.
- **Selected:** `#322B1E` — warm, quiet selected item or editor selection.
- **Inactive selection:** `#202A3B` — selection retained while focus is elsewhere.
- **Structural border:** `#29354A` — restrained panel boundaries.
- **Control boundary:** `#68758C` — where the border is needed to identify an input or control. Validate against both adjacent surfaces; do not substitute the low-contrast structural border for an essential boundary.

### Text

- **Primary:** `#E8ECF3` — code variables and ordinary text.
- **Secondary:** `#A6ADBB` — readable supporting labels.
- **Comment/readable muted:** `#8B95A7` — comments, placeholder text, optional ghost text.
- **Disabled/decorative:** `#687083` — disabled controls and nonessential details; not comments or enabled menu items.
- **Text on gold:** `#0B1120` — filled gold buttons and badges.

### Gold hierarchy

- **Identity:** `#D6B56D` — main gold; less yellow than the starting palette.
- **Bright:** `#E6C887` — hover and stronger active emphasis.
- **Focus:** `#F0D69A` — keyboard focus and cursor.
- **Muted:** `#A58A52` — inactive gold detail; not the default small-text color.
- **Dark:** `#6F5B32` — nonessential edges and quiet ornament.

Reserve the original `#F4D35E` and `#FFD86B` for experiments, not default large accents. Their saturation pushes the brand toward neon yellow more quickly.

### Semantic status

- **Error/deletion:** `#ED8796`.
- **Warning:** `#E6BE78`.
- **Success/addition:** `#9BCB9A`.
- **Information/modification:** `#82AAE3`.
- **Hint/renamed resource:** `#7FC7CC`.
- **Conflict:** `#E5A07D`, accompanied by the existing conflict label/icon.

Gold and warning amber are naturally related. Keep warning triangles, text, and dedicated diagnostic placement; never rely on their hues alone.

### Transparent overlays

- Related occurrences: `#D6B56D18`.
- Secondary find matches: `#D6B56D26`.
- Current find match: `#D6B56D33`, with a solid identity-gold border.
- Added text: `#9BCB9A20`.
- Removed text: `#ED879620`.
- Modified text: `#82AAE320`.
- Drag target: `#D6B56D24`.

Eight-digit values use `#RRGGBBAA`. Use transparency where a token requires it so underlying decorations remain visible. The opaque selected surface is a separate decision; do not reuse it for every highlight. [Color formats and transparency](https://code.visualstudio.com/api/references/theme-color#color-formats)

### Initial contrast results

Calculated using sRGB relative luminance and `(lighter + 0.05) / (darker + 0.05)`. Values below are rounded for display, not threshold decisions:

- Primary text on Canvas: **15.89:1**.
- Secondary text on Canvas: **8.35:1**.
- Original muted `#687083` on Canvas: **3.80:1**; unsuitable for ordinary small comments under the chosen target.
- Recommended comments on Canvas: **6.24:1**.
- Comments on Raised: **5.58:1**.
- Comments on Selected: **4.64:1**; a narrow margin, so do not brighten Selected casually.
- Identity gold on Canvas, or Canvas text on an identity-gold button: **9.58:1**.
- The seven colored syntax roles in section 6 span approximately **7.90–11.77:1** on Canvas.

These checks cover flat pairs only. Blended highlights, inactive selections, terminal output, and all variants require separate validation.

## 6. Syntax Highlighting System

### Shared syntax roles

- **Keywords:** `#C4A7E7` — soft violet; control flow, imports/exports, async/await, declaration keywords.
- **Functions/methods:** `#82AAE3` — blue; declarations and resolved references/calls.
- **Strings:** `#9BCB9A` — green; quoted strings, template literal text, f-string text.
- **Numbers:** `#E5B07B` — warm orange.
- **Types/classes/interfaces:** `#7FC7CC` — cyan; include enums and type parameters when identified.
- **Variables/parameters:** `#E8ECF3` — near-white. Parameters need not introduce another hue.
- **Properties/attributes/keys:** `#B3CFF2` — pale blue.
- **Constants/enum members:** `#D9B080` — muted warm accent, visibly separate from UI gold.
- **Comments:** `#8B95A7` — slate, no default italics.
- **Operators/punctuation:** `#CAD2DF` — light neutral.
- **Decorators:** `#C4A7E7` — violet, separate from the blue callable role.
- **Booleans/null-like literals:** `#C4A7E7` — keyword-like literals rather than numeric orange.
- **Escapes/regular expressions:** use `#E5B07B` for escape detail; regex body `#9BCB9A` unless scope-specific testing shows a clearer need.

Use normal weight for ordinary code. Bold is reserved for Markdown headings or semantically meaningful markup. Do not make every declaration bold or every parameter italic.

### Web development rules

- JavaScript and TypeScript: keywords violet; functions blue; variables near-white; properties pale blue. Callable arrow-function variables should be blue when the language service identifies them as functions; `=>` remains neutral punctuation/operator. A theme cannot infer callability itself.
- TypeScript: class/interface/type references cyan; generics and type parameters cyan; modifiers and type-declaration keywords violet. Keep unions, intersections, optional markers, and punctuation readable without extra colors.
- JSX/TSX: intrinsic HTML-like tags blue; component names cyan where scopes distinguish them; props pale blue; attribute strings green. Expressions inside braces return to their normal language roles.
- HTML: tags blue; attributes pale blue; values green; punctuation neutral. Make comments visible without competing with markup.
- CSS/SCSS: property names pale blue; numeric values orange; strings green; ordinary identifiers/values near-white; selectors cyan; at-rules violet. SCSS variables stay near-white and mixin/function names blue when identifiable.
- JSON/JSONC: keys pale blue, strings green, numbers orange, booleans/null violet, punctuation neutral. Scope key overrides narrowly so they do not recolor all strings.
- Template strings: literal text green; interpolation delimiters neutral or violet when clearly scoped; expressions use ordinary syntax colors.
- Markdown: headings blue and bold; links blue/underlined where appropriate; inline code green; emphasis preserves its semantic styling. Fenced blocks inherit embedded-language tokenization when the grammar supplies it. Do not make all headings gold.

### Python rules

- Imports and control keywords violet; classes/type hints cyan; functions and methods blue; parameters and `self` near-white.
- Built-in functions blue, built-in types and exception classes cyan, built-in literal constants violet.
- Decorator names violet if the provider distinguishes decorators; otherwise accept the callable fallback rather than adding a brittle broad override.
- Strings and docstrings green; comments slate. Docstrings are language strings, not automatically comments.
- F-string literal text green; embedded expressions use normal roles. Verify nested expressions, conversions, and format specifications separately.
- ALL_CAPS names are not automatically constants. Use emitted readonly/constant information where available; casing alone is not a theme capability.
- Test annotations, dataclasses, async functions, comprehensions, pattern matching, exceptions, type aliases, and multiline strings.

### TextMate and semantic strategy

**Confirmed:** TextMate handles grammar scopes; semantic highlighting adds language-service classifications and can override their styling. Set `semanticHighlighting` to `true`, with compatible `semanticTokenColors`. A theme does not supply the language service. [Semantic highlighting guide](https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide)

Recommended broad TextMate families: `comment`, `string`, `constant.numeric`, `constant.language`, `keyword`, `storage`, `entity.name.function`, `support.function`, `entity.name.type`, `support.type`, `variable`, `variable.parameter`, `variable.other.property`, `entity.other.attribute-name`, `entity.name.tag`, `keyword.operator`, and `punctuation`. Use narrower overrides for operators, JSON keys, JSX components, and decorators after inspecting actual scopes. Broad `storage` must not override a resolved type name unintentionally.

Recommended semantic selectors: `keyword`, `function`, `method`, `string`, `number`, `type`, `class`, `interface`, `enum`, `struct`, `typeParameter`, `namespace`, `variable`, `parameter`, `property`, `enumMember`, `decorator`, `comment`, `operator`, and `regexp`. Namespace identifiers use near-white. Readonly variables/properties may use the constant role, but explicitly keep function/method roles blue when more specific classifications exist. Built-in selectors such as `function.defaultLibrary` retain the callable role. Avoid a broad `*.readonly` rule that warms unrelated symbols.

Use language-qualified selectors only to fix observed provider differences. Record language ID and provider version; JavaScript React and TypeScript React IDs are `javascriptreact` and `typescriptreact`.

For each problem, use **Developer: Inspect Editor Tokens and Scopes**, record the emitted TextMate and semantic classifications, then add the smallest useful rule. Test with semantic highlighting on and off. Other languages receive a deliberate generic fallback, not a claim of bespoke optimization. [Syntax highlighting and scope inspection](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)

## 7. VS Code UI Mapping

This is a coverage checklist and initial assignment plan. Role names resolve to section 5, with variant overrides in section 9. Exact identifiers below are case-sensitive; they are not JSON nested paths. Check every identifier against the release baseline schema and do not ship invented IDs. Shared controls should inherit the common roles unless a concrete visual defect calls for an override.

The core identifiers are documented in the [VS Code theme color reference](https://code.visualstudio.com/api/references/theme-color). Token families mentioned in prose are coverage categories, not literal wildcard keys to put into JSON.

### Shell and navigation

- [ ] **Editor:** `editor.background` → Canvas; `editor.foreground` → Primary; `editorCursor.foreground` → Focus. Use a dark cursor background where a block cursor needs readable text.
- [ ] **Activity bar:** `activityBar.background` → Recessed; `activityBar.foreground` → Identity; `activityBar.inactiveForeground` → Secondary; `activityBar.activeBorder` → Identity. Badges use gold fill with dark text; ordinary inactive icons remain neutral.
- [ ] **Primary and secondary sidebars:** `sideBar.background` → Recessed; `sideBar.foreground` → Secondary; `sideBar.border` → Structural border. Titles use Primary. Test both containers; do not invent `secondarySideBar.background` or assume a chat-only background is available.
- [ ] **Title bar:** `titleBar.activeBackground` → Recessed; `titleBar.activeForeground` → Secondary. An inactive window becomes quieter without rendering labels unreadable. Native title bars are OS-controlled; test the custom title bar separately.
- [ ] **Command center:** `commandCenter.background` → Surface; `commandCenter.activeBorder` → Focus; its ordinary text stays Secondary. Do not give it a permanent bright gold frame.
- [ ] **Command palette / quick input:** `quickInput.background` → Raised; `quickInput.foreground` → Primary; `quickInputList.focusBackground` → Selected; `quickInputList.focusForeground` → Primary.
- [ ] **Status bar:** `statusBar.background` → Recessed; `statusBar.foreground` → Secondary; `statusBarItem.hoverBackground` → Hover. Remote state can use deep blue with light text; debugging uses a restrained warm surface, such as `#342A1C`, through `statusBar.debuggingBackground`. Error/warning items retain semantic cues.
- [ ] **Editor groups:** `editorGroup.border` → Structural border; `editorGroupHeader.tabsBackground` → Recessed. Test empty groups, split editors, dragging, and unfocused groups.
- [ ] **Breadcrumbs:** `breadcrumb.foreground` → Secondary; `breadcrumb.focusForeground` → Identity. The breadcrumb picker follows Raised/Selected roles.

### Active tab decision

**Confirmed:** `tab.activeBorder` is the bottom edge; `tab.activeBorderTop` is the top edge. `tab.border` separates all tabs. The API does not provide a general active-tab-only left/right outline. Global contrast borders affect other UI as well. [Workbench tab color registrations](https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/workbench/common/theme.ts)

**Recommended default:** top and bottom edges `#A58A52`, active background Surface, active foreground Primary, inactive background Recessed, inactive foreground Secondary, shared separators Structural border. Set unfocused active edges to Dark gold and test dirty/pinned tabs. Keep the dirty indicator recognizable.

This is a two-edge frame approximation, not a full border. Do not make `tab.border` gold just to simulate the missing sides. **Experimental:** test `contrastActiveBorder` locally, but reject it if it adds unwanted outlines elsewhere. A screenshot must not imply a full frame that users cannot obtain.

**Beyond a theme:** forcing a full workbench tab outline via injected CSS or DOM patching is not a supported ordinary extension customization. It is excluded from Luxios.

### Reading, navigation, and editing detail

- [ ] **Selection:** `editor.selectionBackground` → Selected; `editor.inactiveSelectionBackground` → Inactive selection. Leave editor selection foreground unset initially so syntax is retained; verify all syntax and comment contrast. `selection.background` handles non-editor text selection separately.
- [ ] **Current line:** `editor.lineHighlightBackground` → `#111A2A`; `editorLineNumber.activeForeground` → Identity; `editorLineNumber.foreground` → Comment. A line highlight must remain quieter than selection.
- [ ] **Indentation and brackets:** `editorIndentGuide.background1` → Structural border; `editorIndentGuide.activeBackground1` → Secondary; `editorBracketMatch.border` → Identity. Bracket-pair colors may reuse blue, cyan, and violet, with red for unexpected brackets. Honor the user's bracket-colorization setting.
- [ ] **Minimap:** `minimap.background` → Canvas; `minimap.selectionHighlight` → Muted gold. Diagnostics and Git markings remain semantic. Check both minimap visibility states.
- [ ] **Scrollbars:** `scrollbarSlider.background` → `#68758C40`; `scrollbarSlider.hoverBackground` → `#68758C70`; active slider may use `#8B95A780`. No gold scrollbar by default.
- [ ] **Find/replace:** `editor.findMatchBackground` → current-match overlay; `editor.findMatchBorder` → Identity; `editor.findMatchHighlightBackground` → secondary-match overlay. Test replacement preview and matches inside selected text.
- [ ] **Inline suggestions:** `editorGhostText.foreground` → Comment. Prefer italic styling only if the feature supports it through its own controls; do not promise the theme can force it. Suggestion text must remain visibly distinct from accepted code.
- [ ] **IntelliSense/autocomplete:** `editorSuggestWidget.background` → Raised; `editorSuggestWidget.selectedBackground` → Selected; `editorSuggestWidget.highlightForeground` → Identity. Selected text stays Primary; preserve symbol-kind clarity.
- [ ] **Hover/documentation:** `editorHoverWidget.background` → Raised; `editorHoverWidget.border` → Structural border. Links use blue or gold consistently according to the text-link policy; choose blue in long documentation for familiarity.
- [ ] **Peek:** `peekView.border` → Muted gold; `peekViewEditor.background` → Surface; `peekViewResult.background` → Raised. Selected results use Selected and Primary.

### Shared controls and interaction states

- [ ] **Inputs:** `input.background` → Surface; `input.foreground` → Primary; `input.border` → Control boundary; `input.placeholderForeground` → Comment. `focusBorder` → Focus. Validation borders/backgrounds retain red, amber, or blue meaning.
- [ ] **Buttons:** `button.background` → Identity; `button.foreground` → Text on gold; `button.hoverBackground` → Bright. Secondary buttons use Surface/Primary with a visible boundary. Dangerous actions must not lose their platform-provided meaning.
- [ ] **Checkboxes and dropdowns:** `checkbox.background` and `dropdown.background` → Surface; `checkbox.foreground` → Identity; `dropdown.foreground` → Primary. Use control boundaries for enabled widgets and test checked, unchecked, open, hovered, disabled, and keyboard-focused states.
- [ ] **Lists/trees:** `list.activeSelectionBackground` → Selected; `list.activeSelectionForeground` → Primary; `list.inactiveSelectionBackground` → Inactive selection; `list.hoverBackground` → Hover; `list.focusOutline` → Focus. Indent guides stay neutral. Hover must not erase selection or focus.
- [ ] **Menus/context menus:** `menu.background` → Raised; `menu.foreground` → Primary; `menu.selectionBackground` → Selected. Separators stay structural; disabled actions use Disabled. Native OS menus may not follow these tokens.
- [ ] **Settings:** `settings.headerForeground` → Primary; `settings.modifiedItemIndicator` → Identity; `settings.focusedRowBorder` → Focus. Inputs inherit the common control system where possible.
- [ ] **Notifications:** `notifications.background` → Raised; `notifications.foreground` → Primary; `notificationToast.border` → Structural border. Preserve error, warning, and information icon roles.

### Development panels and state

- [ ] **Panel shell / Output:** `panel.background` → Surface; `panel.border` → Structural border; `panelTitle.activeBorder` → Identity. Plain Output text remains readable; log syntax depends on its language mode.
- [ ] **Problems:** `problemsErrorIcon.foreground` → Error; `problemsWarningIcon.foreground` → Warning; `problemsInfoIcon.foreground` → Information. Use the list system for navigation.
- [ ] **Editor diagnostics:** `editorError.foreground` → Error; `editorWarning.foreground` → Warning; `editorInfo.foreground` → Information. Verify squiggles and overview-ruler markers, not just text labels.
- [ ] **Git / source control:** `gitDecoration.addedResourceForeground` → Success; `gitDecoration.modifiedResourceForeground` → Information; `gitDecoration.deletedResourceForeground` → Error; `gitDecoration.conflictingResourceForeground` → Conflict. Untracked files use Success; ignored files use Comment; renamed files use Hint.
- [ ] **Git gutter:** `editorGutter.addedBackground` → Success; `editorGutter.modifiedBackground` → Information; `editorGutter.deletedBackground` → Error. Check the same signals in overview rulers and minimaps.
- [ ] **Diff editor:** `diffEditor.insertedTextBackground` → added overlay; `diffEditor.removedTextBackground` → removed overlay. Test word and line changes side by side and inline; retain plus/minus context.
- [ ] **Merge editor:** `merge.currentHeaderBackground` → `#9BCB9A30`; `merge.incomingHeaderBackground` → `#82AAE330`; content versions use alpha `18`. `mergeEditor.conflict.unhandledFocused.border` → Warning; `mergeEditor.conflict.handledFocused.border` → Focus. Preserve current/incoming labels and unresolved-state meaning.
- [ ] **Extensions view:** `extensionButton.prominentBackground` → Identity; `extensionButton.prominentForeground` → Text on gold. Listing, search, and detail views follow shared list/text rules; artwork supplied by extensions is not recolored.
- [ ] **Search:** `search.resultsInfoForeground` → Secondary; `list.highlightForeground` → Identity. Results and replace controls reuse list, input, and find roles.
- [ ] **Debugging:** `debugToolBar.background` → Raised; `debugIcon.breakpointForeground` → Error; `editor.stackFrameHighlightBackground` → `#E6BE7820`. Verify stopped/running states, call stack, watch values, and disabled breakpoints.
- [ ] **Debug console:** `debugConsole.infoForeground` → Information; `debugConsole.warningForeground` → Warning; `debugConsole.errorForeground` → Error. Ordinary evaluated values follow readable syntax roles.
- [ ] **Testing:** `testing.iconPassed` → Success; `testing.iconFailed` → Error; `testing.iconQueued` → Warning; `testing.iconUnset` → Secondary. Test failures remain distinct from a focused test row.
- [ ] **Notebooks:** `notebook.editorBackground` → Surface; `notebook.cellEditorBackground` → Canvas; `notebook.focusedCellBorder` → Focus; `notebook.outputContainerBackgroundColor` → Raised. Test selected cells, running/error status, Markdown cells, and text outputs. Rich output renderers can supply their own colors.
- [ ] **Markdown preview:** use `textCodeBlock.background` → Surface; `textBlockQuote.border` → Muted gold; `textLink.foreground` → Information as shared markdown-rendering inputs. Verify the built-in preview separately; its CSS and embedded HTML can limit the result. Editor token colors do not style every rendered element.
- [ ] **Chat/AI:** apply section 8 and test chat in the secondary sidebar, panel/editor locations where available, and inline chat.

### Terminal palette

`terminal.background` → Recessed, `terminal.foreground` → Primary, `terminalCursor.foreground` → Focus, `terminalCursor.background` → Recessed. Start `terminal.selectionBackground` at `#D6B56D26` and check blended text contrast.

Assign all sixteen ANSI tokens explicitly:

- `terminal.ansiBlack` → `#303849`; `terminal.ansiBrightBlack` → `#8B95A7`.
- `terminal.ansiRed` → `#ED8796`; `terminal.ansiBrightRed` → `#F3A5AF`.
- `terminal.ansiGreen` → `#9BCB9A`; `terminal.ansiBrightGreen` → `#B3DDB1`.
- `terminal.ansiYellow` → `#E6BE78`; `terminal.ansiBrightYellow` → `#F0D49B`.
- `terminal.ansiBlue` → `#82AAE3`; `terminal.ansiBrightBlue` → `#A5C3ED`.
- `terminal.ansiMagenta` → `#C4A7E7`; `terminal.ansiBrightMagenta` → `#D9C1F1`.
- `terminal.ansiCyan` → `#7FC7CC`; `terminal.ansiBrightCyan` → `#A4DADD`.
- `terminal.ansiWhite` → `#CCD3DE`; `terminal.ansiBrightWhite` → `#E8ECF3`.

ANSI black is a deliberate exception to normal body-text contrast when used as foreground on a dark terminal. Making every ANSI color bright destroys programs' background/inverse conventions. Test ANSI foregrounds, backgrounds, bold/dim, reverse video, selected output, and representative CLI tools. Truecolor output can bypass the ANSI palette. Record terminal contrast-setting behavior rather than claiming control over every application.

### Version-dependent surfaces

The current reference also documents modern-layout and agent-session tokens. Treat those as conditional coverage, not a reason to raise the minimum version blindly. For example, inspect `modernEditorTab.activeBackground`, `surface.background`, and `agentsChatInput.focusBorder` in the tested build. They do not replace classic-layout testing or imply every user sees those surfaces.

## 8. AI / Chat Theme Strategy

**V1 decision: stay a pure theme.** The attainable experience is “richer chat details inside a coherent workspace,” not a separate AI application skin.

### Confirmed controls and recommended assignments

Native chat has registered colors consumed by the built-in chat UI used for Copilot conversations. This is not a blanket guarantee for every Copilot surface or third-party AI extension. [Chat color registrations](https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/workbench/contrib/chat/common/widget/chatColors.ts)

- `chat.requestBackground` → Raised.
- `chat.requestBorder` → Dark gold.
- `chat.slashCommandBackground` → Selected; `chat.slashCommandForeground` → Bright.
- `chat.avatarBackground` → Selected; `chat.avatarForeground` → Identity, where an avatar is actually rendered.
- `chat.requestBubbleBackground` → `#D6B56D12`; `chat.requestBubbleHoverBackground` → `#D6B56D1C`, when supported. Check composition over both sidebar and editor chat hosts.
- `chat.requestCodeBorder` → `#A58A5266`.
- `chat.linesAddedForeground` → Success; `chat.linesRemovedForeground` → Error.
- `chat.editedFileForeground` → Information, so file modifications do not all become gold.
- `inlineChat.background` → Raised; `inlineChat.foreground` → Primary; `inlineChat.border` → Muted gold.
- `inlineChatInput.background` → Surface; `inlineChatInput.focusBorder` → Focus; `inlineChatInput.placeholderForeground` → Comment.
- `inlineChatDiff.inserted` and `inlineChatDiff.removed` → the same transparent semantic diff overlays used elsewhere.

Inline chat token names belong to that widget; do not describe them as a universal main-chat input control. The [theme reference](https://code.visualstudio.com/api/references/theme-color#inline-chat-colors) lists the widget-specific controls.

### What cannot be promised

- There is no general portable `chat.background` assignment in this baseline that independently skins every chat host. Its surrounding container may reuse sidebar, panel, or editor colors.
- A generic `button.background` or `focusBorder` change affects other controls too. A theme cannot scope a shared color to “only when inside Copilot.”
- A theme cannot replace layout, prompt controls, icons, logos, typography, or rendering logic of another extension.
- Third-party webviews only cooperate when their own CSS uses the exposed theme variables. Hard-coded styles and images can remain unchanged. [Webview theming](https://code.visualstudio.com/api/extension-guides/webview#theming-webview-content)
- Theme installation does not grant Copilot access, enable AI features, or require an AI account.

### Experimental, version-gated accents

Current main-branch source includes `chat.inputWorkingBorderColor1` for an existing animated working border and `chat.voiceGlowBaseColor` for an existing voice effect. If present in the release baseline, trial a subdued identity gold. The theme changes a supplied effect's color, not its geometry or timing. Do not use the deprecated working-border color 2/3 controls or present main-branch availability as stable support. Leave these unset if testing is unavailable. [Current chat implementation](https://raw.githubusercontent.com/microsoft/vscode/main/src/vs/workbench/contrib/chat/common/widget/chatColors.ts)

**Beyond a theme:** a companion extension could own a Luxios webview with its own layout and styling. It would be a new product with behavior, maintenance, and potentially AI-service responsibilities. It would not grant supported control over the entire existing Copilot UI. There is no V1 justification for it.

## 9. Theme Variant Specifications

Each variant is a complete theme JSON at release. All share section 6 syntax colors, terminal hue meanings, diagnostics, and coverage. Override only the roles below initially; unlisted roles inherit the default specification. This keeps scope fixes consistent and makes visual differences intentional.

### Luxios — default

Use section 5 unchanged. Balanced navy, champagne identity gold, two-edge tab treatment, and ordinary coding contrast. This is the reference version for screenshots and first installation guidance.

### Luxios Midnight

- Canvas `#080D17`; Recessed `#050810`; Surface `#0D1420`; Raised `#111A29`.
- Hover `#172235`; Selected `#2A251C`; Inactive selection `#1B2433`.
- Primary `#D7DEE8`; Secondary `#A2ACBC`; Comment remains `#8B95A7`.
- Identity `#BFA46F`; Bright `#D2B984`; Focus `#DEC79B`; Muted `#978057`; Dark `#66563A`.
- Structural border `#263246`; Control boundary remains `#68758C`.
- Current-line fill `#0E1623`.

Reduce the luminance of ordinary text and accent emphasis, not the visibility of comments or errors. Shared colored syntax remains unchanged for V1. “For late-night use” describes intent; “reduces eye strain” is not a verified claim. Use shorter and longer sessions to decide whether the deeper background is actually comfortable for testers.

### Luxios OLED

- Canvas `#000000`; Recessed `#000000`; Surface `#080C12`; Raised `#101722`.
- Hover `#182131`; Selected `#30291C`; Inactive selection `#1B2433`.
- Primary `#DEE5EF`; Secondary `#A6ADBB`; Comment `#8B95A7`.
- Identity `#D6B56D`; Bright `#E6C887`; Focus `#F0D69A`; Muted/Dark use default gold.
- Structural border `#354155`; Control boundary `#68758C`.
- Current-line fill `#0A101A`.

Editor and sidebar deliberately share black. Separators, spacing supplied by VS Code, and raised controls carry their hierarchy. Do not claim panel separation comes from different base fills in this variant. Verify near-black detail, scrolling, low brightness, and text bloom on physical OLED hardware. If unavailable, document that limitation and describe it as a black-surface variant rather than hardware-validated.

### Luxios Royale

- Canvas `#0B1020`; Recessed `#070A13`; Surface `#141A2A`; Raised `#1A2234`.
- Hover `#202B40`; Selected `#322B1E`; Inactive selection `#242D40`.
- Primary `#E8ECF3`; Secondary `#AFB6C4`; Comment `#8B95A7`.
- Identity `#DDB84A`; Bright `#EAC970`; Focus `#F3D995`; Muted `#B29552`; Dark `#756034`.
- Structural border `#32405A`; Control boundary `#748199`.
- Current-line fill `#121B2F`.

Use Identity for the active tab's top/bottom edges instead of Muted. Keep inactive tabs and sidebar text neutral. Increase the richness of chat accents and primary controls through these same role substitutions; do not add gold to syntax, diagnostics, every heading, or every border.

### Shared inheritance rules

Recompute gold-derived transparent overlays from each variant's Identity while retaining the specified alpha. Chat surfaces follow variant Raised/Surface/Selected roles. Diff overlays retain semantic hues. Terminal background follows Recessed and terminal foreground follows Primary. Explicit current-line fills above override the default. Comments remain unchanged across all four to prevent “softness” from becoming invisibility.

If a proposed override fails contrast, revise that variant before release. None receives an accessibility exemption for its aesthetic.

## 10. Crown Logo Design Brief

**Do not create the asset in the planning phase.**

Construct a geometric crown silhouette around an integrated `</>` motif. The crown should have three principal peaks, a strong horizontal base, angular shoulders, and enough negative space for the coding mark to read naturally.

Recommended construction:

- Start from a square 256-unit SVG viewBox.
- Keep roughly 16–20% clear space on every outer edge for Marketplace and circular avatar cropping.
- Crown occupies about 64–68% of the square's width and 48–54% of its height, optically centered.
- Use a symmetrical outer crown. The central slash introduces necessary internal asymmetry; do not distort `</>` merely to achieve mathematical symmetry.
- Make the coding symbol roughly 35–40% of the crown's width and align its negative-space cutouts with the crown's angular geometry.
- Prefer filled paths and generous gaps over hairline strokes. Inspect rasterization at 16, 24, 32, 48, and 128 pixels.
- Use Recessed or Canvas behind Identity gold. A second gold tone may separate a facet, but the mark must also work as a single-color silhouette.

No medieval jewels, many tiny points, bevel effects, blurred glow, or tagline inside the icon. At 16 pixels, crown recognition is more important than perfect punctuation legibility. If necessary, simplify the small-size export while retaining the same silhouette.

Keep the editable SVG in the GitHub repository and export a 256×256 PNG for the extension, plus a 512×512 avatar/social source. Marketplace's manifest guidance specifies an icon of at least 128×128, with 256×256 for Retina. [Manifest icon requirements](https://code.visualstudio.com/api/references/extension-manifest)

Use PNG for the Marketplace icon and README logo. User-supplied SVG images in Marketplace-facing icon/README contexts are restricted by VSCE; an SVG source asset in the repository is not the publishing image. [Publishing image restrictions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#publishing-extensions)

## 11. Accessibility Strategy

Adopt **4.5:1 minimum** for ordinary readable UI text, code, and comments against their effective background. Aim higher on primary reading surfaces. Use **3:1** for necessary non-text boundaries or state indicators against adjacent colors where applicable. These are practical WCAG-style design targets, not a certification of the entire VS Code application. [W3C text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), [W3C non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

Validation procedure:

1. List actual foreground/background pairs by role and variant.
2. Composite alpha overlays onto the actual underlying surface before calculating contrast. Include nested states such as find-in-selection and diagnostics-in-diff.
3. Check comments, placeholders, inactive-but-enabled tabs, selected text, command results, and focused suggestions as ordinary readable text.
4. Keep disabled controls visibly disabled, but do not use the disabled exemption for useful labels.
5. Check cursor contrast against Canvas, Selected, line highlight, and diff surfaces. Inspect line and block cursor configurations.
6. Use keyboard navigation to verify visible focus without relying on a mouse hover.
7. Inspect screenshots in grayscale and common color-vision-deficiency simulations. Verify Git markers, labels, warning/error icons, and merge headings continue to convey meaning.
8. Test terminal foreground/background combinations and record unavoidable black/dim/truecolor limitations.
9. Compare one short session and at least two longer coding sessions per principal ecosystem. Log concrete complaints such as “comments disappear at low brightness,” not a generic comfort score alone.

Subtle decorative panel separators do not all need 3:1. Essential control outlines do. Midnight must preserve the same text targets. OLED black can exaggerate perceived contrast for some users; it is an option, not the universally most comfortable variant.

Do not force italics, tiny fonts, font smoothing changes, animations, or accessibility settings. The theme cannot repair color-only information supplied by another extension; preserve existing non-color cues and disclose external limitations.

## 12. Extension Architecture

**Recommended:** a declarative theme package with four separate `*-color-theme.json` files. No activation events, `main`, `browser`, extension commands, or runtime dependencies are required for this scope.

Each theme contains:

- `name`: the exact visible variant name.
- `type`: `dark`.
- `colors`: workbench/UI color assignments such as editor surfaces, focus, buttons, and diagnostics.
- `tokenColors`: TextMate rules for syntax emitted by grammars.
- `semanticHighlighting`: `true`.
- `semanticTokenColors`: styles for language-service classifications.

Register four entries through `contributes.themes`, each with a stable ID, label, `uiTheme: "vs-dark"`, and path. Use the visible names as stable contribution IDs: `Luxios`, `Luxios Midnight`, `Luxios OLED`, `Luxios Royale`. Do not rename them casually after users have selected them. [Theme contribution point](https://code.visualstudio.com/api/references/contribution-points#contributes.themes)

Recommended filenames:

- `themes/luxios-color-theme.json`
- `themes/luxios-midnight-color-theme.json`
- `themes/luxios-oled-color-theme.json`
- `themes/luxios-royale-color-theme.json`

Use self-contained files in V1. Small duplication is easier to inspect than inheritance plus generation at this scale. A lightweight validation check should compare semantic maps and TextMate rules across variants, while allowing documented Primary substitutions. Do not hand-maintain divergent syntax systems.

No bundler, transpiler, backend, external palette service, or public theme generator. Use a pinned development version of `@vscode/vsce` and a lockfile. A small script for parsing, token checking, contrast calculations, and variant parity is justified by the four-theme maintenance burden.

**Compatibility policy:** at prototype time, record the installed current Stable version and its schema. Choose the lowest release actually exercised successfully, then put that real semver floor in `engines.vscode`. Aim to test current Stable and the preceding two releases if practical; do not claim those versions automatically. New chat or modern-layout details must fall back gracefully or justify a higher minimum. This is a release gate, not a placeholder to publish.

Do not declare Python, Pylance, Copilot, React tooling, or icon themes as extension dependencies. They belong in documented test setups. A pure theme should also be smoke-tested in VS Code for the Web where practical, without promising that every desktop feature exists there. [Web extension support](https://code.visualstudio.com/api/extension-guides/web-extensions)

## 13. Repository Structure

Recommended future tree:

```text
luxios/
  package.json
  package-lock.json
  themes/
    luxios-color-theme.json
    luxios-midnight-color-theme.json
    luxios-oled-color-theme.json
    luxios-royale-color-theme.json
  icons/
    luxios-icon.png
    source/luxios-icon.svg
  screenshots/
    luxios-web.png
    luxios-python.png
    luxios-variants.png
    luxios-chat.png
  examples/
    web/                  representative JS/TS/JSX/TSX/HTML/CSS/SCSS/JSON
    python/               representative Python
    markdown/             prose, markup, code fences
  docs/
    design.md             approved palette and decisions
    testing.md            test matrix, versions, limitations
    release.md            repeatable release checklist
  scripts/
    validate.mjs          small checks only, if needed
  .vscode/launch.json      Extension Development Host setup
  .github/workflows/validate.yml
  README.md
  CHANGELOG.md
  LICENSE
  .gitignore
  .vscodeignore
```

This tree is proposed, not created by the planning task. Keep this specification as a design reference; split or rename it only when implementation benefits from that organization.

The VSIX should contain the manifest, four themes, PNG icon, README, changelog, license, and any deliberately included README assets. Exclude fixtures, scripts, local configuration, research notes, SVG source, caches, credentials, and existing VSIX files. Inspect `vsce ls` rather than assuming ignore patterns work. If screenshots are excluded, ensure README images resolve to public HTTPS resources after packaging.

Aim for a VSIX below approximately 1 MB when screenshots are remotely resolved. Treat this as a project budget, not a Marketplace limit. Investigate growth instead of compressing the small theme JSON files beyond readability.

## 14. Development Phases

### Phase A — baseline and prototype

Record the VS Code build, verify token availability, create the minimal manifest and default theme, and prepare web/Python examples. Implement the central shell, syntax, cursor, focus, selections, tabs, and terminal first.

**Exit:** default theme loads in an Extension Development Host; both ecosystems have a readable reference screenshot; the tab fallback is accepted as the supported design.

### Phase B — syntax and UI completion

Inspect language scopes, align semantic and TextMate results, complete the surface checklist, and test diagnostics, Git, diff, debugging, notebooks, and supported chat states. Keep a small list of unresolved visual defects.

**Exit:** no major syntax-role mismatch, unreadable common state, or accidental neon surface; default theme is usable for daily work.

### Phase C — derive the family

Create Midnight, OLED, and Royale using only documented overrides. Run contrast checks and the same fixtures for each. Resolve OLED separation and Royale restraint before adding presentation polish.

**Exit:** four intentionally distinct but recognizably related variants with equivalent language support.

### Phase D — release candidate and identity

Create the crown assets, capture final screenshots, write concise public documentation, choose owner/publisher identity, validate licensing, package the VSIX, and test fresh installation. Run cross-platform checks and document unavailable hardware.

**Exit:** v0.9.0 package is ready for release review; no placeholder IDs, broken links, or untested claims.

### Phase E — publish and verify

Follow section 16, publish v1.0.0, verify the installed Marketplace build, attach the matching VSIX to a GitHub release, and make any necessary patch correction.

**Exit:** public installation and source links work, all four themes appear, and the released artifacts match the tested source.

Plan by exit criteria rather than a promised calendar. A solo implementation might fit roughly 8–12 focused working days, with hardware access and real-session feedback adding elapsed time. That is a planning estimate, not a commitment.

## 15. Testing Strategy

Maintain one checklist with variant, VS Code build, operating system, language-provider version, semantic setting, result, screenshot where useful, and any known limitation.

### Automated checks worth keeping

- Parse all theme and manifest JSON; reject duplicate keys rather than silently accepting the last value.
- Verify contribution labels, IDs, theme paths, icon path, hex formats, and required files.
- Check color IDs against the chosen baseline; document version-gated additions and intentional omissions.
- Check role contrast, alpha-composited overlays, and variant syntax parity.
- Package and inspect the file list; reject accidentally bundled credentials, dependencies, or unrelated files.

A plain theme does not need a unit-test framework that merely asserts hard-coded colors equal themselves. Visual validation is the main evidence. CI should validate and package; automatic publishing is optional later.

### Language fixture coverage

- **JavaScript:** imports/exports, arrow functions, callbacks, classes, object properties, template strings, async/await, regex, optional chaining, destructuring.
- **TypeScript:** interfaces, aliases, generics, enums, unions/intersections, decorators where supported, readonly properties, inferred callables.
- **JSX and TSX separately:** intrinsic elements, components, props, spread props, expressions, hooks, fragments, nested tags.
- **HTML:** semantic tags, attributes, entities, comments, inline style/script if tokenized.
- **CSS and SCSS separately:** selectors, properties, values, units, custom properties, variables, nesting, at-rules, mixins, interpolation.
- **JSON/JSONC:** keys versus strings, booleans, null, numbers, nested objects, comments only in JSONC.
- **Markdown:** headings, lists, links, emphasis, blockquotes, inline code, fences, tables, and preview.
- **Python:** all constructs in section 6, including f-strings, decorators, built-ins, annotations, exceptions, `self`, async, and docstrings.

For both principal ecosystems, test with the usual language provider active, semantic highlighting disabled, and provider unavailable where practical. Compare loading-time TextMate colors with settled semantic colors. Keep web and Python test time approximately balanced; neither is a token afterthought.

### Visual states

- Focused/unfocused window and editor groups; active/inactive/dirty/pinned tabs.
- Keyboard focus, hover, active selection, inactive selection, disabled controls, open dropdowns, and context menus.
- Narrow/wide layouts, multiple editor groups, primary/secondary sidebars, panel resizing.
- Terminal ANSI swatch fixture plus a real shell, test runner, Git diff, long output, and selected output.
- Error/warning/info squiggles, Problems, notifications, search/replace, diff and merge conflicts.
- Debug toolbar, breakpoint states, call stack, variables, exception view, debug console.
- Suggestions, parameter help, hover documentation, peek definitions, ghost text, bracket matching.
- Notebook cell focus, output, running and failed states; test explorer pass/fail/queued states.
- Chat input, request, response code blocks, diffs, focused controls, inline chat, and supported loading states. Test unavailable/signed-out UI too if accessible. Record feature gaps honestly.

### Environment matrix

Perform a full pass on the primary development OS and a core release smoke test on macOS and Windows. Test Linux where practical; if unavailable, explicitly mark it untested. Each available OS should exercise all four variants, terminal, menus, tabs, title bar behavior, and font rendering.

Use a clean profile without user color overrides for the acceptance baseline. Then test reasonable user customization, zoom at 100% and 125–150%, common monospace fonts, and custom/native title bars where available.

Inspect a laptop LCD at ordinary and low brightness, in a bright room and dark room. Add an external monitor and physical OLED if available. Record missing hardware; do not infer OLED validation from a black screenshot.

Release blockers: unreadable ordinary text, invisible focus or cursor, ambiguous error/success state, broken theme selection, missing package assets, or a core language visibly misclassified because of an overbroad Luxios rule. Minor unsupported third-party styling is documented rather than “fixed” with invasive code.

## 16. Marketplace Release Plan

### Identity and metadata

Recommended package `name`: **`luxios`**. Display name: **`Luxios`**. Extension ID becomes **`<publisher-id>.luxios`**; publisher ownership must be chosen by the author before publishing. If the package name conflicts within that publisher, use `luxios-theme` before the first release and update every reference consistently.

Set category `Themes`, pricing `Free`, license `MIT`, and the description from section 3. Suggested keywords: `theme`, `dark`, `navy`, `gold`, `luxury`, `python`, `typescript`, `react`, `oled`. Use real repository, homepage, and issue URLs. Set `galleryBanner.color` to `#070B14` with a dark banner theme and inspect the rendered result. The banner setting is a background color/theme choice, not an uploaded hero banner. [Manifest and presentation guidance](https://code.visualstudio.com/api/references/extension-manifest)

Required release values include `name`, `displayName`, `version`, `publisher`, `engines.vscode`, and the four theme contributions; add PNG icon and repository metadata for presentation. Set v1.0's version explicitly to `1.0.0` before packaging.

### Publisher and authentication

Create or use an owned Marketplace publisher through a Microsoft account with the appropriate publishing rights. Choose the publisher ID carefully; it forms the durable extension identity. A verified-publisher badge is not necessary for the first release.

**Current publishing caveat:** the official documentation says global Azure DevOps PATs retire on **1 December 2026** and recommends Entra ID authentication for automation. For this small project, start with a locally packaged VSIX uploaded through publisher management. If adding automated publishing, follow the then-current Entra/federation guidance; do not build a new long-lived global-PAT workflow. [Publishing guide](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

### Build and release sequence

Commands below are future instructions, not actions performed during planning:

1. Install a Node.js release supported by the chosen `@vscode/vsce` version; pin that VSCE version as a development dependency and commit the lockfile. Recheck tooling requirements when implementation begins. [VSCE project](https://github.com/microsoft/vscode-vsce)
2. Run `npm ci`, the repository validation command, and the manual release checklist.
3. Run `npx vsce ls` and inspect the inclusion list.
4. Run `npx vsce package`; record the resulting version and file.
5. Install that exact VSIX in a clean profile with **Extensions: Install from VSIX**. Check all four variants and image links.
6. Freeze the tested release commit and version. Upload the reviewed VSIX through [Marketplace publisher management](https://marketplace.visualstudio.com/manage).
7. Alternatively, after identity-based publishing is configured and verified, use `npx vsce publish --azure-credential`. Do not run both routes for the same version.
8. Wait for Marketplace processing. Inspect the public listing and install from Marketplace into a fresh profile; check version, labels, theme selection, and default appearance.
9. Tag the matching commit `v1.0.0` and create a GitHub release with the same VSIX and concise notes. Verify that repository, Marketplace, and release links point to the intended project.

No payment flow or license key. Theme selection is user-controlled; installation should not silently replace the user's active theme.

### Updates and recovery

Use patch versions for small visual fixes and missing scopes, minor versions for substantial compatible additions or refinements, and major versions for disruptive redesigns or renamed/removed themes. Visual changes can be disruptive even without an API change; explain them in the changelog.

For every update: reproduce the defect in a fixture, update the shared rule or documented variant override, recheck affected states in all variants, package, verify, publish, and tag. Never overwrite a published version. For a bad release, restore the known-good design in a higher patch version and make the previous VSIX available through GitHub while the correction processes.

## 17. GitHub / Portfolio Plan

Use a public repository named `luxios` under the author's chosen GitHub identity. Keep the default branch releasable after v1.0, with ordinary small pull requests or direct maintainer changes as appropriate. No elaborate governance model is needed.

**License recommendation: MIT.** It supports free use, modification, and redistribution while requiring preservation of its copyright and permission notice in copies or substantial portions. It does not require prominent visual credit in screenshots, prevent forks, or provide exclusive brand-name protection. Use the actual author's copyright name and year; do not invent a legal identity. [MIT license text and conditions](https://choosealicense.com/licenses/mit/)

License original theme files and original artwork consistently for V1. If third-party examples, fonts, artwork, or other theme code are reused, preserve their applicable notices. Prefer original screenshots and tiny original fixtures to minimize attribution complexity.

### README direction

Recommended order:

1. Small PNG logo, “Luxios,” and “Code in luxury.”
2. One-sentence description and no more than a few useful badges.
3. Large default React/TypeScript hero screenshot with clear alt text.
4. Four variants, one compact comparison image, and one sentence explaining each.
5. Installation from Marketplace and the Color Theme picker.
6. A similarly legible Python screenshot, making equal ecosystem priority visible.
7. Small palette preview and a short support statement.
8. Customization through VS Code's native theme-specific color settings; fonts/icon themes are optional and identified if used in screenshots.
9. Short contributing instructions, credits if needed, changelog link, and license.

Keep detailed tokens, test matrices, and release procedures in docs. Link rather than duplicate the full design specification. Use real screenshots; no mock glow or postprocessed colors.

An optional issue template is useful once reports arrive: variant, VS Code/OS/provider versions, screenshot, minimal code sample, token inspection, expected/actual result. A contribution paragraph can ask contributors to check both TextMate and semantic modes and all affected variants. Avoid a large template collection.

For the portfolio, explain the specific problem, restrained accent system, accessibility tradeoffs, platform limitations, scope inspection, and evidence from final screenshots. One concise case-study section or existing portfolio entry is enough; a standalone website stays out of V1.

## 18. Screenshot Plan

### Essential

- **Default web hero:** React/TSX with imports, props, types, hooks, strings, comments, and a modest terminal. Make code readable at listing size.
- **Default Python:** equal visual quality and comparable dimensions; decorators, annotations, f-string, exception handling, and a readable docstring/comment.
- **Four-variant comparison:** identical file, scroll position, layout, font, zoom, and dimensions. Label each variant outside the captured application area or in a clean accompanying caption.
- **Workflow detail:** command palette or suggestions with visible keyboard focus, plus terminal/SCM evidence. This can be one additional image or a small pair of crops if the hero already shows some states.

### Conditional essential

- **Chat/AI:** include if chat styling is mentioned in Marketplace copy. Capture real supported request/input/code/diff states in a tested build, identify the chat provider and VS Code version, and show only synthetic or non-sensitive prompts. If access is unavailable, remove the visual claim and record that testing limitation.

### Optional

- Dedicated diff/merge review, debugging, notebook, Royale presentation image, or additional language examples.
- A matching GitHub social-preview image using the same logo and palette, created after final screenshots.

Capture PNG at a consistent high-resolution window size, for example 1600×1000 or 1920×1200. These are production recommendations, not Marketplace-required dimensions. Avoid unreadably dense montages; inspect at ordinary browser widths. Compress losslessly where practical.

Use clean fixtures, stable filenames, no tokens, private paths, real client data, or misleading synthetic errors. Record the font and icon theme, but ensure Luxios is attractive with default settings. Do not alter theme colors in image editing. Include alt text and short captions explaining the visible scenario.

## 19. Version Roadmap

- **v0.1.0 — internal prototype:** default shell, core syntax, initial fixtures, first contrast pass. Distribution via local VSIX only if useful.
- **v0.5.0 — feature-complete design beta:** all four variants, equal web/Python coverage, terminal/status colors, supported chat styling, most UI states validated.
- **v0.9.0 — release candidate:** frozen palette unless a defect requires change; finished assets, metadata, docs, package audit, and cross-platform smoke tests. Share a VSIX with testers if desired.
- **v1.0.0 — public release:** Marketplace listing and GitHub release verified against the final package.
- **After v1.0:** fix readability defects, missing scopes, provider differences, and changes in VS Code. Prioritize reproducible community feedback over adding features for a version number.

These are project milestones; they do not require publishing each milestone to Marketplace. A custom file-icon theme, UI companion, AI panel, website, generator, customization GUI, and automatic switcher remain future ideas with no V1 commitment.

## 20. Risks / Technical Limitations

- **Metal/glow expectations:** flat colors can suggest illumination but do not create arbitrary metallic shading or bloom. Mitigation: honest copy and unedited screenshots.
- **Full active-tab border:** unsupported as a clean active-only four-edge control. Mitigation: documented two-edge fallback; no CSS injection.
- **Chat host coupling:** some colors are shared with ordinary controls and containers. Mitigation: specialize only exposed chat tokens, verify each host, and keep claims narrow.
- **Changing APIs:** current documentation/main source can outrun a stable release. Mitigation: record and test a baseline, version-gate newer tokens, avoid deprecated controls.
- **Syntax variability:** grammars, semantic providers, and user settings differ. Mitigation: inspect actual tokens, maintain fixtures, keep useful fallbacks.
- **Four-file drift:** a syntax fix can reach only one variant. Mitigation: parity checks and a shared change checklist; no public generator needed.
- **Gold/amber confusion:** brand and warning colors are close. Mitigation: diagnostic placement, labels, icons, and restrained brand usage.
- **Selection contrast:** warm highlights can obscure muted syntax and comments. Mitigation: validate all effective backgrounds and stacked overlays.
- **Midnight/OLED assumptions:** darker does not automatically mean more comfortable. Mitigation: avoid medical or universal-comfort claims and test physical displays where available.
- **External UI:** native controls, webviews, notebook renderers, images, and truecolor terminal applications may bypass theme choices. Mitigation: document boundaries instead of attempting global overrides.
- **Release identity/authentication:** names and publisher ownership are unresolved until setup, and global-PAT retirement is approaching. Mitigation: resolve identity before asset URLs freeze and use a supported publishing route.
- **Scope growth:** a crown, four variants, and AI styling can invite an unrelated extension suite. Mitigation: new work must improve the color-theme release or wait until after v1.0.

## 21. Definition of Done for Luxios v1.0

- [ ] One pure theme extension; four exact visible names and stable IDs.
- [ ] Default palette and each variant match the approved role specification.
- [ ] Web and Python fixtures receive equal review, with semantic highlighting on and off.
- [ ] Ordinary syntax, comments, selected text, placeholders, and UI labels meet the declared contrast targets on tested surfaces; exceptions are explicit and justified.
- [ ] Cursor and keyboard focus are visible in common editing and control states.
- [ ] Core surface checklist is complete; any non-core untested surface is documented.
- [ ] Error/warning/success/info and Git meanings remain recognizable.
- [ ] Terminal ANSI colors and representative real tools are checked.
- [ ] Chat claims match observed supported controls; no invented tokens or AI-access dependency.
- [ ] Supported active-tab fallback is documented honestly.
- [ ] Each variant is exercised on available target platforms; macOS/Windows smoke coverage is completed, Linux and physical OLED status are stated accurately.
- [ ] Exact minimum VS Code version is selected from testing and encoded in the manifest.
- [ ] PNG icon is legible at small sizes; editable original artwork is retained in the repository.
- [ ] README, essential screenshots, changelog, license, repository links, and package metadata are complete.
- [ ] VSIX contents are audited; no runtime code, telemetry, secrets, or unrelated assets.
- [ ] The packaged VSIX passes fresh-profile installation and all four theme selections.
- [ ] Marketplace-installed build is verified, GitHub source is public, and matching release/tag/VSIX links work.
- [ ] Known limitations are written down and a simple issue-reporting route exists.

## 22. Recommended Next Implementation Step

Start with **Phase A only**: implement and validate the default Luxios prototype in an Extension Development Host. Prove the palette in one React/TypeScript file and one Python file before producing the other variants or release artwork.

Suggested coding-agent handoff:

> Build Luxios according to this specification. Begin with v0.1.0: a declarative VS Code theme extension with the default Luxios variant, no runtime extension code, a minimal manifest, and representative web and Python fixtures. Verify the current Stable theme schema and record the tested baseline. Implement the specified palette, syntax roles, terminal colors, core workbench surfaces, and supported two-edge active-tab treatment. Use actual token inspection to refine TextMate and semantic rules. Validate contrast and clean-profile loading, then report screenshots and remaining gaps. Do not publish, create companion features, or claim unsupported glow/full-tab-border behavior. After the default is validated, proceed through the remaining phases to derive the other three variants and prepare the release.

Before public publishing, resolve the author's GitHub identity, publisher ID, copyright name, and actual account access. Those choices do not block the prototype. No other product feature is needed to start.
