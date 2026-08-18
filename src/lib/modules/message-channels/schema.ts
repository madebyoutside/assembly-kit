import { MembershipTypeSchema } from "src/schemas/shared/membership-type";
import type { MembershipType } from "src/schemas/shared/membership-type";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Base types
// ---------------------------------------------------------------------------

export interface MessageChannel {
  clientId?: string | null;
  companyId?: string | null;
  createdAt: string;
  id: string;
  lastMessageDate?: string | null;
  /** Populated by `listUnread()`; omitted otherwise. */
  lastRead?: string;
  memberIds?: string[];
  /** @deprecated Use `clientId`/`companyId` instead. */
  membershipEntityId?: string;
  membershipType: MembershipType;
  object: "messageChannel";
  /** Populated by `listUnread()`; omitted otherwise. */
  unreadCount?: number;
  updatedAt?: string;
}

export const MessageChannelSchema: z.ZodType<MessageChannel> = z.object({
  clientId: z.string().nullable().optional(),
  companyId: z.string().nullable().optional(),
  createdAt: z.iso.datetime(),
  id: z.string(),
  lastMessageDate: z.string().nullable().optional(),
  lastRead: z.string().optional(),
  memberIds: z.array(z.string()).optional(),
  membershipEntityId: z.string().optional(),
  membershipType: MembershipTypeSchema,
  object: z.literal("messageChannel"),
  unreadCount: z.number().optional(),
  updatedAt: z.iso.datetime().optional(),
});

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export const MessageChannelResponseSchema: z.ZodType<MessageChannel> = MessageChannelSchema;
export type MessageChannelResponse = MessageChannel;

export interface MessageChannelsResponse {
  data: MessageChannel[] | null;
  nextToken?: string;
}

export const MessageChannelsResponseSchema: z.ZodType<MessageChannelsResponse> = z.object({
  data: z.array(MessageChannelSchema).nullable(),
  nextToken: z.string().optional(),
});

export interface UnreadMessageChannelsResponse {
  totalUnreadCount?: number;
  unreadChannels?: MessageChannel[];
}

export const UnreadMessageChannelsResponseSchema: z.ZodType<UnreadMessageChannelsResponse> =
  z.object({
    totalUnreadCount: z.number().optional(),
    unreadChannels: z.array(MessageChannelSchema).optional(),
  });

// ---------------------------------------------------------------------------
// Request types
// ---------------------------------------------------------------------------

export interface MessageChannelCreateRequest {
  clientId?: string;
  companyId?: string;
  memberIds?: string[];
  membershipType: MembershipType;
}

export const MessageChannelCreateRequestSchema: z.ZodType<MessageChannelCreateRequest> = z.object({
  clientId: z.string().optional(),
  companyId: z.string().optional(),
  memberIds: z.array(z.string()).optional(),
  membershipType: MembershipTypeSchema,
});
