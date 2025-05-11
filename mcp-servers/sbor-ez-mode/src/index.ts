#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "sbor-ez-mode",
  version: "0.1.0",
});

server.tool(
  "generate schema",
  "Generate a schema for a package address on the Radix DLT.",
  {
    packageAddress: z
      .string()
      .describe("The package address to generate a schema for"),
  },
  async ({ packageAddress }) => {
    const result = await fetch(
      "https://schema-gen-silk.vercel.app/api/handler",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://sbor-ez-mode.8arms1goal.com",
          Referer: "https://sbor-ez-mode.8arms1goal.com/",
        },
        body: JSON.stringify({
          package_address: packageAddress,
          module: true,
        }),
      }
    ).then(async (res) => ({
      status: res.status,
      response: await res
        .json()
        .then((data) => (res.status === 200 ? data.schema : data.error))
        .catch(() => "Error parsing JSON response"),
    }));

    return {
      content: [
        {
          type: "text",
          text: result.response,
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("sbor-ez-mode running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
