import { chaiValues } from "./value.js";
import { color, custom } from "./helpers/index.js";

const {
  spacing,
  fontSize,
  namedColors,
  spacingMap,
  displayMap,
  alignItemsMap,
  justifyContentMap,
  textAlignMap,
  borderRadiusMap,
  fontWeightMap,
  sizeMap,
} = chaiValues; // Pull shared config maps from value.js

function setStyles(el, properties, value) {
  const styleProperties = Array.isArray(properties) ? properties : [properties];
  styleProperties.forEach((property) => {
    if (property.includes("-")) {
      el.style.setProperty(property, value);
    } else {
      el.style[property] = value;
    }
  });
  return true;
}

function setBorderStyle(el) {
  return setStyles(el, "border-style", "solid");
}

// Main parser entry per class
function applyStyle(el, cls) {
  if (!cls.startsWith("chai-")) { // Ignore classes not starting with chai-
    return false;
  }

  const utility = cls.slice(5); // Remove chai- prefix (e.g. p-2, bg-red)
  const parts = utility.split("-"); // Split utility into pieces return new array

  const token = parts[0]; // First part is token (p, bg, text, etc.)
  const value = parts.slice(1).join("-"); // Remaining parts are the value


  if ((value.includes("[") && value.includes("]")) || (token.includes("[") && token.includes("]"))) {
    const { token: customToken, value: customValue } = custom(utility);

    // for single custom value without token 
    const [customProperty, ...customValueParts] = customValue.split(":");

    const parsedProperty = customProperty?.trim();
    const parsedValue = customValueParts.join(":").trim();

    if (parsedProperty && parsedValue) {
      return setStyles(el, parsedProperty, parsedValue);
    }

    if (spacingMap[customToken]) {
      return setStyles(el, spacingMap[customToken], customValue);
    }
    if (customToken === "bg") {
      return setStyles(el, "background-color", customValue);
    }
    if (customToken === "border") {
      setBorderStyle(el);
      return setStyles(el, "border-color", customValue);
    }
    if (customToken === "text") {
      return setStyles(el, "color", customValue);
    }
    if (customToken === "rounded") {
      return setStyles(el, "border-radius", customValue);
    }
    return setStyles(el, customToken, customValue);
  }


  // size like width, height 
  if (sizeMap[utility]) {
    // "h-screen": { property: "height", value: "100vh" },
    const { property, value } = sizeMap[utility];
    return setStyles(el, property, value);
  }

  // spacing like pedding, margin
  if (spacingMap[token]) {
    const spacingValue = spacing[value];
    if (!spacingValue) return false;
    return setStyles(el, spacingMap[token], spacingValue);
  }

  // display like block, inline, flex, grid, hidden
  if (displayMap[token]) {
    return setStyles(el, "display", displayMap[token]);
  }

  if (token === "items") {
    const alignValue = alignItemsMap[value];
    if (!alignValue) return false;
    return setStyles(el, "align-items", alignValue);
  }

  if (token === "justify") {
    if (!justifyContentMap[value]) return false;
    return setStyles(el, "justify-content", justifyContentMap[value]);
  }

  if (token === "text") {
    if (value.includes("/")) {
      const [colorName, opacity] = value.split("/");
      const colorValue = color(colorName, opacity);
      if (colorValue === colorName) return false;
      return setStyles(el, "color", colorValue);
    }
    if (namedColors[value]) {
      return setStyles(el, "color", namedColors[value]);
    }
    if (fontSize[value]) {
      return setStyles(el, "font-size", fontSize[value]);
    }
    if (textAlignMap[value]) {
      return setStyles(el, "text-align", textAlignMap[value]);
    }
    return false;
  }

  if (token === "bg") {
    if (value.includes("/")) {
      const [colorName, opacity] = value.split("/");
      const colorValue = color(colorName, opacity);
      if (colorValue === colorName) return false;

      return setStyles(el, "background-color", colorValue);
    }
    if (namedColors[value]) {
      return setStyles(el, "background-color", namedColors[value]);
    }
    return false;
  }

  if (token === "border") {
    if (!value) {
      setBorderStyle(el);
      return setStyles(el, "border-width", "1px");
    }
    if (value.includes("/")) {
      const [colorName, opacity] = value.split("/");
      const colorValue = color(colorName, opacity);
      if (colorValue === colorName) return false;
      setBorderStyle(el);
      return setStyles(el, "border-color", colorValue);
    }
    if (namedColors[value]) {
      setBorderStyle(el);
      return setStyles(el, "border-color", namedColors[value]);
    }
    if (!Number.isNaN(Number(value))) {
      setBorderStyle(el);
      return setStyles(el, "border-width", `${Number(value)}px`);
    }
    return false;
  }

  if (token === "rounded") {
    if (!borderRadiusMap[value]) return false;
    return setStyles(el, "border-radius", borderRadiusMap[value]);
  }

  if (token === "font") {
    if (!fontWeightMap[value]) return false;
    return setStyles(el, "font-weight", fontWeightMap[value]);
  }

  return false;

}



export { applyStyle };
