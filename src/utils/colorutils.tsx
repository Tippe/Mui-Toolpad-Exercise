import * as colors from "@mui/material/colors";

// Zet een hex kleur om naar HSL. Hiermee wordt de gradient bepaald.
const hexToHsl = (hex: string): [number, number, number] => {
    let r = 0,
        g = 0,
        b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
    }

    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h = 0,
        s = 0,
        l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h *= 60;
    }

    return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
};

// Genereer een gradient van hex naar lichtere versie
export const generateGradientToLighterHex = (
    hex: string,
    lightnessBoost = 30
) => {
    const [h, s, l] = hexToHsl(hex);
    const start = `hsl(${h}, ${s}%, ${l}%)`;
    const end = `hsl(${h}, ${s}%, ${Math.min(l + lightnessBoost, 100)}%)`;
    return `linear-gradient(to right bottom, ${start}, ${end})`;
};

// Calculate and return the solidColor and gradientColor for a tool, by category and type.
// We are not using toolType for now, but could be a furute thing so specify the color for a toolType also.
export const getColorsByToolCategory = (toolCategory: string) => {
    var solidColor: string = colors.grey[800];
    var gradientColor: string = generateGradientToLighterHex(solidColor);
    switch (toolCategory) {
        case "start":
            solidColor = colors.green[800];
            gradientColor = generateGradientToLighterHex(solidColor);
            return { solidColor, gradientColor };
        case "texteditor":
            solidColor = colors.grey[600];
            gradientColor = generateGradientToLighterHex(solidColor);
            return { solidColor, gradientColor };
        case "socialmedia":
            solidColor = colors.cyan[800];
            gradientColor = generateGradientToLighterHex(solidColor);
            return { solidColor, gradientColor };
        case "file":
            solidColor = colors.amber[800];
            gradientColor = generateGradientToLighterHex(solidColor);
            return { solidColor, gradientColor };
        default:
            solidColor = colors.grey[800];
            gradientColor = generateGradientToLighterHex(solidColor);
            return { solidColor, gradientColor };
    }
};
