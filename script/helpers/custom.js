function custom(val) {
    const token = val.split("-")[0];
    const value = val.slice(val.indexOf("[") + 1, val.indexOf("]")).trim();

    if (!val.includes("/")) {
        return { token, value };
    }

    const shade = Number(val.split("/")[1]);
    const opacity = Math.min(Math.max(shade, 0), 100) / 100;

    if (value.includes("#")) {
        const alpha = Math.round(opacity * 255)
            .toString(16)
            .padStart(2, "0");

        const result = value + alpha;
        return { token, value: result };
    }

    if (value.includes("rgb")) {
        const inner = value.slice(4, -1);
        const result = `rgba(${inner}, ${opacity})`;
        return { token, value: result };
    }

    return { token, value };
}

export { custom };
