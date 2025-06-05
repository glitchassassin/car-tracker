import { config as defaultConfig } from '@epic-web/config/eslint'

/** @type {import("eslint").Linter.Config[]} */
export default [
	...defaultConfig,
	{
		rules: {
			// Enforce separate type imports consistently
			'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
		},
	}
] 