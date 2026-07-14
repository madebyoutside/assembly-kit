import { paginate } from "src/lib/pagination";
import type { ListArgs } from "src/lib/pagination";
import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { CompaniesResponseSchema, CompanyResponseSchema } from "./schema";
import type {
  CompaniesResponse,
  Company,
  CompanyCreateRequest,
  CompanyUpdateRequest,
} from "./schema";

export interface ListCompaniesArgs extends ListArgs {
  isPlaceholder?: boolean;
  name?: string;
}

export class CompaniesResource<
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

  /** Create a new company. */
  async create(body: CompanyCreateRequest): Promise<Company<TCustomFields>> {
    const raw: unknown = await this.#transport.post("v1/companies", body);
    return parseResponse({
      schema: CompanyResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Company<TCustomFields>;
  }

  /** List companies with optional filters. */
  async list(args: ListCompaniesArgs = {}): Promise<CompaniesResponse<TCustomFields>> {
    const raw: unknown = await this.#transport.get("v1/companies", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({
      schema: CompaniesResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as CompaniesResponse<TCustomFields>;
  }

  /** Retrieve a single company by ID. */
  async retrieve(id: string): Promise<Company<TCustomFields>> {
    const raw: unknown = await this.#transport.get(`v1/companies/${id}`);
    return parseResponse({
      schema: CompanyResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Company<TCustomFields>;
  }

  /** Update a company. */
  async update(args: { id: string; body: CompanyUpdateRequest }): Promise<Company<TCustomFields>> {
    const raw: unknown = await this.#transport.patch(`v1/companies/${args.id}`, args.body);
    return parseResponse({
      schema: CompanyResponseSchema,
      data: raw,
      validate: this.#validate,
    }) as Company<TCustomFields>;
  }

  /** Delete a company by ID. */
  async delete(id: string): Promise<void> {
    await this.#transport.delete(`v1/companies/${id}`);
  }

  /** Iterate over all companies, automatically paginating. Default limit per page: 10000. */
  async listAll(
    args: Omit<ListCompaniesArgs, "nextToken"> = {},
  ): Promise<Company<TCustomFields>[]> {
    return paginate<Company<TCustomFields>>((listArgs) => this.list({ ...args, ...listArgs }), {
      limit: args.limit ?? 10_000,
    });
  }
}
