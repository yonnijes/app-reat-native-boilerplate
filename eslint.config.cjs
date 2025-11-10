import pluginJs from "@eslint/js/src/index.js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import tanstackQueryPlugin from "@tanstack/eslint-plugin-query";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
      },
    },
    plugins: {
      react: pluginReact,
      prettier: prettierPlugin,
      "@tanstack/query": tanstackQueryPlugin,
    },
    extends: [
      pluginJs.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.recommended,
      prettierConfig,
      tanstackQueryPlugin.configs.recommended,
    ],
    rules: {
      "prettier/prettier": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react/react-in-jsx-scope": "off", // For React 17+
      "react/jsx-uses-react": "off", // For React 17+
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];