# coding

This is a small slide presentation framework to show code snippets in 
a nice and fancy way.

Just change the slides.json to fulfill your needs.

## slides syntax

- title is optional
- subline is optional
- code typewriting code snippet

```json
{
  "window": {
    "menu": <true or false to show buttons>,
    "title": <window title>
  },
  "title": {
    "text": <markdown string here>,
    "delay": <seconds in the range from 1 to 5>,
    "animation": <animation class from animate.css>
  },
  "subline": {
    "text": <markdown string here>,
    "delay": <seconds in the range from 1 to 5>,
    "animation": <animation class from animate.css>
  },
  "code": {
    "text": <your code snippet. you can use source-to-string.js for JSON string>
    "language": <language. at the moment only swift is supported>,
    "code": <milliseconds between type writing>
  },
  "style": {
    "background": <background from preset>,
    "text": <hex value of color for text>
  }
}
```

## upcoming features 

- more slides: next with delay
- error handling for invalid json configuration
- placement (at the moment all is centered)
- min-width of terminal
- adding images with placement
- more languages (typescript/javascript)
- control panel (refresh, manual mode)
- ...