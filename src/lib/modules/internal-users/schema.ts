import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface InternalUser {
  avatarImageUrl?: string;
  companyAccessList: string[] | null;
  createdAt?: string;
  email: string;
  fallbackColor?: string | null;
  familyName: string;
  givenName: string;
  id: string;
  isClientAccessLimited: boolean;
  object: "internalUser";
  role?: string;
}

export const InternalUserSchema: z.ZodType<InternalUser> = z.object({
  avatarImageUrl: z.string().optional(),
  companyAccessList: z.array(z.string()).nullable(),
  createdAt: z.iso.datetime().optional(),
  // Deleted internal users can still be queried but have an empty email
  email: z.union([z.email(), z.literal("")]),
  fallbackColor: z.string().nullish(),
  familyName: z.string(),
  givenName: z.string(),
  id: z.string(),
  isClientAccessLimited: z.boolean().default(false),
  object: z.literal("internalUser"),
  role: z.string().optional(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const InternalUserResponseSchema: z.ZodType<InternalUser> = InternalUserSchema;
export type InternalUserResponse = InternalUser;

export interface InternalUsersResponse {
  data: InternalUser[];
  nextToken?: string;
}

export const InternalUsersResponseSchema: z.ZodType<InternalUsersResponse> = z.object({
  data: z.array(InternalUserSchema),
  nextToken: z.string().optional(),
});

// ─── Requests ─────────────────────────────────────────────────────────────────

export interface InternalUserUpdateRequest {
  companyAccessList?: string[];
  isClientAccessLimited?: boolean;
}

export const InternalUserUpdateRequestSchema: z.ZodType<InternalUserUpdateRequest> = z.object({
  companyAccessList: z.array(z.string()).optional(),
  isClientAccessLimited: z.boolean().optional(),
});

// ─── Notification settings ────────────────────────────────────────────────────

export type InternalUserEmailSetting = "always" | "no_emails" | "not_active";

export const InternalUserEmailSettingSchema: z.ZodType<InternalUserEmailSetting> = z.enum([
  "always",
  "not_active",
  "no_emails",
]);

export interface NotificationCategorySetting {
  appId?: string;
  disableEmail?: boolean;
  disableInProduct?: boolean;
  notificationSettingId?: string;
}

export const NotificationCategorySettingSchema: z.ZodType<NotificationCategorySetting> = z.object({
  appId: z.string().optional(),
  disableEmail: z.boolean().optional(),
  disableInProduct: z.boolean().optional(),
  notificationSettingId: z.string().optional(),
});

export interface InternalUserNotificationSettings {
  disableInProduct?: boolean;
  emailSettings?: InternalUserEmailSetting;
  notifyAbout?: Record<string, NotificationCategorySetting>;
  object?: string;
}

export const InternalUserNotificationSettingsSchema: z.ZodType<InternalUserNotificationSettings> =
  z.object({
    disableInProduct: z.boolean().optional(),
    emailSettings: InternalUserEmailSettingSchema.optional(),
    notifyAbout: z.record(z.string(), NotificationCategorySettingSchema).optional(),
    object: z.string().optional(),
  });
