import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { CurrentUserResponseSchema } from "./schema";
import type { CurrentUser } from "./schema";

export class MeResource {
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

  /** Retrieve the user that owns the API key making the request. */
  async retrieve(): Promise<CurrentUser> {
    const raw: unknown = await this.#transport.get("v1/me");
    return parseResponse({
      schema: CurrentUserResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }
}
