import { chaiValues } from "../value.js";

const { namedColors } = chaiValues;

function color(colorName, opacityPercentage) {
    const hexCode = namedColors[colorName];

    if (!hexCode) {
        return colorName; // Fallback to the raw string if not found in configuration
    }

    // Safely extract RGB components from the Hex string
    const red = parseInt(hexCode.slice(1, 3), 16);
    const green = parseInt(hexCode.slice(3, 5), 16);
    const blue = parseInt(hexCode.slice(5, 7), 16);

    let parsedOpacity = Number(opacityPercentage);

    // Default to fully opaque if the provided opacity is not a valid number
    if (Number.isNaN(parsedOpacity)) {
        parsedOpacity = 1;
    } else if (parsedOpacity > 1) {
        // Normalize percentage (e.g., 50 -> 0.5)
        parsedOpacity = parsedOpacity / 100;
    }

    return `rgba(${red}, ${green}, ${blue}, ${parsedOpacity})`;
}

export { color };
