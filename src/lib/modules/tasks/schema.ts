import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export type TaskStatus = "completed" | "inProgress" | "todo";

export const TaskStatusSchema: z.ZodType<TaskStatus> = z.enum(["todo", "inProgress", "completed"]);

export interface TaskViewer {
  clientId?: string;
  companyId?: string;
}

export const TaskViewerSchema: z.ZodType<TaskViewer> = z.object({
  clientId: z.string().optional(),
  companyId: z.string().optional(),
});

export interface Task {
  clientId?: string | null;
  companyId?: string | null;
  createdAt: string;
  createdBy?: string;
  description?: string;
  dueDate?: string | null;
  id: string;
  internalUserId?: string | null;
  isArchived?: boolean;
  name?: string;
  object: "task";
  parentTaskId?: string | null;
  status?: TaskStatus;
  templateId?: string | null;
  updatedAt?: string;
  viewers?: TaskViewer[];
}

export const TaskSchema: z.ZodType<Task> = z.object({
  clientId: z.string().nullable().optional(),
  companyId: z.string().nullable().optional(),
  createdAt: z.iso.datetime(),
  createdBy: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().nullable().optional(),
  id: z.string(),
  internalUserId: z.string().nullable().optional(),
  isArchived: z.boolean().optional(),
  name: z.string().optional(),
  object: z.literal("task"),
  parentTaskId: z.string().nullable().optional(),
  status: TaskStatusSchema.optional(),
  templateId: z.string().nullable().optional(),
  updatedAt: z.iso.datetime().optional(),
  viewers: z.array(TaskViewerSchema).optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const TaskResponseSchema: z.ZodType<Task> = TaskSchema;
export type TaskResponse = Task;

export interface TasksResponse {
  data: Task[] | null;
  nextToken?: string;
}

export const TasksResponseSchema: z.ZodType<TasksResponse> = z.object({
  data: z.array(TaskSchema).nullable(),
  nextToken: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Request types
// ---------------------------------------------------------------------------

interface TaskFields {
  clientId?: string;
  companyId?: string;
  description?: string;
  dueDate?: string;
  internalUserId?: string;
  isArchived?: boolean;
  name?: string;
  parentTaskId?: string;
  status?: TaskStatus;
  templateId?: string;
  viewers?: TaskViewer[];
}

const taskFieldsShape = {
  clientId: z.string().optional(),
  companyId: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  internalUserId: z.string().optional(),
  isArchived: z.boolean().optional(),
  name: z.string().optional(),
  parentTaskId: z.string().optional(),
  status: TaskStatusSchema.optional(),
  templateId: z.string().optional(),
  viewers: z.array(TaskViewerSchema).optional(),
};

/** Overrides the assignment email sent to the assignee. `htmlBody` allows only p, br, strong/b, em/i, ul, ol, li and https links. */
export interface TaskEmail {
  body?: string;
  ctaParams?: Record<string, string>;
  header: string;
  htmlBody?: string;
  subject: string;
  title: string;
}

export const TaskEmailSchema: z.ZodType<TaskEmail> = z.object({
  body: z.string().optional(),
  ctaParams: z.record(z.string(), z.string()).optional(),
  header: z.string(),
  htmlBody: z.string().optional(),
  subject: z.string(),
  title: z.string(),
});

export interface TaskCreateRequest extends TaskFields {
  email?: TaskEmail;
}

export const TaskCreateRequestSchema: z.ZodType<TaskCreateRequest> = z.object({
  ...taskFieldsShape,
  email: TaskEmailSchema.optional(),
});

export type TaskUpdateRequest = TaskFields;

export const TaskUpdateRequestSchema: z.ZodType<TaskUpdateRequest> = z.object(taskFieldsShape);
