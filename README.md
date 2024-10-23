# coding

This is a small slide presentation framework to show code snippets in 
a nice and fancy way.

Just change the slides.json to fulfill your needs.

## slides syntax

- title is optional
- subline is optional

```
{
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
    "language": <language. at the moment only swift is supported>
  }
}
```

## upcoming features 

- more slides
- error handling for invalid json configuration
- placement (at the moment all is centered)
- background with gradient presets
- adding images with placement
- more languages (typescript/javascript)
- control panel (refresh, manual mode)
- ...