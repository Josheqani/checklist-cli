/**
 * ============================================================================
 * Ink Checklist CLI - Main Application Component
 * ============================================================================
 *
 * WHAT IS INK?
 * Ink provides the same component-based UI model as React, but outputs to the
 * command-line terminal instead of the browser DOM.
 *
 * KEY INK CONCEPTS USED HERE:
 * 1. `<Box>`: Think of Box like a `<div>` in HTML. Ink uses Yoga (a flexbox engine),
 *    so every Box has `display: flex` by default. You can configure:
 *    - `flexDirection`: 'column' (vertical) or 'row' (horizontal)
 *    - `borderStyle`: 'round', 'single', 'double', etc.
 *    - `borderColor`: terminal colors like 'cyan', 'green', 'yellow', etc.
 *    - `padding` / `margin`: spacing around items.
 *
 * 2. `<Text>`: Think of Text like a `<span>` in HTML. All raw text in Ink MUST
 *    be wrapped in a `<Text>` component. You can set:
 *    - `color`: text color ('green', 'yellow', 'white', etc.)
 *    - `bold`: boolean for bold text
 *    - `dimColor`: boolean for muted/gray text
 *    - `strikethrough`: boolean for crossed-out text
 *
 * 3. `useInput`: An Ink hook that listens to raw terminal keystrokes.
 *    It receives `(input, key)` where:
 *    - `input`: the character string typed (e.g. 'a', 'q', ' ')
 *    - `key`: flags like `key.upArrow`, `key.downArrow`, `key.return`, `key.escape`
 *
 * 4. `useApp`: Ink hook providing `{ exit }` to gracefully shut down the CLI.
 * ============================================================================
 */

import React, {useState, useEffect} from 'react';
import {Box, Text, useInput, useApp} from 'ink';
import {type Task} from './types.js';
import {loadTasks, saveTasks} from './storage.js';

type Props = {
	/** Optional initial list of tasks (useful for testing or overrides) */
	readonly initialTasks?: Task[];
	/** Enable or disable keyboard input (e.g. disabled in headless testing) */
	readonly isInputActive?: boolean;
};

