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
