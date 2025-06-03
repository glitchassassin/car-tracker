import { config as epicWebConfig } from '@epic-web/config/eslint';
import tsParser from '@typescript-eslint/parser';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...epicWebConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    ignores: ['node_modules/', 'build/', '.next/', '.cache/'],
  },
];
