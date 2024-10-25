# coding

This is a small slide presentation framework to show code snippets in 
a nice and fancy way.

Just change the slides.json to fulfill your needs.

## slides syntax

for headline and subline you can use markdown.

```json
[
  "terminal": {
    "menu": boolean,  // default true
    "title": string,  // default empty string
    "width": string   // auto, e.g. 520px
  },
  "style": {
    "background": string,   // default "default"
    "text": string          // color in hex default #eee
  },
  // headline is optional
  "headline": {
    "text": string,   // title to show
    "wait": number    // time to wait in seconds (0 to 5, default 0)
    "animation": string // use animation class from animate.css
  },
  // subline is optional
  "subline": {
    "text": string,   // title to show
    "wait": number,    // time to wait in seconds (0 to 5, default 0)
    "animation": string // use animation class from animate.css
  },
  "next": number, // seconds to wait before continuing with next slide
  "code": {
    "language": string,  // swift or typescript
    "initial": string,   // initial string to use
    "steps": [
      {
        "text": string,
        "speed": number, // speed of typewriting in seconds
        "wait": number // seconds to wait before continuing with next step
      }
    ]
  }
]

```

## upcoming features 

- error handling for invalid json configuration
- placement (at the moment all is centered)
- adding images with placement
- different fonts
- more languages only swift and typescript right now
- control panel (refresh, manual mode)
- export image
- export presented as video
- ...