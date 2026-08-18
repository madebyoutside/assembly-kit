import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface TaskComment {
  authorId: string;
  content: string;
  createdAt: string;
  deleted?: boolean;
  id: string;
  object: string;
  taskId: string;
  updatedAt?: string;
}

export const TaskCommentSchema: z.ZodType<TaskComment> = z.object({
  authorId: z.string(),
  content: z.string(),
  createdAt: z.string(),
  deleted: z.boolean().optional(),
  id: z.string(),
  object: z.string(),
  taskId: z.string(),
  updatedAt: z.string().optional(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const TaskCommentResponseSchema: z.ZodType<TaskComment> = TaskCommentSchema;
export type TaskCommentResponse = TaskComment;

export interface TaskCommentsResponse {
  data: TaskComment[] | null;
  nextToken?: string;
}

export const TaskCommentsResponseSchema: z.ZodType<TaskCommentsResponse> = z.object({
  data: z.array(TaskCommentSchema).nullable(),
  nextToken: z.string().optional(),
});
