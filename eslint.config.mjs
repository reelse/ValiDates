import { defineConfig, globalIgnores } from 'eslint/config'
import react from 'eslint-plugin-react'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import _import from 'eslint-plugin-import'
import { fixupPluginRules } from '@eslint/compat'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import tseslint from 'typescript-eslint'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default tseslint.config([
  globalIgnores(['**/node_modules', '**/dist']),
  {
    extends: compat.extends('eslint:recommended', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'),

    plugins: {
      react,
      '@typescript-eslint': typescriptEslint,
      import: fixupPluginRules(_import),
    },

    ignores: ['**/node_modules', '**/dist', 'eslint.config.mjs', 'vite.config.js', 'vitest.config.js'],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: 'tsconfig.json',
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      '@typescript-eslint/no-var-requires': ['off'],
      'no-unused-vars': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-floating-promises': ['error'],
      'react/jsx-curly-brace-presence': ['error', 'never'],
      'arrow-body-style': ['error', 'as-needed'],
      'linebreak-style': ['error', 'unix'],
      'no-return-await': ['error'],
      semi: ['error', 'never'],
    },
  },
])
