import { paginate } from "src/lib/pagination";
import type { ListArgs } from "src/lib/pagination";
import { buildSearchParams } from "src/transport/build-search-params";
import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import { TaskCommentResponseSchema, TaskCommentsResponseSchema } from "./schema";
import type { TaskComment, TaskCommentsResponse } from "./schema";

export interface ListTaskCommentsArgs extends ListArgs {
  taskId?: string;
}

export class TaskCommentsResource {
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

  /** List task comments, optionally scoped to a single task. */
  async list(args: ListTaskCommentsArgs = {}): Promise<TaskCommentsResponse> {
    const raw: unknown = await this.#transport.get("v1/comments", {
      searchParams: buildSearchParams(args),
    });
    return parseResponse({
      schema: TaskCommentsResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Retrieve a single task comment by ID. */
  async retrieve(commentId: string): Promise<TaskComment> {
    const raw: unknown = await this.#transport.get(`v1/comments/${commentId}`);
    return parseResponse({
      schema: TaskCommentResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Delete a task comment by ID. */
  async delete(commentId: string): Promise<void> {
    await this.#transport.delete(`v1/comments/${commentId}`);
  }

  /** Iterate over all task comments, automatically paginating. Default limit per page: 500. */
  async listAll(args: Omit<ListTaskCommentsArgs, "nextToken"> = {}): Promise<TaskComment[]> {
    return paginate((listArgs) => this.list({ ...args, ...listArgs }), {
      limit: args.limit ?? 500,
    });
  }
}
