# checklist-cli

> An interactive, keyboard-driven terminal checklist and todo list built with [Ink](https://github.com/vadimdemedes/ink) and React.

## Features

- ⌨️ **Keyboard-driven**: Navigate, toggle, add, and delete items using standard keystrokes and Vim bindings.
- 💾 **Automatic persistence**: Tasks automatically save to `~/.checklist-tasks.json` so your items persist across runs.
- 🎨 **Terminal UI**: Styled with boxes, colors, progress indicator, and custom checkbox icons.
- 💬 **Extensively commented**: Source code is fully documented with star-block comments (`/** ... */`) explaining every Ink component and concept.

## Install

```bash
$ npm install --global checklist-cli
```

Or run locally during development:

```bash
$ npm run build
$ node dist/cli.js
```

## Keyboard Controls

| Key               | Action                               |
| ----------------- | ------------------------------------ |
| `↑` / `k`         | Move selection cursor up             |
| `↓` / `j`         | Move selection cursor down           |
| `Space` / `Enter` | Toggle completed / pending status    |
| `a`               | Add a new task (enters input prompt) |
| `d` / `x`         | Delete currently selected task       |
| `c`               | Clear all completed tasks            |
| `q` / `Esc`       | Quit the checklist CLI               |

## Development

```bash
# Watch for TypeScript changes
$ npm run dev

# Run test suite and linter
$ npm test
```
