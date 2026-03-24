import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const jsRecommended = js?.configs?.recommended ?? {};
const tsRecommended = tseslint?.configs?.recommended ?? [];

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [jsRecommended, ...tsRecommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "react-refresh/only-export-components": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
);
