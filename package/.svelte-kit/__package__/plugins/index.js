import MagicString from 'magic-string';
import { providers } from '../providers.js';
var providerRegex = new RegExp("\"@(".concat(providers.join("|"), ")-(\\S*)\""), "g");
function addMatch(matches, match) {
    var key = match.join(".");
    if (matches[key])
        return;
    matches[key] = match;
}
function replaceAll(s) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return new MagicString(s.replaceAll.apply(s, rest).toString());
}
export function magicons() {
    return {
        name: "s preprocessor",
        markup: function (_a) {
            var content = _a.content, filename = _a.filename;
            var _b = filename.split("/").at(-1).split(".").slice(-2), file = _b[0], ext = _b[1];
            if (filename.includes("node_modules"))
                return;
            if (!filename.includes("src"))
                return;
            if (!["ts", "js", "svelte"].includes(ext))
                return;
            var matches = {};
            var s = new MagicString(content, { filename: filename });
            s = replaceAll(s, /^(?!const|let|var).*src=("@\S*-\S*").*$/gm, function (original, g) { return original.replace(g, "{".concat(g, "}")); });
            s = replaceAll(s, providerRegex, function ($, provider, icon) {
                addMatch(matches, [icon, provider]);
                return "".concat(provider, "_").concat(icon.replaceAll("-", "_"));
            });
            var imports = Object.values(matches).map(function (_a) {
                var icon = _a[0], provider = _a[1];
                return "\n      import ".concat(provider, "_").concat(icon.replaceAll("-", "_"), " from '@magicons/").concat(provider, "-icons/icons/").concat(icon, ".json';");
            }).join("\n");
            s = ext == "svelte"
                ? s.replaceAll(/<script([\S\s]*?)>([\S\s]*?)<\/script>/g, function (original, $atributes, g) {
                    return original.replace(g, imports + "\n" + g);
                })
                : s.prepend(imports);
            return {
                code: s.toString(),
                map: s.generateMap({ hires: true, file: filename })
            };
        }
    };
}
