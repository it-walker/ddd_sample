/**
 * タスクステータス
 */
export const TaskStatusType = {
  /**
   * 未完了
   */
  Incomplete: 'incomplete',
  /**
   * 完了
   */
  Completed: 'completed',
} as const

export type TaskStatus = typeof TaskStatusType[keyof typeof TaskStatusType]

/**
 * タスクの最大延期回数
 */
export const TASK_POSTPONE_MAX_COUNT = 3
