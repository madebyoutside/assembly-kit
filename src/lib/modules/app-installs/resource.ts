import type { Transport } from "src/transport/http";
import { parseResponse } from "src/transport/parse-response";

import {
  AppInstallResponseSchema,
  AppInstallsResponseSchema,
  AppNotificationSettingsResponseSchema,
} from "./schema";
import type {
  AppInstall,
  AppInstallsResponse,
  AppNotificationSettingsCreateRequest,
  AppNotificationSettingsResponse,
  AppNotificationSettingsUpdateRequest,
} from "./schema";

export class AppInstallsResource {
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

  /** List all app installs. */
  async list(): Promise<AppInstallsResponse> {
    const raw: unknown = await this.#transport.get("v1/installs");
    return parseResponse({
      schema: AppInstallsResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Retrieve a single app install by ID. */
  async retrieve(installId: string): Promise<AppInstall> {
    const raw: unknown = await this.#transport.get(`v1/installs/${installId}`);
    return parseResponse({ schema: AppInstallResponseSchema, data: raw, validate: this.#validate });
  }

  /** Retrieve the notification settings the install's backing app declares. */
  async retrieveNotificationSettings(installId: string): Promise<AppNotificationSettingsResponse> {
    const raw: unknown = await this.#transport.get(
      `v1/installs/${installId}/notification-settings`,
    );
    return parseResponse({
      schema: AppNotificationSettingsResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Declare the initial notification settings of the install's backing app. Create-only — fails with 409 when settings already exist. */
  async createNotificationSettings(args: {
    installId: string;
    body: AppNotificationSettingsCreateRequest;
  }): Promise<AppNotificationSettingsResponse> {
    const raw: unknown = await this.#transport.post(
      `v1/installs/${args.installId}/notification-settings`,
      args.body,
    );
    return parseResponse({
      schema: AppNotificationSettingsResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }

  /** Apply partial changes to the notification settings of the install's backing app. */
  async updateNotificationSettings(args: {
    installId: string;
    body: AppNotificationSettingsUpdateRequest;
  }): Promise<AppNotificationSettingsResponse> {
    const raw: unknown = await this.#transport.patch(
      `v1/installs/${args.installId}/notification-settings`,
      args.body,
    );
    return parseResponse({
      schema: AppNotificationSettingsResponseSchema,
      data: raw,
      validate: this.#validate,
    });
  }
}
