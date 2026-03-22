import { applyStyle } from "./parser.js";

function initializeChaiEngine() {
    const allElements = document.querySelectorAll('[class*="chai-"]');

    allElements.forEach((element) => {
        const classNames = Array.from(element.classList);

        classNames.forEach((className) => {
            if (className.startsWith("chai-")) {
                const isStyleApplied = applyStyle(element, className);

                if (isStyleApplied) {
                    element.classList.remove(className);
                }
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", initializeChaiEngine);
