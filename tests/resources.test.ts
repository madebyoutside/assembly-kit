import { beforeEach, describe, expect, it } from "vite-plus/test";

import { createAssemblyKit } from "src/client";
import type { AssemblyKit } from "src/client";

interface Call {
  body: unknown;
  method: string;
  url: string;
}

let calls: Call[];
let kit: AssemblyKit;

const jsonBody = (request: Request): Promise<unknown> =>
  request
    .clone()
    .text()
    .then((text) => (text ? JSON.parse(text) : undefined));

beforeEach(() => {
  calls = [];
  kit = createAssemblyKit({
    apiKey: "test-key",
    workspaceId: "ws-1",
    validateResponses: false,
    retryCount: 0,
    fetch: async (input, init) => {
      const request = new Request(input as Request | string, init);
      calls.push({
        body: await jsonBody(request),
        method: request.method,
        url: request.url,
      });
      return new Response("{}", {
        headers: { "content-type": "application/json" },
        status: 200,
      });
    },
  });
});

const lastCall = (): Call => {
  const call = calls.at(-1);
  if (!call) throw new Error("no request was made");
  return call;
};

const lastPath = (): string => new URL(lastCall().url).pathname;

const lastQuery = (): URLSearchParams => new URL(lastCall().url).searchParams;

describe("newly added endpoints", () => {
  it("clients.retrieveWithAppVisibility", async () => {
    await kit.clients.retrieveWithAppVisibility("cl-1");
    expect(lastCall().method).toBe("GET");
    expect(lastPath()).toBe("/v1/clients/cl-1/app-visibility");
  });

  it("companies.addClients", async () => {
    await kit.companies.addClients({
      id: "co-1",
      clientIds: ["cl-1", "cl-2"],
      confirmPromotePlaceholder: true,
    });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/companies/co-1/clients");
    expect(lastQuery().get("confirmPromotePlaceholder")).toBe("true");
    expect(lastCall().body).toEqual({ clientIds: ["cl-1", "cl-2"] });
  });

  it("internalUsers.update", async () => {
    await kit.internalUsers.update({
      id: "iu-1",
      body: { isClientAccessLimited: true, companyAccessList: ["co-1"] },
    });
    expect(lastCall().method).toBe("PATCH");
    expect(lastPath()).toBe("/v1/internal-users/iu-1");
    expect(lastCall().body).toEqual({
      isClientAccessLimited: true,
      companyAccessList: ["co-1"],
    });
  });

  it("internalUsers.retrieveNotificationSettings", async () => {
    await kit.internalUsers.retrieveNotificationSettings("iu-1");
    expect(lastPath()).toBe("/v1/internal-users/iu-1/notification-settings");
  });

  it("me.retrieve", async () => {
    await kit.me.retrieve();
    expect(lastCall().method).toBe("GET");
    expect(lastPath()).toBe("/v1/me");
  });

  it("customFields.create", async () => {
    await kit.customFields.create({
      customFields: [{ entityType: "client", name: "Tier", type: "text" }],
    });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/custom-fields");
  });

  it("forms.create", async () => {
    await kit.forms.create({ additionalFields: {}, fields: { name: "Intake" } });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/forms");
    expect(lastCall().body).toEqual({ additionalFields: {}, fields: { name: "Intake" } });
  });

  it("forms.listSubmissions", async () => {
    await kit.forms.listSubmissions({ id: "fm-1", status: "completed" });
    expect(lastPath()).toBe("/v1/forms/fm-1/form-responses");
    expect(lastQuery().get("status")).toBe("completed");
  });

  it("products.create", async () => {
    await kit.products.create({ name: "Retainer" });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/products");
  });

  it("prices.create", async () => {
    await kit.prices.create({ amount: 5000, productId: "pr-1", type: "recurring" });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/prices");
  });

  it("refunds.create and refunds.list", async () => {
    await kit.refunds.create({ invoiceId: "in-1" });
    expect(lastCall().method).toBe("POST");
    expect(lastPath()).toBe("/v1/refunds");

    await kit.refunds.list({ invoiceId: "in-1" });
    expect(lastCall().method).toBe("GET");
    expect(lastQuery().get("invoiceId")).toBe("in-1");
  });

  it("messageChannels.listUnread", async () => {
    await kit.messageChannels.listUnread({ userId: "u-1" });
    expect(lastPath()).toBe("/v1/message-channels/unread");
    expect(lastQuery().get("userId")).toBe("u-1");
  });

  it("notifications.retrieve", async () => {
    await kit.notifications.retrieve("nt-1");
    expect(lastCall().method).toBe("GET");
    expect(lastPath()).toBe("/v1/notifications/nt-1");
  });

  it("taskComments.list, retrieve, delete", async () => {
    await kit.taskComments.list({ taskId: "tk-1" });
    expect(lastPath()).toBe("/v1/comments");
    expect(lastQuery().get("taskId")).toBe("tk-1");

    await kit.taskComments.retrieve("cm-1");
    expect(lastPath()).toBe("/v1/comments/cm-1");

    await kit.taskComments.delete("cm-1");
    expect(lastCall().method).toBe("DELETE");
    expect(lastPath()).toBe("/v1/comments/cm-1");
  });

  it("files.retrieveDownloadUrl", async () => {
    await kit.files.retrieveDownloadUrl("fl-1");
    expect(lastPath()).toBe("/v1/files/fl-1/download-url");
  });

  it("files.download returns raw bytes", async () => {
    const bytes = await kit.files.download("fl-1");
    expect(lastPath()).toBe("/v1/files/fl-1/download");
    expect(bytes).toBeInstanceOf(ArrayBuffer);
  });

  it("files.updateFolderPermissions", async () => {
    await kit.files.updateFolderPermissions({ id: "fl-1", clientPermissions: "read_only" });
    expect(lastCall().method).toBe("PUT");
    expect(lastPath()).toBe("/v1/files/fl-1/permissions/");
    expect(lastCall().body).toEqual({ clientPermissions: "read_only" });
  });

  it("files.updateRootFolderPermissions", async () => {
    await kit.files.updateRootFolderPermissions({
      channelId: "ch-1",
      clientPermissions: "read_write",
    });
    expect(lastCall().method).toBe("PUT");
    expect(lastPath()).toBe("/v1/files/root/permissions");
    expect(lastCall().body).toEqual({ channelId: "ch-1", clientPermissions: "read_write" });
  });

  it("appInstalls notification settings: get, create, update", async () => {
    await kit.appInstalls.retrieveNotificationSettings("ai-1");
    expect(lastCall().method).toBe("GET");
    expect(lastPath()).toBe("/v1/installs/ai-1/notification-settings");

    await kit.appInstalls.createNotificationSettings({
      installId: "ai-1",
      body: { notifications: [{ label: "New thing", surfaces: ["product"] }] },
    });
    expect(lastCall().method).toBe("POST");

    await kit.appInstalls.updateNotificationSettings({
      installId: "ai-1",
      body: { notifications: [{ id: "ns-1" }] },
    });
    expect(lastCall().method).toBe("PATCH");
  });
});
