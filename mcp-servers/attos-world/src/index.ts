#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fetchPools } from "./services/attos-earn-api";

// Create server instance
const server = new McpServer({
  name: "attos-world",
  version: "0.1.0",
});

server.tool(
  "get-attos-earn-pools",
  "get a list of liquidity pools with APY yield opportunities on Radix DLT Network",
  {},
  async () => {
    const pools = await fetchPools();

    // Sort pools by TVL and APY (bonus_24h) in descending order
    const sortedPools = pools
      .sort((a, b) => {
        // First sort by TVL
        const tvlDiff = b.tvl - a.tvl;
        if (Math.abs(tvlDiff) > 0.01) {
          // Using a small threshold for floating point comparison
          return tvlDiff;
        }
        // If TVL is approximately equal, sort by APY (bonus_24h)
        return b.bonus_24h - a.bonus_24h;
      })
      .slice(0, 25); // Get only the top 25 pools

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(sortedPools, null, 2),
        },
      ],
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Radix MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
