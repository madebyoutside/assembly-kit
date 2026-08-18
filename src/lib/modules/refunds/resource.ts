import { paginate } from "src/lib/pagination";
import type { ListArgs } from "src/lib/pagination";
import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { RefundResponseSchema, RefundsResponseSchema } from "./schema";
import type { Refund, RefundCreateRequest, RefundsResponse } from "./schema";

export interface ListRefundsArgs extends ListArgs {
  invoiceId: string;
}

export class RefundsResource {
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

  /** Issue a refund against a paid invoice. */
  async create(body: RefundCreateRequest): Promise<Refund> {
    const raw: unknown = await this.#transport.post("v1/refunds", body);
    return parseResponse({ schema: RefundResponseSchema, data: raw, validate: this.#validate });
  }

  /** List the refunds issued against an invoice. */
  async list(args: ListRefundsArgs): Promise<RefundsResponse> {
    const raw: unknown = await this.#transport.get("v1/refunds", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({ schema: RefundsResponseSchema, data: raw, validate: this.#validate });
  }

  /** Iterate over all refunds for an invoice, automatically paginating. Default limit per page: 500. */
  async listAll(args: Omit<ListRefundsArgs, "nextToken">): Promise<Refund[]> {
    return paginate((listArgs) => this.list({ ...args, ...listArgs }), {
      limit: args.limit ?? 500,
    });
  }
}
