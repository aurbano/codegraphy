module.exports = {
  root: true,
  extends: [
    /* Recommended for all projects */
    '@wise/eslint-config/base-strict', // `-strict` may be omitted

    /* Uncomment lines in the order below as you adopt each technology */
    '@wise/eslint-config/typescript-strict', // `-strict` may be omitted
    '@wise/eslint-config/react',

    /* Additional plugins */
    'plugin:eslint-comments/recommended',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    // Using unused-imports/no-unused-vars as it's auto-fixable
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-vars': [
      'error',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'unused-imports/no-unused-imports': 'error',
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    // Functional programming
    'functional/immutable-data': [
      'error',
      {
        ignoreIdentifierPattern: ['^mutable', 'ctx'],
        ignoreAccessorPattern: [
          'mutable_*.**',
          '**.current.**',
          'ctx.**',
          '**.style.**',
          'e.**',
          '*.displayName',
          '*.defaultProps',
        ],
      },
    ],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'sonarjs'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.ts', '.tsx'],
        moduleDirectory: ['src'],
      },
    },
  },
};
