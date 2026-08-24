import { z } from "zod";

import type { CustomFieldOption } from "../custom-field-options";
import { CustomFieldOptionSchema } from "../custom-field-options";

// ─── Base ─────────────────────────────────────────────────────────────────────

export type CustomFieldType =
  | "address"
  | "email"
  | "multiSelect"
  | "number"
  | "phoneNumber"
  | "text"
  | "url";

export const CustomFieldTypeSchema: z.ZodType<CustomFieldType> = z.enum([
  "address",
  "email",
  "phoneNumber",
  "text",
  "number",
  "url",
  "multiSelect",
]);

export type CustomFieldEntityType = "client" | "company";

export const CustomFieldEntityTypeSchema: z.ZodType<CustomFieldEntityType> = z.enum([
  "client",
  "company",
]);

export interface CustomField {
  entityType: CustomFieldEntityType;
  id: string;
  key: string;
  name: string;
  object: "customField";
  options?: CustomFieldOption[];
  order: number;
  type: CustomFieldType;
}

const customFieldShape = {
  entityType: CustomFieldEntityTypeSchema,
  id: z.string(),
  key: z.string(),
  name: z.string(),
  object: z.literal("customField"),
  options: z.array(CustomFieldOptionSchema).optional(),
  order: z.number(),
  type: CustomFieldTypeSchema,
};

export const CustomFieldSchema: z.ZodType<CustomField> = z.object(customFieldShape);

/**
 * `POST /v1/custom-fields` omits `object` from the fields it echoes back, though `GET` includes it
 * and the API reference documents it on both. Requiring it made a successful create throw
 * `AssemblyResponseParseError` after the field had been created — and a custom field cannot be
 * deleted through the API, so a retry left a duplicate behind. Drop this once the API sends it.
 */
export interface CreatedCustomField extends Omit<CustomField, "object"> {
  object?: "customField";
}

export const CreatedCustomFieldSchema: z.ZodType<CreatedCustomField> = z.object({
  ...customFieldShape,
  object: z.literal("customField").optional(),
});

// ─── Custom field value types ─────────────────────────────────────────────────

export interface AddressValue {
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country: string;
  fullAddress: string;
  postalCode?: string;
  region?: string;
}

export const AddressValueSchema: z.ZodType<AddressValue> = z.object({
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z.string(),
  fullAddress: z.string(),
  postalCode: z.string().optional(),
  region: z.string().optional(),
});

/**
 * Union of all possible custom field values.
 * Order matters: number and string[] are tried before string to avoid
 * early matching on a less-specific branch.
 */
export type CustomFieldValue = AddressValue | number | string | string[];

export const CustomFieldValueSchema: z.ZodType<CustomFieldValue> = z.union([
  z.number(),
  z.array(z.string()),
  AddressValueSchema,
  z.string(),
]);

// ─── Response ─────────────────────────────────────────────────────────────────

export interface ListCustomFieldResponse {
  data: CustomField[];
}

export const ListCustomFieldResponseSchema: z.ZodType<ListCustomFieldResponse> = z.object({
  data: z.array(CustomFieldSchema).transform((v) => v || []),
});

// ─── Requests ─────────────────────────────────────────────────────────────────

export interface CustomFieldCreateInput {
  entityType: CustomFieldEntityType;
  name: string;
  /** Only valid for `multiSelect` fields. */
  options?: { label: string }[];
  type: CustomFieldType;
}

export const CustomFieldCreateInputSchema: z.ZodType<CustomFieldCreateInput> = z.object({
  entityType: CustomFieldEntityTypeSchema,
  name: z.string(),
  options: z.array(z.object({ label: z.string() })).optional(),
  type: CustomFieldTypeSchema,
});

export interface CustomFieldsCreateRequest {
  customFields: CustomFieldCreateInput[];
}

export const CustomFieldsCreateRequestSchema: z.ZodType<CustomFieldsCreateRequest> = z.object({
  customFields: z.array(CustomFieldCreateInputSchema),
});

export interface CustomFieldsCreateResponse {
  customFields: CreatedCustomField[];
}

export const CustomFieldsCreateResponseSchema: z.ZodType<CustomFieldsCreateResponse> = z.object({
  customFields: z.array(CreatedCustomFieldSchema).transform((v) => v || []),
});
