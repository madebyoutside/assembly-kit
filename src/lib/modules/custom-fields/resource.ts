import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import {
  CreatedCustomFieldSchema,
  CustomFieldsCreateResponseSchema,
  ListCustomFieldResponseSchema,
} from "./schema";
import type {
  CreatedCustomField,
  CustomFieldUpdateRequest,
  CustomFieldsCreateRequest,
  CustomFieldsCreateResponse,
  ListCustomFieldResponse,
} from "./schema";

export class CustomFieldsResource {
  readonly #transport: Transport;
  readonly #validate: boolean;

  constructor({
    transport,
    validateResponses,
  }: {
    transport: Transport;
    validateResponses: boolean;
  }) {
    this.#transport = transport;
    this.#validate = validateResponses;
  }

  /** Create one or more custom fields. */
  async create(body: CustomFieldsCreateRequest): Promise<CustomFieldsCreateResponse> {
    const raw = await this.#transport.post<unknown>("v1/custom-fields", body);
    return parseResponse({
      schema: CustomFieldsCreateResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Rename a custom field and/or replace the option set of a `select` or `multiSelect` field. */
  async update(args: { id: string; body: CustomFieldUpdateRequest }): Promise<CreatedCustomField> {
    const raw = await this.#transport.patch<unknown>(`v1/custom-fields/${args.id}`, args.body);
    // ponytail: lenient on `object` like create, since the write endpoints have omitted it before
    return parseResponse({ schema: CreatedCustomFieldSchema, data: raw, validate: this.#validate });
  }

  /** Delete a custom field definition by ID. */
  async delete(id: string): Promise<void> {
    await this.#transport.delete(`v1/custom-fields/${id}`);
  }

  /** List custom fields with optional entity type filter. */
  async list(args: { entityType?: string } = {}): Promise<ListCustomFieldResponse> {
    const raw = await this.#transport.get<unknown>("v1/custom-fields", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({
      schema: ListCustomFieldResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }
}
