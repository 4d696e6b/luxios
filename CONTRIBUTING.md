# Contributing to Luxios

Luxios welcomes focused fixes for readability, missing scopes, and VS Code compatibility.

Before opening a change, reproduce the issue with a committed fixture or a small standalone sample. For syntax issues, include the output of **Developer: Inspect Editor Tokens and Scopes** and state whether semantic highlighting is enabled.

Run the following before submitting a change:

```sh
npm ci
npm run package
python3 -m py_compile examples/python/luxios_showcase.py
```

Keep syntax role meaning consistent across all four variants. A new color should have a specific job; do not introduce gold merely for decoration.
