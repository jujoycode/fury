import type { ColorName, ModifierName, ChalkInstance } from "chalk";

type T_CHALK = ChalkInstance;

type T_STYLE = ColorName | ModifierName;

type T_STYLE_TYPE = "start" | "error" | "end";

export { T_STYLE, T_STYLE_TYPE, T_CHALK };
