import { paginate } from "src/lib/pagination";
import type { ListArgs } from "src/lib/pagination";
import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { ClientResponseSchema, ClientsResponseSchema } from "./schema";
import type { Client, ClientCreateRequest, ClientUpdateRequest, ClientsResponse } from "./schema";

export interface ListClientsArgs extends ListArgs {
  companyId?: string;
  email?: string;
  familyName?: string;
  givenName?: string;
}

export class ClientsResource<
  TCustomFields extends Record<string, unknown> = Record<string, unknown>,
> {
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

  /** Create a new client. */
  async create(args: {
    body: ClientCreateRequest;
    sendInvite?: boolean;
  }): Promise<Client<TCustomFields>> {
    const searchParams =
      args.sendInvite !== undefined
        ? buildSearchParams({ sendInvite: args.sendInvite })
        : undefined;
    const raw: unknown = await this.#transport.post("v1/clients", args.body, { searchParams });
    return parseResponse({
      schema: ClientResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Client<TCustomFields>;
  }

  /** List clients with optional filters. */
  async list(args: ListClientsArgs = {}): Promise<ClientsResponse<TCustomFields>> {
    const raw: unknown = await this.#transport.get("v1/clients", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({
      schema: ClientsResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as ClientsResponse<TCustomFields>;
  }

  /** Retrieve a single client by ID. */
  async retrieve(id: string): Promise<Client<TCustomFields>> {
    const raw: unknown = await this.#transport.get(`v1/clients/${id}`);
    return parseResponse({
      schema: ClientResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Client<TCustomFields>;
  }

  /** Update a client (PATCH — partial update). */
  async update(args: {
    id: string;
    body: ClientUpdateRequest;
    sendInvite?: boolean;
  }): Promise<Client<TCustomFields>> {
    const searchParams =
      args.sendInvite !== undefined
        ? buildSearchParams({ sendInvite: args.sendInvite })
        : undefined;
    const raw: unknown = await this.#transport.patch(`v1/clients/${args.id}`, args.body, {
      searchParams,
    });
    return parseResponse({
      schema: ClientResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Client<TCustomFields>;
  }

  /** Delete a client by ID. */
  async delete(id: string): Promise<void> {
    await this.#transport.delete(`v1/clients/${id}`);
  }

  /** Iterate over all clients, automatically paginating. Default limit per page: 5000. */
  async listAll(args: Omit<ListClientsArgs, "nextToken"> = {}): Promise<Client<TCustomFields>[]> {
    return paginate<Client<TCustomFields>>((listArgs) => this.list({ ...args, ...listArgs }), {
      limit: args.limit ?? 5_000,
    });
  }
}
