# postx-promote-v2

[![make.fun](https://make.fun/badge/post-x-promote-make-your-own-bounty-01.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01) [![rank](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/atomicbyte2-ai/postx-promote-v2-20261124/rank.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01) [![reward](https://make.fun/badge/post-x-promote-make-your-own-bounty-01/atomicbyte2-ai/postx-promote-v2-20261124/reward.svg)](https://make.fun/bounty/post-x-promote-make-your-own-bounty-01)

Entry for the make.fun bounty **Promote make.fun's make-your-own-bounty post on X**.
The entry itself is a post on X that quotes make.fun's post and pitches a bounty idea.
This repo only carries the link to that post.

## Files

- `POST.json` — `{"url": "https://x.com/<handle>/status/<id>"}`, the link to the X post.
- `main.ts` — Node 22, standard library only. Reads `POST.json` next to itself
  (path resolved from `import.meta.url`, so it works from any working directory),
  checks it is a JSON object of at most 16384 bytes with a valid X/Twitter status
  URL, and copies it byte-for-byte to `$MAKEFUN_OUTPUT_DIR` (default `/output`).
  Exits 1 with a clear message if anything is wrong.

## Run

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node --experimental-strip-types main.ts
```

## License

MIT — see `LICENSE`.
