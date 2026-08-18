import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface CurrentUser {
  email: string;
  familyName: string;
  givenName: string;
  id: string;
}

export const CurrentUserSchema: z.ZodType<CurrentUser> = z.object({
  email: z.string(),
  familyName: z.string(),
  givenName: z.string(),
  id: z.string(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const CurrentUserResponseSchema: z.ZodType<CurrentUser> = CurrentUserSchema;
export type CurrentUserResponse = CurrentUser;
