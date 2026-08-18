import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export type RefundStatus = "failed" | "pending" | "succeeded";

export const RefundStatusSchema: z.ZodType<RefundStatus> = z.enum([
  "pending",
  "succeeded",
  "failed",
]);

export interface Refund {
  amount: number;
  completedAt?: string;
  createdAt: string;
  creatorId?: string;
  failureReason?: string;
  id: string;
  identityId?: string;
  invoiceId: string;
  object: string;
  receiptKey?: string;
  ref?: string;
  status: RefundStatus;
  updatedAt?: string;
}

export const RefundSchema: z.ZodType<Refund> = z.object({
  amount: z.number(),
  completedAt: z.string().optional(),
  createdAt: z.string(),
  creatorId: z.string().optional(),
  failureReason: z.string().optional(),
  id: z.string(),
  identityId: z.string().optional(),
  invoiceId: z.string(),
  object: z.string(),
  receiptKey: z.string().optional(),
  ref: z.string().optional(),
  status: RefundStatusSchema,
  updatedAt: z.string().optional(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const RefundResponseSchema: z.ZodType<Refund> = RefundSchema;
export type RefundResponse = Refund;

export interface RefundsResponse {
  data: Refund[] | null;
  nextToken?: string;
}

export const RefundsResponseSchema: z.ZodType<RefundsResponse> = z.object({
  data: z.array(RefundSchema).nullable(),
  nextToken: z.string().optional(),
});

// ─── Requests ─────────────────────────────────────────────────────────────────

export interface RefundCreateRequest {
  invoiceId: string;
}

export const RefundCreateRequestSchema: z.ZodType<RefundCreateRequest> = z.object({
  invoiceId: z.string(),
});
