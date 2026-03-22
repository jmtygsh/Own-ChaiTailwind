# ChaiTailwind - Runtime CSS Framework

A lightweight, client-side utility-first CSS framework that mimics Tailwind CSS. ChaiTailwind parses utility classes at runtime and applies CSS dynamically—no build step required.


## 🎯 How It Works

### The Approach

**Three-Step Process:**

1. **Detection** — Find all HTML elements with `chai-` classes using CSS attribute selectors
2. **Parsing** — Extract token (p, bg, text, etc.) and value (4, red, center, etc.) from each class
3. **Application** — Look up configuration maps and apply corresponding CSS styles via JavaScript


**Example breakdown:**
```html
<!-- Parse as: token="p", value="4" -->
<div class="chai-p-4">8px padding</div>

<!-- Parse as: token="bg", value="red" -->
<div class="chai-bg-red">Red background</div>

<!-- Parse as: token="text", value="center" -->
<div class="chai-text-center">Centered text</div>

<!-- Custom value support -->
<div class="chai-[padding:20px]">Custom CSS</div>
```

### Configuration Maps

Everything is driven by lookup tables in `value.js`:

```javascript
spacingMap = {
  p: ["padding"],           // Single property
  px: ["padding-left", "padding-right"],  // Multiple properties
  m: ["margin"],
  // ...
}

displayMap = {
  flex: "flex",
  grid: "grid",
  block: "block",
  // ...
}

```


