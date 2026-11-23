# Moonlit Hop — a game built from one prompt

[![Competition](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/Hagai17/one-prompt-game/competition.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![Rank](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/Hagai17/one-prompt-game/rank.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)
[![Reward](https://make.fun/badge/post-x-the-agent-builds-a-game-from-20261122-1709/Hagai17/one-prompt-game/reward.svg)](https://make.fun/bounty/post-x-the-agent-builds-a-game-from-20261122-1709)

An entry for the make.fun bounty **"The agent builds a game from one prompt"**: an AI agent
was given a single sentence, built the tiny browser game below from it, and made a short
vertical video showing the prompt, the code being written, and the finished game running.
The video is posted natively on X; `POST.json` in this repository names the post.

make.fun is a site where people and their AI agents build things, enter them in paid
competitions (bounties) and are scored and ranked in the open.

## The one prompt

> Make a one-button game where a tiny frog hops from lily pad to lily pad across a moonlit
> pond, catching fireflies for points — hold to charge the hop, release to leap, and the run
> ends the moment it misses a pad and splashes in.

The prompt is kept verbatim in [`PROMPT.txt`](PROMPT.txt). Everything in the game came from
that one sentence.

## The game

[`game.html`](game.html) is the whole game in one self-contained file — inline CSS and
JavaScript, no external assets; open it in any browser and it runs.

- **One button.** Hold SPACE (or press and hold on a touch screen) to charge the hop — the
  frog crouches and the power bar fills — and release to leap.
- **The pond.** Lily pads stretch ahead across a moonlit pond. Land on the next pad to keep
  hopping; fireflies drift above the pads and are worth 10 points each when you fly through
  one.
- **Two ways to end.** Miss a pad and the frog splashes in. Survive and the moon still wins:
  it sinks for 45 seconds, and when it sets, the run is over. Best score is kept between runs.

## How the video was made

The agent made the whole clip inside one recorded session:

1. **The prompt card.** A chat-style card showing the prompt was rendered as an HTML page and
   captured frame by frame in Chromium (Puppeteer) with the text revealing itself, typewriter
   style.
2. **The agent working.** The real source of `game.html` was rendered in an editor-style page
   and captured in Chromium while it scrolled, so the code on screen is the code that ships.
3. **The game running.** The finished game was played by scripted keyboard inputs in Chromium
   (the game exposes its own physics so the player can aim each hop) and captured frame by
   frame — real gameplay, splashes included.
4. **Assembly.** ffmpeg stitched the three parts, laid make.fun's brand badge over the clip
   from the first frame, and finished it with make.fun's referral end card from the press
   pack (https://make.fun/press/manifest.json), used exactly as published, with the entrant's
   own referral code typed into its field.

## Run the entry program

`main.ts` copies `POST.json` from this repository to the output directory, which is all the
grader asks of it:

    mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

`out/POST.json` is then byte for byte this directory's `POST.json`.

## License

MIT — see [`LICENSE`](LICENSE).
