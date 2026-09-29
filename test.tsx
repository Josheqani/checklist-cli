import React from 'react';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from './source/app.js';

test('renders empty checklist message when no tasks exist', t => {
	const {lastFrame} = render(<App initialTasks={[]} isInputActive={false} />);

	t.true(lastFrame()?.includes('CHECKLIST CLI'));
	t.true(lastFrame()?.includes('No tasks yet!'));
});

test('renders tasks with checkboxes and counts', t => {
	const initialTasks = [
		{id: '1', title: 'Buy milk', completed: false},
		{id: '2', title: 'Write tests', completed: true},
	];

	const {lastFrame} = render(
		<App initialTasks={initialTasks} isInputActive={false} />,
	);
	const frame = lastFrame() ?? '';
	t.true(frame.includes('CHECKLIST CLI'));
	t.true(frame.includes('Buy milk'));
	t.true(frame.includes('Write tests'));
	t.true(frame.includes('Done: 1/2 (50%)'));
});
