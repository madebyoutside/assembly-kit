import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export interface Price {
  amount?: number;
  currency?: string;
  id: string;
  interval?: string;
  object: "price";
  productId?: string;
}

export const PriceSchema: z.ZodType<Price> = z.object({
  amount: z.number().optional(),
  currency: z.string().optional(),
  id: z.string(),
  interval: z.string().optional(),
  object: z.literal("price"),
  productId: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const PriceResponseSchema: z.ZodType<Price> = PriceSchema;
export type PriceResponse = Price;

export interface PricesResponse {
  data: Price[] | null;
  nextToken?: string;
}

export const PricesResponseSchema: z.ZodType<PricesResponse> = z.object({
  data: z.array(PriceSchema).nullable(),
  nextToken: z.string().optional(),
});

// ─── Requests ─────────────────────────────────────────────────────────────────

export type BillingPeriod =
  | "biannually"
  | "day"
  | "month"
  | "quarterly"
  | "semiannually"
  | "week"
  | "year";

export const BillingPeriodSchema: z.ZodType<BillingPeriod> = z.enum([
  "day",
  "week",
  "month",
  "quarterly",
  "biannually",
  "year",
  "semiannually",
]);

export type PriceType = "oneTime" | "recurring";

export const PriceTypeSchema: z.ZodType<PriceType> = z.enum(["oneTime", "recurring"]);

export interface PriceCreateRequest {
  amount: number;
  currency?: string;
  interval?: BillingPeriod;
  intervalCount?: number;
  productId: string;
  type?: PriceType;
}

export const PriceCreateRequestSchema: z.ZodType<PriceCreateRequest> = z.object({
  amount: z.number(),
  currency: z.string().optional(),
  interval: BillingPeriodSchema.optional(),
  intervalCount: z.number().optional(),
  productId: z.string(),
  type: PriceTypeSchema.optional(),
});