export default function App({initialTasks, isInputActive = true}: Props) {
	/**
	 * --------------------------------------------------------------------------
	 * Hook: useApp
	 * --------------------------------------------------------------------------
	 * Ink's `useApp` gives us the `exit()` function.
	 * In a browser React app, you cannot "exit the browser", but in a CLI app,
	 * calling `exit()` terminates Ink's render loop and returns the terminal
	 * back to the user's shell prompt.
	 */
	const {exit} = useApp();

	/**
	 * --------------------------------------------------------------------------
	 * State: tasks
	 * --------------------------------------------------------------------------
	 * Holds the array of checklist items in memory.
	 * If `initialTasks` prop was provided (e.g. in tests), we use that.
	 * Otherwise, we load previously saved tasks from disk (~/.checklist-tasks.json).
	 */
	const [tasks, setTasks] = useState<Task[]>(() => initialTasks ?? loadTasks());

	/**
	 * --------------------------------------------------------------------------
	 * State: selectedIndex
	 * --------------------------------------------------------------------------
	 * The index of the task currently highlighted by the keyboard cursor.
	 * Navigating with Up/Down arrows increases or decreases this number.
	 */
	const [selectedIndex, setSelectedIndex] = useState<number>(0);

	/**
	 * --------------------------------------------------------------------------
	 * State: isAdding
	 * --------------------------------------------------------------------------
	 * Boolean indicating whether the user is currently typing a new task name.
	 * - false: Navigation mode (Arrow keys move cursor, Space toggles, etc.)
	 * - true: Typing mode (Keystrokes append characters to the new task input)
	 */
	const [isAdding, setIsAdding] = useState<boolean>(false);

	/**
	 * --------------------------------------------------------------------------
	 * State: newTaskTitle
	 * --------------------------------------------------------------------------
	 * Holds the text currently being typed when `isAdding` is true.
	 */
	const [newTaskTitle, setNewTaskTitle] = useState<string>('');

	/**
	 * --------------------------------------------------------------------------
	 * Effect: Auto-save tasks whenever they change
	 * --------------------------------------------------------------------------
	 * Whenever the `tasks` state updates (added, toggled, deleted),
	 * this useEffect writes the changes to disk so they persist across sessions.
	 */
	useEffect(() => {
		// Only save to disk if we are not running with isolated test initialTasks
		if (!initialTasks) {
			saveTasks(tasks);
		}
	}, [tasks, initialTasks]);

	/**
	 * --------------------------------------------------------------------------
	 * Helper: Handles keystrokes when adding a new task
	 * --------------------------------------------------------------------------
	 */
	const handleAddingKey = (
		input: string,
		key: Parameters<Parameters<typeof useInput>[0]>[1],
	) => {
		// Pressing ESC cancels adding mode
		if (key.escape) {
			setIsAdding(false);
			setNewTaskTitle('');
			return;
		}

		// Pressing ENTER confirms and creates the new task
		if (key.return) {
			const trimmed = newTaskTitle.trim();
			if (trimmed.length > 0) {
				const newTask: Task = {
					id: String(Date.now()),
					title: trimmed,
					completed: false,
				};
				const updated = [...tasks, newTask];
				setTasks(updated);
				setSelectedIndex(updated.length - 1);
			}

			setIsAdding(false);
			setNewTaskTitle('');
			return;
		}

		// Pressing BACKSPACE or DELETE removes the last character
		if (key.backspace || key.delete) {
			setNewTaskTitle(previous => previous.slice(0, -1));
			return;
		}

		// Regular typing: Append character to the input buffer
		if (input && !key.ctrl && !key.meta) {
			setNewTaskTitle(previous => previous + input);
		}
	};

	/**
	 * --------------------------------------------------------------------------
	 * Helper: Handles keystrokes when navigating the list
	 * --------------------------------------------------------------------------
	 */
	const handleNavigationKey = (
		input: string,
		key: Parameters<Parameters<typeof useInput>[0]>[1],
	) => {
		// 'q' or ESC: Quit application gracefully
		if (input === 'q' || key.escape) {
			exit();
			return;
		}

		// UP ARROW or 'k' (Vim key): Move cursor up
		if (key.upArrow || input === 'k') {
			setSelectedIndex(previous =>
				previous > 0 ? previous - 1 : Math.max(0, tasks.length - 1),
			);
			return;
		}

		// DOWN ARROW or 'j' (Vim key): Move cursor down
		if (key.downArrow || input === 'j') {
			setSelectedIndex(previous =>
				previous < tasks.length - 1 ? previous + 1 : 0,
			);
			return;
		}

		// SPACE or ENTER: Toggle completed status of selected task
		if (input === ' ' || key.return) {
			if (tasks.length === 0) return;

			setTasks(previous =>
				previous.map((task, index) =>
					index === selectedIndex
						? {...task, completed: !task.completed}
						: task,
				),
			);
			return;
		}

		// 'a': Enter "Adding Mode" to create a new task
		if (input === 'a') {
			setIsAdding(true);
			setNewTaskTitle('');
			return;
		}

		// 'd' or 'x': Delete the currently selected task
		if (input === 'd' || input === 'x') {
			if (tasks.length === 0) return;

			setTasks(previous =>
				previous.filter((_, index) => index !== selectedIndex),
			);
			setSelectedIndex(previous =>
				previous >= tasks.length - 1 ? Math.max(0, tasks.length - 2) : previous,
			);
			return;
		}

		// 'c': Clear all completed tasks from the list
		if (input === 'c') {
			setTasks(previous => previous.filter(task => !task.completed));
			setSelectedIndex(0);
		}
	};

	/**
	 * --------------------------------------------------------------------------
	 * Hook: useInput (Keyboard Controller)
	 * --------------------------------------------------------------------------
	 * Intercepts terminal keystrokes and routes them based on the current mode.
	 */
	useInput(
		(input, key) => {
			if (isAdding) {
				handleAddingKey(input, key);
			} else {
				handleNavigationKey(input, key);
			}
		},
		{isActive: isInputActive},
	);

	/** Calculated summary counts for progress indicator */
	const totalTasks = tasks.length;
	const completedTasks = tasks.filter(t => t.completed).length;
	const percentage =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

	return (
		/**
		 * ------------------------------------------------------------------------
		 * Section 1: Main Container (<Box>)
		 * ------------------------------------------------------------------------
		 * <Box> creates a flex container with:
		 * - flexDirection="column": stacks children vertically
		 * - borderStyle="round": renders curved terminal borders
		 * - borderColor="cyan": gives the border a cyan color
		 * - paddingX / paddingY: spacing inside the box
		 */
		<Box
			borderColor="cyan"
			borderStyle="round"
			flexDirection="column"
			paddingX={2}
			paddingY={1}
		>
			{/**
			 * ----------------------------------------------------------------------
			 * Section 2: Header & Progress Bar
			 * ----------------------------------------------------------------------
			 */}
			<Box flexDirection="row" justifyContent="space-between" marginBottom={1}>
				<Text bold color="cyan">
					📋 CHECKLIST CLI
				</Text>
				<Text color="gray">
					Done: <Text color="green">{completedTasks}</Text>/{totalTasks} (
					{percentage}%)
				</Text>
			</Box>

			{/**
			 * ----------------------------------------------------------------------
			 * Section 3: Task Items List
			 * ----------------------------------------------------------------------
			 * If the list is empty, show a friendly empty message.
			 * Otherwise, loop through tasks and render each row.
			 */}
			{tasks.length === 0 ? (
				<Box marginY={1}>
					<Text color="yellow">No tasks yet! Press [a] to add one.</Text>
				</Box>
			) : (
				<Box flexDirection="column" marginY={1}>
					{tasks.map((task, index) => {
						const isSelected = index === selectedIndex;
						const itemColor = task.completed
							? 'gray'
							: isSelected
							? 'white'
							: undefined;

						return (
							<Box key={task.id} flexDirection="row" marginY={0}>
								{/* Selection Cursor Indicator */}
								<Box width={3}>
									<Text bold color={isSelected ? 'cyan' : undefined}>
										{isSelected ? '❯ ' : '  '}
									</Text>
								</Box>

								{/* Checkbox Icon: [✔] or [ ] */}
								<Box width={4}>
									{task.completed ? (
										<Text bold color="green">
											[✔]
										</Text>
									) : (
										<Text color="yellow">[ ]</Text>
									)}
								</Box>

								{/* Task Title text with conditional styling */}
								<Text
									bold={isSelected}
									color={itemColor}
									strikethrough={task.completed}
								>
									{task.title}
								</Text>
							</Box>
						);
					})}
				</Box>
			)}

			{/**
			 * ----------------------------------------------------------------------
			 * Section 4: Add Task Input Mode
			 * ----------------------------------------------------------------------
			 * When `isAdding` is true, displays an interactive input line where
			 * typed characters appear in real time with a blinking cursor indicator.
			 */}
			{isAdding && (
				<Box
					borderColor="green"
					borderStyle="single"
					flexDirection="row"
					marginTop={1}
					paddingX={1}
				>
					<Text bold color="green">
						New task:{' '}
					</Text>
					<Text color="white">{newTaskTitle}</Text>
					<Text bold color="green">
						_
					</Text>
					<Box marginLeft={2}>
						<Text color="gray">(Press [Enter] to save, [Esc] to cancel)</Text>
					</Box>
				</Box>
			)}

			{/**
			 * ----------------------------------------------------------------------
			 * Section 5: Keyboard Shortcuts Footer
			 * ----------------------------------------------------------------------
			 * Helper bar at the bottom reminding user of the key commands.
			 */}
			<Box
				borderColor="gray"
				borderStyle="single"
				flexDirection="row"
				marginTop={1}
				paddingX={1}
			>
				<Text color="gray">
					<Text bold color="white">
						[↑/↓]
					</Text>{' '}
					Move{'  '}
					<Text bold color="white">
						[Space]
					</Text>{' '}
					Toggle{'  '}
					<Text bold color="white">
						[a]
					</Text>{' '}
					Add{'  '}
					<Text bold color="white">
						[d]
					</Text>{' '}
					Delete{'  '}
					<Text bold color="white">
						[c]
					</Text>{' '}
					Clear Done{'  '}
					<Text bold color="white">
						[q]
					</Text>{' '}
					Quit
				</Text>
			</Box>
		</Box>
	);
}
