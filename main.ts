// SPDX-License-Identifier: MIT
// Copies POST.json from the repository root to the output directory.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "POST.json");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

const MAX_BYTES = 16384;
const URL_RE = /^https:\/\/(www\.|mobile\.)?(x|twitter)\.com\/[A-Za-z0-9_]{1,15}\/status\/[0-9]+/;

function fail(msg: string): never {
  console.error(`POST.json invalid: ${msg}`);
  process.exit(1);
}

let bytes: Buffer;
try {
  bytes = readFileSync(src);
} catch (err) {
  fail(`cannot read ${src} (${(err as Error).message})`);
}

if (bytes.length > MAX_BYTES) fail(`file is ${bytes.length} bytes, limit is ${MAX_BYTES}`);

let data: unknown;
try {
  data = JSON.parse(bytes.toString("utf8"));
} catch (err) {
  fail(`not valid JSON (${(err as Error).message})`);
}

if (data === null || typeof data !== "object" || Array.isArray(data)) {
  fail("top-level value must be a JSON object");
}

const url = (data as Record<string, unknown>).url;
if (typeof url !== "string") fail('missing string field "url"');
if (!URL_RE.test(url)) {
  fail(`"url" must look like https://x.com/<handle>/status/<id>, got ${JSON.stringify(url)}`);
}
if (/\/status\/0+(?:\D|$)/.test(url) || /PLACEHOLDER/i.test(url)) {
  fail(`"url" is still a placeholder (${url}); paste the real post link`);
}

const dest = join(outDir, "POST.json");
try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(dest, bytes);
} catch (err) {
  fail(`cannot write ${dest} (${(err as Error).message})`);
}
console.log(`ok: ${url}`);
console.log(`copied ${bytes.length} bytes to ${dest}`);
