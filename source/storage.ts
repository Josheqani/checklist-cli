/**
 * ============================================================================
 * Storage Utility
 * ============================================================================
 * This module handles loading and saving checklist tasks to disk as a JSON file.
 * This ensures your tasks are remembered even after you close the CLI.
 *
 * Location: We save the file to the user's home directory (~/.checklist-tasks.json)
 * so the checklist is accessible regardless of which folder you run the command in.
 */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {type Task} from './types.js';

/** Default file path where tasks are saved */
const storageFilePath = path.join(os.homedir(), '.checklist-tasks.json');

/**
 * Starter tasks loaded if no previous tasks file exists on your computer.
 */
const defaultTasks: Task[] = [
	{id: '1', title: 'Welcome to Checklist CLI! 👋', completed: false},
	{id: '2', title: 'Press [Space] to toggle completion', completed: true},
	{id: '3', title: 'Press [a] to add a new task', completed: false},
	{id: '4', title: 'Press [d] to delete selected task', completed: false},
	{id: '5', title: 'Press [q] to exit the CLI', completed: false},
];

/**
 * Loads tasks from the JSON file on disk.
 * If the file doesn't exist or is invalid, returns the default starter tasks.
 */
export function loadTasks(): Task[] {
	try {
		if (!fs.existsSync(storageFilePath)) {
			return defaultTasks;
		}

		const data = fs.readFileSync(storageFilePath, 'utf8');
		const parsed = JSON.parse(data) as Task[];

		if (Array.isArray(parsed) && parsed.length > 0) {
			return parsed;
		}

		return defaultTasks;
	} catch {
		// If reading/parsing fails, fallback gracefully to defaults
		return defaultTasks;
	}
}

/**
 * Saves current tasks array to the JSON file on disk.
 */
export function saveTasks(tasks: Task[]): void {
	try {
		fs.writeFileSync(storageFilePath, JSON.stringify(tasks, null, 2), 'utf8');
	} catch (error: unknown) {
		console.error('Failed to save tasks:', error);
	}
}
