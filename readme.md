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

- ⚡ **Lightweight & Fast**: Instant launch directly inside your terminal shell.
- ⌨️ **Vim & Arrow Key Navigation**: Navigate seamlessly using arrows or standard `j` / `k` keys.
- 💾 **Automatic Local Persistence**: All changes persist automatically to `~/.checklist-tasks.json`, so your list stays intact across sessions and projects.
- 📊 **Live Progress Tracking**: Real-time completion counter and percentage indicator.
- 📝 **Inline Task Creation**: Create tasks on the fly with a built-in interactive input prompt.
- 🎓 **Educational Source Code**: Every file is thoroughly annotated with star-block comments (`/** ... */`) explaining how Ink, Yoga Flexbox layout, terminal hooks, and CLI inputs function.

---

## 🚀 Installation & Usage

### Run Directly via NPX (No installation needed)

```bash
npx checklist-cli
```

### Install Globally

```bash
npm install --global checklist-cli
```

Once installed, simply run:

```bash
checklist-cli
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
| `d` or `x`              | Delete the currently selected task      |
| `c`                     | Clear all completed tasks               |
| `q` or `Esc`            | Gracefully quit the application         |

---

## 📂 Storage & Data Location

Your checklist items are automatically saved in your user home directory:

```text
~/.checklist-tasks.json
```

Because it saves to your home folder, you can run `checklist-cli` from any working directory and always see your personal task list. If the file does not exist yet, default onboarding tasks will guide you on your first launch.

---

## 🛠️ Development

### Prerequisites

- Node.js `>= 16`
- `pnpm` or `npm`

### Setup

```bash
# Clone the repository
git clone https://github.com/vadimdemedes/checklist-cli.git
cd checklist-cli

# Install dependencies
pnpm install

# Start TypeScript compiler in watch mode
pnpm run dev

# Run the compiled CLI locally
node dist/cli.js
```

### Testing & Code Quality

```bash
# Run tests, format checker, and linter (Prettier + XO + AVA)
pnpm test

# Build production bundle
pnpm run build
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
