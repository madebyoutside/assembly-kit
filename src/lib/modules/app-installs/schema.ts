import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export type AppInstallType = "core" | "custom" | "embed" | "link" | "manual" | "marketplace";

export const AppInstallTypeSchema: z.ZodType<AppInstallType> = z.enum([
  "core",
  "custom",
  "embed",
  "link",
  "manual",
  "marketplace",
]);

export interface AppInstall {
  appId?: string;
  displayName?: string;
  id: string;
  object: "appInstall";
  type?: AppInstallType;
}

export const AppInstallSchema: z.ZodType<AppInstall> = z.object({
  appId: z.string().optional(),
  displayName: z.string().optional(),
  id: z.string(),
  object: z.literal("appInstall"),
  type: AppInstallTypeSchema.optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const AppInstallResponseSchema: z.ZodType<AppInstall> = AppInstallSchema;
export type AppInstallResponse = AppInstall;

export interface AppInstallsResponse {
  data: AppInstall[] | null;
}

export const AppInstallsResponseSchema: z.ZodType<AppInstallsResponse> = z.object({
  data: z.array(AppInstallSchema).nullable(),
});

// ─── Notification settings ────────────────────────────────────────────────────

export type NotificationSurface = "email" | "product";

export const NotificationSurfaceSchema: z.ZodType<NotificationSurface> = z.enum([
  "product",
  "email",
]);

export interface AppNotificationActionLabel {
  pluralNoun?: string;
  singularNoun?: string;
  verb?: string;
}

export const AppNotificationActionLabelSchema: z.ZodType<AppNotificationActionLabel> = z.object({
  pluralNoun: z.string().optional(),
  singularNoun: z.string().optional(),
  verb: z.string().optional(),
});

export interface AppNotificationSetting {
  default?: {
    email?: boolean;
    product?: boolean;
  };
  id?: string;
  label?: string;
  surfaces?: NotificationSurface[];
}

export const AppNotificationSettingSchema: z.ZodType<AppNotificationSetting> = z.object({
  default: z
    .object({
      email: z.boolean().optional(),
      product: z.boolean().optional(),
    })
    .optional(),
  id: z.string().optional(),
  label: z.string().optional(),
  surfaces: z.array(NotificationSurfaceSchema).optional(),
});

export interface AppNotificationSettingsResponse {
  actionLabel?: AppNotificationActionLabel;
  notifications?: AppNotificationSetting[];
  object?: string;
}

export const AppNotificationSettingsResponseSchema: z.ZodType<AppNotificationSettingsResponse> =
  z.object({
    actionLabel: AppNotificationActionLabelSchema.optional(),
    notifications: z.array(AppNotificationSettingSchema).optional(),
    object: z.string().optional(),
  });

export interface AppNotificationSettingsCreateRequest {
  actionLabel?: AppNotificationActionLabel;
  notifications: {
    default?: { email?: boolean; product?: boolean };
    id?: string;
    label: string;
    surfaces: NotificationSurface[];
  }[];
}

export const AppNotificationSettingsCreateRequestSchema: z.ZodType<AppNotificationSettingsCreateRequest> =
  z.object({
    actionLabel: AppNotificationActionLabelSchema.optional(),
    notifications: z
      .array(
        z.object({
          default: z
            .object({ email: z.boolean().optional(), product: z.boolean().optional() })
            .optional(),
          id: z.string().optional(),
          label: z.string().max(100),
          surfaces: z.array(NotificationSurfaceSchema).min(1),
        }),
      )
      .min(1)
      .max(50),
  });

/**
 * Per-setting deltas: an entry without `id` adds a setting, an entry with only
 * an `id` deletes it, and an entry with both patches it.
 */
export interface AppNotificationSettingsUpdateRequest {
  actionLabel?: AppNotificationActionLabel;
  notifications?: AppNotificationSetting[];
}

export const AppNotificationSettingsUpdateRequestSchema: z.ZodType<AppNotificationSettingsUpdateRequest> =
  z.object({
    actionLabel: AppNotificationActionLabelSchema.optional(),
    notifications: z.array(AppNotificationSettingSchema).max(50).optional(),
  });
