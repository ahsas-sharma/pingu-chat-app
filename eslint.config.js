// eslint.config.js
import js from "@eslint/js";
import globals, { node } from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier, { environments } from "eslint-plugin-prettier";

export default [
  // Ignore built files
  { ignores: ["dist"] },

  // Base configuration for JS and React files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2021, // Match the ES version in .eslintrc.json
      sourceType: "module",
      globals: [globals.browser, globals.node],
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier, // Include prettier plugin
    },
    settings: {
      react: {
        version: "detect", // Use "detect" to automatically detect React version
      },
    },
    rules: {
      ...js.configs.recommended.rules, // Include ESLint's recommended rules
      ...react.configs.recommended.rules, // React rules
      ...react.configs["jsx-runtime"].rules, // JSX rules
      ...reactHooks.configs.recommended.rules, // React hooks rules

      // React specific rules
      "react/jsx-no-target-blank": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // Prettier rules
      "prettier/prettier": "error",
    },
  },
];
