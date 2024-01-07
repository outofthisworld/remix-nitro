#!/usr/bin/env node
const result = require("node:child_process").spawnSync("pnpm", ["--prefix", __dirname, process.argv[2]], { stdio: "inherit" });

if (result.error) {
  console.error(`Error: ${result.error.message}`);
  process.exit(1);
} else if (result.status !== 0) {
  console.error(`Command failed with exit code ${result.status}`);
  process.exit(result.status);
}
