module.exports = {
  "root": true,
  "extends": [
    /* Recommended for all projects */
    "@wise/eslint-config/base-strict", // `-strict` may be omitted

    /* Uncomment lines in the order below as you adopt each technology */
    "@wise/eslint-config/typescript-strict", // `-strict` may be omitted
    "@wise/eslint-config/react",

    /* Additional plugins */
    'plugin:sonarjs/recommended'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.eslint.json',
  },
  plugins: ['@typescript-eslint', 'unused-imports', 'sonarjs'],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      "node": {
        "extensions": [".ts", ".tsx"],
        "moduleDirectory": ["src"]
      }
    }
  }
}
