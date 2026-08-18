import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export type FormFieldType =
  | "date"
  | "dropdown"
  | "email"
  | "fileUpload"
  | "longAnswer"
  | "multiSelect"
  | "phoneNumber"
  | "shortAnswer"
  | "singleSelect"
  | "title";

export const FormFieldTypeSchema: z.ZodType<FormFieldType> = z.enum([
  "shortAnswer",
  "longAnswer",
  "singleSelect",
  "multiSelect",
  "title",
  "fileUpload",
  "phoneNumber",
  "email",
  "date",
  "dropdown",
]);

export type FormVisibility = "allClients" | "requestedClients";

export const FormVisibilitySchema: z.ZodType<FormVisibility> = z.enum([
  "requestedClients",
  "allClients",
]);

export interface FormField {
  formFieldId?: string;
  hasOtherOption?: boolean;
  isRequired?: boolean;
  multipleChoiceOptions?: string[];
  title?: string;
  type?: FormFieldType;
}

export const FormFieldSchema: z.ZodType<FormField> = z.object({
  formFieldId: z.string().optional(),
  hasOtherOption: z.boolean().optional(),
  isRequired: z.boolean().optional(),
  multipleChoiceOptions: z.array(z.string()).optional(),
  title: z.string().optional(),
  type: FormFieldTypeSchema.optional(),
});

export interface FormFields {
  allowMultipleSubmissions?: boolean;
  formFieldIds?: string[];
  formFields?: FormField[];
  name?: string;
  visibility?: FormVisibility;
}

export const FormFieldsSchema: z.ZodType<FormFields> = z.object({
  allowMultipleSubmissions: z.boolean().optional(),
  formFieldIds: z.array(z.string()).optional(),
  formFields: z.array(FormFieldSchema).optional(),
  name: z.string().optional(),
  visibility: FormVisibilitySchema.optional(),
});

export interface FormAdditionalFields {
  formResponseRequests?: number;
  formResponseSubmissions?: number;
  latestSubmissionDate?: string;
}

export const FormAdditionalFieldsSchema: z.ZodType<FormAdditionalFields> = z.object({
  formResponseRequests: z.number().optional(),
  formResponseSubmissions: z.number().optional(),
  latestSubmissionDate: z.string().optional(),
});

export interface Form {
  additionalFields?: FormAdditionalFields;
  createdAt: string;
  fields?: FormFields;
  id: string;
  latestSubmissionDate?: string | null;
  name?: string;
  object: "form";
  updatedAt?: string;
}

export const FormSchema: z.ZodType<Form> = z.object({
  additionalFields: FormAdditionalFieldsSchema.optional(),
  createdAt: z.iso.datetime(),
  fields: FormFieldsSchema.optional(),
  id: z.string(),
  latestSubmissionDate: z.string().nullable().optional(),
  name: z.string().optional(),
  object: z.literal("form"),
  updatedAt: z.iso.datetime().optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const FormDataResponseSchema: z.ZodType<Form> = FormSchema;
export type FormDataResponse = Form;

export interface FormsDataResponse {
  data: Form[] | null;
  nextToken?: string;
}

export const FormsDataResponseSchema: z.ZodType<FormsDataResponse> = z.object({
  data: z.array(FormSchema).nullable(),
  nextToken: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Request types
// ---------------------------------------------------------------------------

export interface FormCreateRequest {
  additionalFields: FormAdditionalFields;
  fields: FormFields;
}

export const FormCreateRequestSchema: z.ZodType<FormCreateRequest> = z.object({
  additionalFields: FormAdditionalFieldsSchema,
  fields: FormFieldsSchema,
});
