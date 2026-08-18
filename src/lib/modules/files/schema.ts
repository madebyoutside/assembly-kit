import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export type FileType = "file" | "folder" | "link";

export const FileTypeSchema: z.ZodType<FileType> = z.enum(["file", "folder", "link"]);

export interface AssemblyFile {
  channelId?: string;
  createdAt: string;
  fileType?: FileType;
  id: string;
  name?: string;
  object: "file";
  path?: string;
  updatedAt?: string;
  url?: string;
}

export const AssemblyFileSchema: z.ZodType<AssemblyFile> = z.object({
  channelId: z.string().optional(),
  createdAt: z.iso.datetime(),
  fileType: FileTypeSchema.optional(),
  id: z.string(),
  name: z.string().optional(),
  object: z.literal("file"),
  path: z.string().optional(),
  updatedAt: z.iso.datetime().optional(),
  url: z.string().optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const AssemblyFileResponseSchema: z.ZodType<AssemblyFile> = AssemblyFileSchema;
export type AssemblyFileResponse = AssemblyFile;

export interface AssemblyFilesResponse {
  data: AssemblyFile[] | null;
  nextToken?: string;
}

export const AssemblyFilesResponseSchema: z.ZodType<AssemblyFilesResponse> = z.object({
  data: z.array(AssemblyFileSchema).nullable(),
  nextToken: z.string().optional(),
});

// ─── Permissions ──────────────────────────────────────────────────────────────

export type ClientPermissions = "read_only" | "read_write";

/**
 * The OpenAPI spec declares this enum as the single string "read_only read_write";
 * the two documented values are modelled separately here.
 */
export const ClientPermissionsSchema: z.ZodType<ClientPermissions> = z.enum([
  "read_only",
  "read_write",
]);

export interface FilePermissionsResponse {
  success?: boolean;
}

export const FilePermissionsResponseSchema: z.ZodType<FilePermissionsResponse> = z.object({
  success: z.boolean().optional(),
});

// ─── Download ─────────────────────────────────────────────────────────────────

export interface FileDownloadUrlResponse {
  downloadUrl: string;
}

export const FileDownloadUrlResponseSchema: z.ZodType<FileDownloadUrlResponse> = z.object({
  downloadUrl: z.string(),
});
