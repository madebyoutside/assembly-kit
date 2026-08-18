import { paginate } from "src/lib/pagination";
import type { ListArgs } from "src/lib/pagination";
import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { FormResponsesResponseSchema } from "../form-responses/schema";
import type { FormResponse, FormResponsesResponse } from "../form-responses/schema";

import { FormDataResponseSchema, FormsDataResponseSchema } from "./schema";
import type { Form, FormCreateRequest, FormsDataResponse } from "./schema";

export interface ListFormSubmissionsArgs extends ListArgs {
  status?: "completed" | "pending";
}

export class FormsResource {
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

  /** Create a form with its questions. */
  async create(body: FormCreateRequest): Promise<Form> {
    const raw: unknown = await this.#transport.post("v1/forms", body);
    return parseResponse({ schema: FormDataResponseSchema, data: raw, validate: this.#validate });
  }

  /** List forms. */
  async list(args: ListArgs = {}): Promise<FormsDataResponse> {
    const raw: unknown = await this.#transport.get("v1/forms", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({ schema: FormsDataResponseSchema, data: raw, validate: this.#validate });
  }

  /** Retrieve a single form by ID. */
  async retrieve(id: string): Promise<Form> {
    const raw: unknown = await this.#transport.get(`v1/forms/${id}`);
    return parseResponse({ schema: FormDataResponseSchema, data: raw, validate: this.#validate });
  }

  /** List a form's submissions (form responses). */
  async listSubmissions(
    args: ListFormSubmissionsArgs & { id: string },
  ): Promise<FormResponsesResponse> {
    const { id, ...filters } = args;
    const raw: unknown = await this.#transport.get(`v1/forms/${id}/form-responses`, {
      searchParams: buildSearchParams(filters),
    });
    return parseResponse({
      schema: FormResponsesResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Iterate over all of a form's submissions, automatically paginating. Default limit per page: 500. */
  async listAllSubmissions(
    args: Omit<ListFormSubmissionsArgs, "nextToken"> & { id: string },
  ): Promise<FormResponse[]> {
    return paginate((listArgs) => this.listSubmissions({ ...args, ...listArgs }), {
      limit: args.limit ?? 500,
    });
  }

  /** Iterate over all forms, automatically paginating. Default limit per page: 500. */
  async listAll(args: Omit<ListArgs, "nextToken"> = {}): Promise<Form[]> {
    return paginate((listArgs) => this.list({ ...args, ...listArgs }), {
      limit: args.limit ?? 500,
    });
  }
}
