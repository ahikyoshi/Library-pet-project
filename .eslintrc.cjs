module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    "project": ["./tsconfig.json"]
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/naming-convention': [
      1,
      {
        selector: 'variable',
        format: ['StrictPascalCase'],
        prefix: ['are', 'can', 'did', 'does', 'has', 'have', 'is', 'should', 'will'],
        types: ['boolean'],
      },
      {
        selector: 'typeAlias',
        format: ['StrictPascalCase'],
        prefix: ['T'],
      },
      {
        selector: 'interface',
        format: ['StrictPascalCase'],
        prefix: ['I'],
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-var-requires': 0,
    'arrow-parens': 1,
    'max-params': ['error', 3],
    'no-duplicate-imports': 1,
    'no-restricted-syntax': [
      1,
      {
        selector: 'ExportDefaultDeclaration',
        message: 'Prefer named exports.',
      },
    ],
    'no-tabs': 1,
  },
};