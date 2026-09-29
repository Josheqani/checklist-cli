# 📋 checklist-cli

An elegant, keyboard-driven terminal checklist and task manager built with [Ink](https://github.com/vadimdemedes/ink), React, and TypeScript.

[![Node.js](https://img.shields.io/badge/node-%3E%3D16-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Built with Ink](https://img.shields.io/badge/built%20with-Ink%20v4-ff69b4.svg)](https://github.com/vadimdemedes/ink)

---

## 📸 Preview

```text
╭────────────────────────────────────────────────────────────────────────╮
│                                                                        │
│  📋 CHECKLIST CLI                                     Done: 2/4 (50%)  │
│                                                                        │
│  ❯  [ ] Deploy new release to production                               │
│     [✔] Review pull request #12                                        │
│     [ ] Write integration test cases                                   │
│     [✔] Update project documentation                                   │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ [↑/↓] Move  [Space] Toggle  [a] Add  [d] Delete  [c] Clear  [q]  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                        │
╰────────────────────────────────────────────────────────────────────────╯
```

---

## ✨ Features

- ⚡ **Lightweight & Fast**: Launches instantly in your terminal.
- ⌨️ **Vim & Arrow Key Navigation**: Navigate seamlessly using arrows or standard `j` / `k` keys.
- 💾 **Automatic Local Persistence**: All changes save automatically to `~/.checklist-tasks.json`, so your list stays intact across sessions and directories.
- 📊 **Live Progress Tracking**: Real-time completion counter and percentage indicator.
- 📝 **Inline Task Creation**: Create tasks on the fly with a built-in interactive input prompt.
- 🎓 **Educational Source Code**: Every file is thoroughly documented with star-block comments (`/** ... */`) explaining how Ink, Yoga Flexbox layout, terminal hooks, and CLI inputs function.

---

## 🚀 Quick Start & Usage

### 1. Run as a Global Command (Recommended)

When you initialize the project with `create-ink-app`, a local symlink is created automatically. You can launch the CLI from any terminal session:

```bash
checklist-cli
```

> **Note:** If the command is not recognized, link it to your global Node environment by running `npm link` inside the project folder.

### 2. Run Directly from Source

You can also build and run the compiled output directly:

```bash
# Compile TypeScript
pnpm run build

# Launch the CLI
node dist/cli.js
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut                | Description                             |
| :---------------------- | :-------------------------------------- |
| `↑` or `k`              | Move selection cursor up                |
| `↓` or `j`              | Move selection cursor down              |
| `Space` or `Enter`      | Toggle completed / pending status       |
| `a`                     | Enter **Add Mode** to create a new task |
| `Enter` _(in Add Mode)_ | Save new task                           |
| `Esc` _(in Add Mode)_   | Cancel and return to list               |
| `d` or `x`              | Delete currently selected task          |
| `c`                     | Clear all completed tasks               |
| `q` or `Esc`            | Gracefully quit the application         |

---

## 📂 Storage & Persistence

Your checklist items are saved automatically to your user home directory:

```text
~/.checklist-tasks.json
```

Because it saves to your home folder, you can run `checklist-cli` from any directory on your computer and always see your personal task list. If the file does not exist yet, default onboarding tasks will guide you on your first launch.

---

## 🛠️ Development

### Setup

```bash
# Install dependencies
pnpm install

# Watch mode for rapid development
pnpm run dev
```

### Testing & Code Quality

```bash
# Run tests, format checker, and linter (Prettier + XO + AVA)
pnpm test

# Build production bundle
pnpm run build
```

---

## 📦 Publishing to npm (Optional)

If you plan to publish this package to the public npm registry for others to install:

1. Update the `"name"` field in `package.json` with a unique or scoped name (e.g., `@yourusername/checklist-cli`).
2. Log into npm:
   ```bash
   npm login
   ```
3. Publish:
   ```bash
   npm publish --access public
   ```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
