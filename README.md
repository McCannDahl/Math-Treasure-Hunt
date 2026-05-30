# Math Treasure Hunt

A simple HTML/JavaScript treasure hunt game for young kids (ages ~4–6).

Each of the 10 clues shows a picture of where to look next, asks the
child to enter a password (written on a sticky note hidden at that
spot), and to answer two single-digit addition/subtraction problems.
Get all three right and the next clue appears.

## How to run

Just open `index.html` in any modern browser — no build step or server
required. (Some browsers won't load local images via `file://`; if your
pictures don't appear, run a tiny static server, e.g.
`python -m http.server` from this folder, then open
<http://localhost:8000>.)

## How to customize

Open `game.js` and edit the `CLUES` array:

- `image` — path to the picture for that clue (drop files into `images/`).
- `password` — what the child types after finding the sticky note (case-insensitive).
- `math` — two `{ question, answer }` pairs. Keep them single-digit add/subtract.

Add or remove clues freely — the game uses `CLUES.length` for progress.

## Default passwords

For convenience the clues come pre-loaded with these passwords so you
can print sticky notes right away:

1. CAT
2. DOG
3. SUN
4. MOON
5. STAR
6. FISH
7. BIRD
8. TREE
9. BOOK
10. CAKE
