/**
 * ============================================================================
 * Task Model Types
 * ============================================================================
 * This defines the TypeScript structure for each checklist item in our app.
 * In TypeScript, types help prevent bugs by strictly describing what data
 * a task can hold.
 */
export type Task = {
	/** Unique identifier for the task (used as React key and for lookups) */
	readonly id: string;
	/** The title/description of the task */
	title: string;
	/** Whether the task has been checked off */
	completed: boolean;
};
