import { z } from "zod";

// ─── Base ─────────────────────────────────────────────────────────────────────

export interface Client<TCustomFields extends Record<string, unknown> = Record<string, unknown>> {
  avatarImageUrl: string | null;
  companyIds?: string[];
  createdAt: string;
  creationMethod: "client" | "directSignUp" | "internalUser";
  /** @deprecated Use `companyIds` instead. */
  companyId?: string;
  customFields?: TCustomFields | null;
  email: string;
  fallbackColor: string | null;
  familyName: string;
  firstLoginDate: string | null;
  givenName: string;
  id: string;
  inviteUrl?: string;
  lastLoginDate: string | null;
  object: "client";
  status: "active" | "invited" | "notInvited";
  updatedAt?: string;
}

const clientShape = {
  avatarImageUrl: z.string().nullable(),
  companyId: z.string().optional(),
  companyIds: z.array(z.string()).optional(),
  createdAt: z.iso.datetime(),
  creationMethod: z.enum(["client", "directSignUp", "internalUser"]),
  customFields: z.record(z.string(), z.unknown()).nullable().optional(),
  email: z.string(),
  fallbackColor: z.string().nullable(),
  familyName: z.string(),
  firstLoginDate: z.string().nullable(),
  givenName: z.string(),
  id: z.string(),
  inviteUrl: z.string().optional(),
  lastLoginDate: z.string().nullable(),
  object: z.literal("client"),
  status: z.enum(["active", "invited", "notInvited"]),
  updatedAt: z.iso.datetime().optional(),
};

export const ClientSchema: z.ZodType<Client> = z.object(clientShape);

/**
 * `appVisibility` is documented in prose but absent from the OpenAPI response
 * schema, so its group shape is kept loose rather than guessed at.
 */
export interface ClientWithAppVisibility<
  TCustomFields extends Record<string, unknown> = Record<string, unknown>,
> extends Client<TCustomFields> {
  appVisibility?: Record<string, unknown>[];
}

export const ClientWithAppVisibilitySchema: z.ZodType<ClientWithAppVisibility> = z.object({
  ...clientShape,
  appVisibility: z.array(z.record(z.string(), z.unknown())).optional(),
});

// ─── Response ─────────────────────────────────────────────────────────────────

export const ClientResponseSchema: z.ZodType<Client> = ClientSchema;
export type ClientResponse<
  TCustomFields extends Record<string, unknown> = Record<string, unknown>,
> = Client<TCustomFields>;

export interface ClientsResponse<
  TCustomFields extends Record<string, unknown> = Record<string, unknown>,
> {
  data: Client<TCustomFields>[];
  nextToken?: string;
}

export const ClientsResponseSchema: z.ZodType<ClientsResponse> = z.object({
  data: z.array(ClientSchema).transform((v) => v || []),
  nextToken: z.string().optional(),
});

// ─── Requests ─────────────────────────────────────────────────────────────────

export interface ClientCreateRequest {
  companyIds?: string[];
  customFields?: Record<string, unknown>;
  email: string;
  familyName: string;
  givenName: string;
}

export const ClientCreateRequestSchema: z.ZodType<ClientCreateRequest> = z.object({
  companyIds: z.array(z.string()).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  email: z.email(),
  familyName: z.string(),
  givenName: z.string(),
});

export interface ClientUpdateRequest {
  companyIds?: string[];
  customFields?: Record<string, unknown>;
  email?: string;
  familyName?: string;
  givenName?: string;
}

export const ClientUpdateRequestSchema: z.ZodType<ClientUpdateRequest> = z.object({
  companyIds: z.array(z.string()).optional(),
  customFields: z.record(z.string(), z.unknown()).optional(),
  email: z.string().optional(),
  familyName: z.string().optional(),
  givenName: z.string().optional(),
});
