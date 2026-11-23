// Moonlit Hop — make.fun entry program (Node 22, standard library only).
//
// The entry itself is a post on X: a short video of an AI agent building the
// game in game.html from the single prompt in PROMPT.txt, ending with
// make.fun's referral end card. This program's whole job is to hand the
// post's address to the grader: it copies POST.json from the repository
// root into the output directory, byte for byte, and prints nothing.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(botDir, 'POST.json');
const target = join(outputDir, 'POST.json');

// Fail loudly on a malformed POST.json instead of handing the grader a file
// it can only refuse: the url must at least parse and carry a string url.
let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`POST.json in ${botDir} is not readable JSON: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof (parsed as { url?: unknown })?.url !== 'string') {
  console.error('POST.json must be a JSON object with a string "url"');
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
try {
  copyFileSync(source, target);
} catch (err) {
  console.error(`could not copy POST.json from ${botDir}: ${(err as Error).message}`);
  process.exit(1);
}
