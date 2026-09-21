---
target: home page hero section and its components
total_score: 13
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 1
p1_count: 2
timestamp: 2026-09-21T07-03-57Z
slug: src-components-home-hero-jsx
---
Method: dual-agent. Home hero critique (code-only, no browser).
Score 13/24 (n/a: 5,7,9,10). Acceptable.
Design specificity: mostly category-interchangeable; maroon brand colour absent from UI; Inter declared but never loaded (detector overused-font x2).
P0 Dead controls: Hero.jsx:256 href="#", Hero.jsx:261 no handler, BuildYourGiftCard.jsx:88 no handler, fields are divs. -> harden
P1 Absolute-positioned islands, min-h-[1200px] at 761-1200, vh offsets. -> adapt
P1 Weak hierarchy: H1 2.25-2.75rem, two competing black pills. -> typeset
P2 Contrast: marquee #a9a49a ~2.2:1, 0.6rem labels. -> audit, colorize
P2 Uncontrollable motion: 2.1s rotation hover-only pause, use-case strip ignores reduced motion. -> animate
