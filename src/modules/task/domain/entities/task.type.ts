/**
 * タスクステータス
 */
export const TaskStatus = {
  /**
   * 未完了
   */
  Incomplete: 'incomplete',
  /**
   * 完了
   */
  Completed: 'completed',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];

/**
 * タスクの最大延期回数
 */
export const TASK_POSTPONE_MAX_COUNT = 3;
