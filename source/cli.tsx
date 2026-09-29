#!/usr/bin/env node
/**
 * ============================================================================
 * CLI Entry Point (Executable Binary)
 * ============================================================================
 * This is the file executed when running `checklist-cli` in your terminal.
 *
 * How it works:
 * 1. `meow`: Parses command line flags, arguments, and handles `--help` / `--version`.
 * 2. `render`: Ink's root rendering function.
 *    Similar to `ReactDOM.createRoot(root).render(<App />)` in the browser,
 *    Ink's `render(<App />)` connects your React component tree to standard
 *    output (stdout) and standard input (stdin) in the terminal.
 * ============================================================================
 */

import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

meow(
	`
	Usage
	  $ checklist-cli

	Keys
	  ↑/↓ or k/j   Navigate tasks
	  Space        Toggle complete/incomplete
	  a            Add a new task
	  d or x       Delete selected task
	  c            Clear completed tasks
	  q or Esc     Quit checklist

	Examples
	  $ checklist-cli
`,
	{
		importMeta: import.meta,
	},
);

/**
 * Render the Ink application in the terminal.
 * Ink handles redrawing the terminal whenever React state changes!
 */
render(<App />);
